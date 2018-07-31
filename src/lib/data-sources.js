const moment = require('moment')
const constants = require('../utils/constants')
const medalBuilder = require('../utils/medal-builder')
const apiHelper = require('../utils/api-helper')
const bungie = require('../utils/bungie-helper')
const urlBuilder = require('../utils/url-builder')
const statsHelper = require('../utils/stats-helper')
const description = require('../utils/grammar').description
const decode = require('../utils/html-entities').decode

const primaryApi = apiHelper.api()
const secondaryApi = apiHelper.api(1)
const enableMatchHistory = JSON.parse(process.env.ENABLE_MATCH_HISTORY)
const enablePreviousLeaderboards = JSON.parse(process.env.ENABLE_PREVIOUS_LEADERBOARDS)

const fetch = async () => {
  const utc = moment.utc()
  const updatedDate = utc.format(constants.format.machineReadable)
  const emptyTotals = {
    path: null,
    rank: false,
    games: -1,
    wins: -1,
    kills: -1,
    assists: -1,
    deaths: -1,
    kd: -1,
    kda: -1,
    bonuses: null,
    ppg: -1,
    score: -1
  }
  const parsed = {
    apiStatus: {
      enrollmentOpen: false,
      bungieStatus: constants.bungie.disabledStatusCode,
      updatedDate: updatedDate,
      formattedDate: utc.format(constants.format.url)
    },
    clans: [],
    members: [],
    events: [],
    modifiers: [],
    medals: [],
    currentEventId: null,
    currentLeaderboards: [],
    currentClanLeaderboard: {},
    previousEventId: null,
    previousClanLeaderboard: {},
    matchHistory: {},
    lastChecked: {},
    emptyTotals
  }

  const parseLeaderboard = (leaderboard, eventId) => {
    const parsedLeaderboard = {}

    if (leaderboard) {
      leaderboard.map(member => {
        const id = member.idStr
        const clanId = `${member.clanId}`
        const lastChecked = member.lastChecked
        const games = member.gamesPlayed
        const hasPlayed = games > 0

        const totals = {
          ...emptyTotals,
          eventId
        }

        if (hasPlayed) {
          const kills = member.kills
          const assists = member.assists
          const deaths = member.deaths
          const score = statsHelper.total(member.totalScore)

          totals.path = eventId ? urlBuilder.profileUrl(clanId, id, eventId) : urlBuilder.currentEventUrl(clanId, id)
          totals.rank = true
          totals.games = games
          totals.wins = member.gamesWon
          totals.kills = kills
          totals.assists = assists
          totals.deaths = deaths
          totals.kd = statsHelper.kd({ kills, deaths })
          totals.kda = statsHelper.kda({ kills, deaths, assists })
          totals.ppg = statsHelper.ppg({ games, score })
          totals.score = score
        }

        if (lastChecked) {
          const clanLastCheckedDate = parsed.lastChecked[clanId]
          const memberlastCheckedDate = moment.utc(lastChecked).format(constants.format.machineReadable)
          parsed.lastChecked[id] = memberlastCheckedDate

          if (!clanLastCheckedDate || memberlastCheckedDate > clanLastCheckedDate) parsed.lastChecked[clanId] = memberlastCheckedDate
        }

        totals.bonuses = parseBonuses(member, hasPlayed)

        parsedLeaderboard[id] = totals
      })
    }

    return parsedLeaderboard
  }

  const parseBonuses = (item, hasPlayed) => {
    const bonuses = [ item.bonusPoints1, item.bonusPoints2 ]

    return bonuses.map((bonus, i) => ({
      shortName: bonus.shortName || `Bonus ${i + 1}`,
      count: hasPlayed ? (typeof bonus === 'object' ? bonus.bonusPoints : bonus) : -1
    }))
  }

  const sources = [
    new Promise((resolve, reject) => {
      console.time(`fetch enrollment open`)

      primaryApi(`Clan/AcceptingNewClans`)
        .then(({ data }) => {
          parsed.apiStatus.enrollmentOpen = data

          console.timeEnd(`fetch enrollment open`)
          console.log(`enrollment open: ${data}`)
          resolve()
        })
        .catch(err => {
          console.error('fetch enrollment open', err.message)
          reject(err)
        })
    }),
    new Promise((resolve, reject) => {
      console.time(`fetch current alert`)

      primaryApi(`Event/GetCurrentAlert`)
        .then(({ data }) => {
          parsed.apiStatus.alert = data

          console.timeEnd(`fetch current alert`)
          console.log(`current alert: ${data}`)
          resolve()
        })
        .catch(err => {
          console.error('fetch current alert', err.message)
          reject(err)
        })
    }),
    new Promise((resolve, reject) => {
      console.time(`fetch bungie api status`)

      bungie(`/Destiny2/Milestones`)
        .then(({ data }) => {
          parsed.apiStatus.bungieStatus = data.ErrorCode

          console.timeEnd(`fetch bungie api status`)
          console.log(`bungie api status: ${parsed.apiStatus.bungieStatus}`)
          resolve()
        })
        .catch(err => {
          console.error('fetch bungie api status', err.message)
          reject(err)
        })
    }),
    new Promise((resolve, reject) => {
      console.time(`fetch clans`)

      primaryApi(`Clan/GetAllClans`)
        .then(({ data }) => {
          data.map(clan => {
            const id = `${clan.groupId}`
            const { medals, totals } = medalBuilder.parseMedals(clan.medalUnlocks, constants.prefix.clan)

            parsed.clans.push({
              path: urlBuilder.clanUrl(id),
              id,
              name: decode(clan.name),
              tag: decode(clan.tag),
              motto: decode(clan.motto),
              description: description(clan.description),
              avatar: {
                color: clan.backgroundColor,
                foreground: {
                  color: clan.emblemColor1,
                  icon: clan.foregroundIcon
                },
                background: {
                  color: clan.emblemColor2,
                  icon: clan.backgroundIcon
                }
              },
              medals,
              medalTotals: totals
            })
          })

          console.timeEnd(`fetch clans`)
          console.log(`clans: ${data.length}`)
          resolve()
        })
        .catch(err => console.error('fetch clans', err.message))
    }),
    new Promise((resolve, reject) => {
      console.time(`fetch members`)

      primaryApi(`Clan/GetAllMembers`)
        .then(({ data }) => {
          data.map(member => {
            const id = member.profileIdStr
            const clanId = `${member.groupId}`
            const path = urlBuilder.profileUrl(clanId, id)
            const totals = {
              path: null,
              rank: false,
              games: -1,
              wins: -1,
              kills: -1,
              assists: -1,
              deaths: -1,
              kd: -1,
              kda: -1,
              ppg: -1,
              score: -1,
              lastPlayed: '-1'
            }
            const currentScore = member.currentScore
            const pastEvents = []

            if (currentScore && currentScore.lastSeen) {
              totals.lastPlayed = moment.utc(currentScore.lastSeen).format(constants.format.date)
              const games = currentScore.gamesPlayed

              if (games > 0) {
                const kills = currentScore.kills
                const assists = currentScore.assists
                const deaths = currentScore.deaths
                const score = statsHelper.total(currentScore.totalScore)

                totals.path = path
                totals.rank = true
                totals.games = games
                totals.wins = currentScore.gamesWon
                totals.kills = kills
                totals.assists = assists
                totals.deaths = deaths
                totals.kd = statsHelper.kd({ kills, deaths })
                totals.kda = statsHelper.kda({ kills, deaths, assists })
                totals.ppg = statsHelper.ppg({ games, score })
                totals.score = score
              }
            }

            if (member.history) {
              member.history.map(match => {
                const eventId = match.eventId
                const results = match.results
                const games = results.gamesPlayed
                const score = statsHelper.total(results.totalScore)
                const kills = results.totalKills
                const assists = results.totalAssists
                const deaths = results.totalDeaths
                const bonuses = parseBonuses(results, true)
                const { medals } = medalBuilder.parseMedals(match.medals, constants.prefix.profile)

                pastEvents.push({
                  id: eventId,
                  game: {
                    path: urlBuilder.eventUrl(eventId),
                    result: true,
                    name: results.eventData.name,
                    endDate: moment.utc(results.eventData.scoringEndDate).format(constants.format.machineReadable),
                    medals
                  },
                  rank: statsHelper.ranking(results.rankInClan),
                  overall: statsHelper.ranking(results.overallRank),
                  games,
                  wins: results.gamesWon,
                  kd: statsHelper.kd({ kills, deaths }),
                  kda: statsHelper.kda({ kills, deaths, assists }),
                  bonuses,
                  bonusColumns: bonuses.map(({ shortName }) => shortName),
                  ppg: statsHelper.ppg({ games, score }),
                  score
                })
              })
            }

            const { medals } = medalBuilder.parseMedals(member.medalUnlocks, constants.prefix.profile)

            parsed.members.push({
              path,
              id,
              clanId,
              name: member.name,
              avatar: { icon: member.icon },
              platforms: [ { id: member.membershipType || constants.bungie.platformDefault, size: 1, active: 1, percentage: 100 } ],
              tags: member.bonusUnlocks.map(({ name }) => ({ name })),
              medals,
              totals,
              pastEvents
            })
          })

          console.timeEnd(`fetch members`)
          console.log(`members: ${data.length}`)
          resolve()
        })
        .catch(err => {
          console.error('fetch members', err.message)
          reject(err)
        })
    }),
    new Promise((resolve, reject) => {
      console.time(`fetch events`)

      primaryApi(`Event/GetAllEvents`)
        .then(({ data }) => {
          data.map(event => {
            const id = event.eventId
            const startDate = moment.utc(event.startTime).format(constants.format.machineReadable)
            const endDate = moment.utc(event.scoringEndTime).format(constants.format.machineReadable)
            const tense = event.eventTense
            var isCurrent = tense === constants.tense.current
            var isPast = tense === constants.tense.past
            var isFuture = tense === constants.tense.future
            var path = urlBuilder.eventUrl(id)

            if (isCurrent && endDate < updatedDate) {
              isCurrent = false
              isPast = true
            }

            if (isFuture && startDate < updatedDate) {
              isCurrent = true
              isFuture = false
            }

            if (isCurrent) {
              path = urlBuilder.currentEventRootUrl
              parsed.currentEventId = id
            }

            const leaderboards = []
            const results = event.result

            if (results) {
              constants.divisions.map(({ key, name, size }) => {
                const leaderboard = results[key]

                if (leaderboard) {
                  leaderboards.push({
                    leaderboard,
                    division: {
                      name,
                      size
                    }
                  })
                }
              })
            }

            parsed.events.push({
              path,
              id,
              name: event.name,
              description: description(event.description),
              startDate,
              endDate,
              isCurrent,
              isPast,
              isFuture,
              isCalculated: event.calculated,
              modifiers: event.modifiers.map(({ id }) => id),
              leaderboards,
              medals: {
                clans: medalBuilder.parseMedals(event.clanMedals, constants.prefix.clan, 1).medals,
                members: medalBuilder.parseMedals(event.clanMemberMedals, constants.prefix.profile, 1).medals
              }
            })
          })

          console.timeEnd(`fetch events`)
          console.log(`events: ${parsed.events.length}`)
          resolve()
        })
        .catch(err => {
          console.error('fetch events', err)
          reject(err)
        })
    }),
    new Promise((resolve, reject) => {
      console.time(`fetch modifiers`)

      primaryApi(`Component/GetAllModifiers`)
        .then(({ data }) => {
          data.map(({ id, name, shortName, description, scoringModifier, scoringBonus, multiplierBonus, createdBy }) => {
            parsed.modifiers.push({
              id,
              name,
              shortName: shortName || name.split(' ')[0],
              description,
              scoringModifier,
              bonus: scoringBonus || multiplierBonus,
              creator: createdBy
            })
          })

          console.timeEnd(`fetch modifiers`)
          console.log(`modifiers: ${data.length}`)
          resolve()
        })
        .catch(err => {
          console.error('fetch modifiers', err.message)
          reject(err)
        })
    }),
    new Promise((resolve, reject) => {
      console.time(`fetch member medals`)

      primaryApi(`Component/GetAllMedals`)
        .then(({ data }) => {
          parsed.medals = parsed.medals.concat(medalBuilder.parseMedals(data, constants.prefix.profile).medals)

          console.timeEnd(`fetch member medals`)
          console.log(`member medals: ${data.length}`)
          resolve()
        })
        .catch(err => {
          console.error('fetch member medals', err.message)
          reject(err)
        })
    }),
    new Promise((resolve, reject) => {
      console.time(`fetch clan medals`)

      primaryApi(`Component/GetAllClanMedals`)
        .then(({ data }) => {
          parsed.medals = parsed.medals.concat(medalBuilder.parseMedals(data, constants.prefix.clan).medals)

          console.timeEnd(`fetch clan medals`)
          console.log(`clan medals: ${data.length}`)
          resolve()
        })
        .catch(err => {
          console.error('fetch clan medals', err.message)
          reject(err)
        })
    }),
    new Promise((resolve, reject) => {
      console.time(`fetch event leaderboard`)

      primaryApi(`Leaderboard/GetLeaderboard`)
        .then(({ data }) => {
          constants.divisions.map(({ key, name, size }) => {
            const leaderboard = data[`${key}Leaderboard`]

            if (leaderboard) {
              parsed.currentLeaderboards.push({
                leaderboard,
                division: {
                  name,
                  size
                }
              })
            }
          })

          console.timeEnd(`fetch event leaderboard`)
          console.log(`event leaderboard: ${data !== null}`)
          resolve()
        })
        .catch(err => {
          console.error('fetch event leaderboard', err.message)
          reject(err)
        })
    }),
    new Promise((resolve, reject) => {
      console.time(`fetch current clan leaderboard`)

      primaryApi(`Leaderboard/GetClanLeaderboard`)
        .then(({ data }) => {
          parsed.currentClanLeaderboard = parseLeaderboard(data)

          console.timeEnd(`fetch current clan leaderboard`)
          console.log(`current clan leaderboard: ${data.length}`)
          resolve()
        })
        .catch(err => {
          console.error('fetch current clan leaderboard', err.message)
          reject(err)
        })
    })
  ]

  if (enablePreviousLeaderboards) {
    sources.push(new Promise((resolve, reject) => {
      console.time(`fetch previous clan leaderboard`)

      primaryApi(`Leaderboard/GetPreviousClanLeaderboard`)
        .then(({ data }) => {
          const { eventId, leaderboardList } = data[0]

          parsed.previousEventId = eventId
          parsed.previousClanLeaderboard = parseLeaderboard(leaderboardList, eventId)

          console.timeEnd(`fetch previous clan leaderboard`)
          console.log(`previous clan leaderboard: ${leaderboardList.length}`)
          resolve()
        })
        .catch(err => {
          console.error('fetch previous clan leaderboard', err.message)
          reject(err)
        })
    }))
  } else {
    console.log('fetch previous clan leaderboard disabled')
  }

  if (enableMatchHistory) {
    sources.push(new Promise((resolve, reject) => {
      console.time(`fetch match history`)

      secondaryApi(`Leaderboard/GetAllPlayersHistory`)
        .then(({ data }) => {
          data.map((match) => {
            const id = match.memberShipIdStr
            const existing = parsed.matchHistory[id]
            const history = {
              game: {
                path: urlBuilder.pgcrUrl(match.pgcrId),
                isExternal: true,
                result: match.gameWon === true ? constants.result.win : (match.gameWon === false ? constants.result.loss : ''),
                name: match.gameType,
                label: match.map,
                endDate: moment.utc(match.datePlayed).format(constants.format.machineReadable)
              },
              kills: match.kills,
              assists: match.assists,
              deaths: match.deaths,
              bonuses: parseBonuses(match, true),
              score: statsHelper.total(match.totalScore)
            }

            if (existing) {
              if (existing.length < constants.matchHistoryLimit) existing.push(history)
            } else {
              parsed.matchHistory[id] = [ history ]
            }
          })

          console.timeEnd(`fetch match history`)
          console.log(`match history: ${data.length}`)
          resolve()
        })
        .catch(err => {
          console.error('fetch match history', err.message)
          reject(err)
        })
    }))
  } else {
    console.log('fetch match history disabled')
  }

  await Promise.all(sources)

  return parsed
}

module.exports = {
  fetch
}
