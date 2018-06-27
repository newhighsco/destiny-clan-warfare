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
    currentEventLeaderboards: [],
    currentClanLeaderboard: [],
    previousEventId: null,
    previousClanLeaderboard: [],
    matchHistory: []
  }

  const parseLeaderboard = (leaderboard, eventId) => {
    const parsed = []

    if (leaderboard) {
      leaderboard.map(member => {
        const id = member.IdStr
        const clanId = `${member.ClanId}`
        const games = member.GamesPlayed
        const hasPlayed = games > 0

        const totals = {
          eventId,
          path: null,
          games: -1,
          wins: -1,
          kills: -1,
          assists: -1,
          deaths: -1,
          kd: -1,
          kda: -1,
          ppg: -1,
          score: -1
        }

        if (hasPlayed) {
          const kills = member.Kills
          const assists = member.Assists
          const deaths = member.Deaths
          const score = statsHelper.total(member.TotalScore)

          totals.path = eventId ? urlBuilder.profileUrl(clanId, id, eventId) : urlBuilder.currentEventUrl(clanId, id)
          totals.games = games
          totals.wins = member.GamesWon
          totals.kills = kills
          totals.assists = assists
          totals.deaths = deaths
          totals.kd = statsHelper.kd({ kills, deaths })
          totals.kda = statsHelper.kda({ kills, deaths, assists })
          totals.ppg = statsHelper.ppg({ games, score })
          totals.score = score
        }

        totals.bonuses = parseBonuses(member, hasPlayed)

        parsed.push({
          id,
          ...totals
        })
      })
    }

    return parsed
  }

  const parseBonuses = (item, hasPlayed) => {
    const bonuses = [ item.BonusPoints1, item.BonusPoints2 ]

    return bonuses.map(bonus => ({
      shortName: bonus.ShortName || '',
      count: hasPlayed ? (typeof bonus === 'object' ? bonus.BonusPoints : bonus) : -1
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
      console.time(`fetch bungie api status`)

      bungie(`/Destiny2/Milestones`)
        .then(({ data }) => {
          parsed.apiStatus.bungieStatus = data.ErrorCode

          console.timeEnd(`fetch bungie api status`)
          console.log(`bungie api status: ${data.ErrorCode}`)
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
            const id = `${clan.GroupId}`

            parsed.clans.push({
              path: urlBuilder.clanUrl(id),
              id,
              name: decode(clan.Name),
              tag: decode(clan.Tag),
              motto: decode(clan.Motto),
              description: description(clan.Description),
              avatar: {
                color: clan.BackgroundColor,
                foreground: {
                  color: clan.EmblemColor1,
                  icon: clan.ForegroundIcon
                },
                background: {
                  color: clan.EmblemColor2,
                  icon: clan.BackgroundIcon
                }
              },
              medals: medalBuilder.parseMedals(clan.MedalUnlocks, constants.prefix.clan)
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
            const id = member.ProfileIdStr
            const clanId = `${member.GroupId}`
            const path = urlBuilder.profileUrl(clanId, id)
            const totals = {
              path: null,
              games: -1,
              wins: -1,
              kills: -1,
              assists: -1,
              deaths: -1,
              kd: -1,
              kda: -1,
              ppg: -1,
              score: -1,
              lastPlayed: -1
            }
            const pastEvents = []

            if (member.CurrentScore && member.CurrentScore.LastSeen) {
              totals.lastPlayed = moment.utc(member.CurrentScore.LastSeen).format(constants.format.date)
              const games = member.CurrentScore.GamesPlayed

              if (games > 0) {
                const kills = member.CurrentScore.Kills
                const assists = member.CurrentScore.Assists
                const deaths = member.CurrentScore.Deaths
                const score = statsHelper.total(member.CurrentScore.TotalScore)

                totals.path = path
                totals.games = games
                totals.wins = member.CurrentScore.GamesWon
                totals.kills = kills
                totals.assists = assists
                totals.deaths = deaths
                totals.kd = statsHelper.kd({ kills, deaths })
                totals.kda = statsHelper.kda({ kills, deaths, assists })
                totals.ppg = statsHelper.ppg({ games, score })
                totals.score = score
              }
            }

            if (member.History) {
              member.History.map(match => {
                const eventId = match.EventId
                const games = match.Results.GamesPlayed
                const score = statsHelper.total(match.Results.TotalScore)
                const kills = match.Results.TotalKills
                const assists = match.Results.TotalAssists
                const deaths = match.Results.TotalDeaths

                pastEvents.push({
                  id: eventId,
                  game: {
                    path: urlBuilder.eventUrl(eventId),
                    result: true,
                    // TODO: Populate event data
                    name: null,
                    endDate: null,
                    medals: medalBuilder.parseMedals(match.Medals, constants.prefix.profile)
                  },
                  rank: statsHelper.ranking(match.Results.RankInClan),
                  overall: statsHelper.ranking(match.Results.OverallRank),
                  games,
                  wins: match.Results.GamesWon,
                  kd: statsHelper.kd({ kills, deaths }),
                  kda: statsHelper.kda({ kills, deaths, assists }),
                  bonuses: parseBonuses(match.Results, true),
                  ppg: statsHelper.ppg({ games, score }),
                  score
                })
              })
            }

            parsed.members.push({
              path,
              id,
              clanId,
              name: member.Name,
              avatar: { icon: member.Icon },
              platforms: [ { id: member.MembershipType || constants.bungie.platformDefault, size: 1, active: 1, percentage: 100 } ],
              tags: member.BonusUnlocks.map(({ Name }) => ({ name: Name })),
              medals: medalBuilder.parseMedals(member.MedalUnlocks, constants.prefix.profile),
              totals,
              pastEvents,
              lastChecked: member.LastChecked ? moment.utc(member.LastChecked).format(constants.format.machineReadable) : null
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
            const id = event.EventId
            const startDate = moment.utc(event.StartTime).format(constants.format.machineReadable)
            const endDate = moment.utc(event.ScoringEndTime).format(constants.format.machineReadable)
            var isCurrent = event.EventTense === constants.tense.current
            var isPast = event.EventTense === constants.tense.past
            var isFuture = event.EventTense === constants.tense.future
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
            const results = event.Result

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
              name: event.Name,
              description: description(event.Description),
              startDate,
              endDate,
              isCurrent,
              isPast,
              isFuture,
              isCalculated: event.Calculated,
              modifiers: event.Modifiers.map(({ Id }) => (Id)),
              leaderboards,
              medals: {
                clans: medalBuilder.parseMedals(event.ClanMedals, constants.prefix.clan, 1),
                members: medalBuilder.parseMedals(event.ClanMemberMedals, constants.prefix.profile, 1)
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
          data.map(modifier => {
            const name = modifier.Name

            parsed.modifiers.push({
              id: modifier.Id,
              name,
              shortName: modifier.ShortName || name.split(' ')[0],
              description: modifier.Description,
              scoringModifier: modifier.ScoringModifier,
              bonus: modifier.ScoringBonus || modifier.MultiplierBonus,
              creator: modifier.CreatedBy
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
          // TODO: Calculate tooltips here rather than at render
          parsed.medals = parsed.medals.concat(medalBuilder.parseMedals(data, constants.prefix.profile))

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
          parsed.medals = parsed.medals.concat(medalBuilder.parseMedals(data, constants.prefix.clan))

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
              parsed.currentEventLeaderboards.push({
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
          console.log(`current clan leaderboard: ${parsed.currentClanLeaderboard.length}`)
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
          const { EventId, LeaderboardList } = data[0]

          parsed.previousEventId = EventId
          parsed.previousClanLeaderboard = parseLeaderboard(LeaderboardList, EventId)

          console.timeEnd(`fetch previous clan leaderboard`)
          console.log(`previous clan leaderboard: ${parsed.previousClanLeaderboard.length}`)
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
          data.map(match => {
            const id = match.MemberShipIdStr
            const existing = parsed.matchHistory[id]
            const history = {
              game: {
                path: urlBuilder.pgcrUrl(match.PgcrId),
                isExternal: true,
                result: match.GameWon === true ? constants.result.win : (match.GameWon === false ? constants.result.loss : ''),
                name: match.GameType,
                label: match.Map,
                endDate: moment.utc(match.DatePlayed).format(constants.format.machineReadable)
              },
              kills: match.Kills,
              assists: match.Assists,
              deaths: match.Deaths,
              bonuses: parseBonuses(match, true),
              score: statsHelper.total(match.TotalScore)
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
