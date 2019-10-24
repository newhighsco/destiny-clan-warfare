import Html from './src/Html'
import { createSharedData } from 'react-static/node'

require('dotenv').config()

const path = require('path')
const moment = require('moment')
const dataSources = require('./src/lib/data-sources')
const constants = require('./src/utils/constants')
const medalBuilder = require('./src/utils/medal-builder')
const urlBuilder = require('./src/utils/url-builder')
const feedBuilder = require('./src/utils/feed-builder')
const statsHelper = require('./src/utils/stats-helper')
const apiHelper = require('./src/utils/api-helper')

export default {
  devServer: {
    port: 9000,
    host: 'localhost.destinyclanwarfare.com',
    disableHostCheck: true,
    proxy: {
      [constants.server.proxyUrl]: apiHelper.proxyOptions()
    }
  },
  siteRoot: process.env.SITE_URL,
  extractCssChunks: true,
  plugins: [
    require.resolve('react-static-plugin-preact'),
    [
      require.resolve('react-static-plugin-source-filesystem'),
      {
        location: path.resolve('./src/pages')
      }
    ],
    require.resolve('react-static-plugin-reach-router'),
    require.resolve('react-static-plugin-sitemap'),
    [
      'plugin-robots',
      {
        disallowAll: JSON.parse(process.env.DISALLOW_ROBOTS || false),
        showSitemap: true
      }
    ],
    [
      'plugin-manifest',
      {
        name: constants.meta.name,
        short_name: constants.meta.shortName,
        background_color: constants.meta.themeColor,
        theme_color: constants.meta.themeColor,
        display: 'minimal-ui',
        icons: [
          {
            src: path.resolve('./src/images/meta/favicon.png'),
            sizes: [192, 512]
          }
        ]
      }
    ],
    [
      'plugin-feeds',
      [
        {
          filename: 'enrollment.xml',
          title: constants.meta.title,
          description: constants.meta.description,
          filter: ({ path }) => path === urlBuilder.rootUrl,
          embellisher: route => {
            const { apiStatus = {} } = route.sharedData
            const kicker = `Enrollment ${
              apiStatus.enrollmentOpen ? 'is now open' : 'has closed'
            }`
            const hash = `${constants.prefix.hash}${constants.prefix.enroll}`
            const formattedDate = moment.utc().format(constants.format.url)
            const url = `${process.env.SITE_URL}/${
              apiStatus.enrollmentOpen ? 'open' : 'closed'
            }/${formattedDate}/`
            const canonicalUrl = apiStatus.enrollmentOpen
              ? ` ${process.env.SITE_URL}/${hash}`
              : ''
            const title = `${kicker} - ${formattedDate}`
            const content = `${kicker}${canonicalUrl}`

            return {
              title,
              description: title,
              url,
              guid: url,
              date: apiStatus.updatedDate,
              custom_elements: [{ 'content:encoded': content }]
            }
          }
        },
        {
          filename: 'events.xml',
          title: constants.meta.title,
          description: constants.meta.description,
          addToHead: true,
          filter: ({ template }) => template.match(/src\/containers\/Event$/),
          embellisher: route => feedBuilder(route)
        },
        {
          filename: 'events--current.xml',
          title: constants.meta.title,
          description: constants.meta.description,
          filter: ({ path }) =>
            path === urlBuilder.currentEventRootUrl.replace(/\//g, ''),
          embellisher: route => feedBuilder(route)
        }
      ]
    ],
    [
      'plugin-netlify-redirects',
      [
        {
          from: `${constants.server.proxyUrl}*`,
          to: `${apiHelper.url()}:splat`,
          code: 200
        },
        {
          from: `${urlBuilder.clanUrl(':clan')}*`,
          to: urlBuilder.clanUrl(':clan'),
          code: 200
        },
        {
          from: urlBuilder.eventUrl(':event/:clan'),
          to: urlBuilder.clanUrl(':clan', ':event'),
          code: 301
        },
        {
          from: urlBuilder.eventUrl(':event/:clan/:member'),
          to: urlBuilder.profileUrl(':clan', ':member', ':event'),
          code: 301
        },
        {
          from: `${constants.bungie.proxyUrl}*`,
          to: `${constants.bungie.baseUrl}:splat`,
          code: '200!'
        },
        {
          from: 'https://discord.destinyclanwarfare.com/*',
          to: 'https://discordapp.com/invite/tu8JdRr',
          code: '301!'
        },
        {
          from: urlBuilder.patreonUrl({ id: ':id' }),
          to: urlBuilder.patreonUrl({ id: ':id' }, true),
          code: '301!'
        }
      ]
    ],
    [
      'plugin-netlify-cache',
      {
        extraDirs: []
      }
    ],
    'plugin-webpack',
    'plugin-stylus',
    'plugin-svg'
  ],
  getRoutes: async ({ incremental }) => {
    const disableDataFetch = JSON.parse(process.env.DISABLE_DATA_FETCH || false)

    if (disableDataFetch) {
      return [{ path: urlBuilder.rootUrl, template: 'src/containers/Home' }]
    }

    const {
      apiStatus,
      clans,
      events,
      members,
      modifiers,
      medals,
      currentEventId,
      currentEventStatsGamesThreshold,
      currentLeaderboards,
      currentClanLeaderboard,
      matchHistory,
      matchHistoryLimit,
      previousEventId,
      previousClanLeaderboard,
      lastChecked,
      leaderboards
    } = await dataSources.fetch()
    const routes = []
    const currentEventStats = {}
    const clanIds = []
    const clientClans = []
    const statsColumns = [
      'games',
      'wins',
      'kd',
      'kda',
      'bonuses',
      'ppg',
      'score'
    ]

    const addStat = (stats, column, value, name) => {
      if (name && value > 0) {
        stats[column] = { stat: value, label: [name] }
      } else {
        stats[column] = value
      }
    }

    const incrementStat = (stats, column, value) => {
      var existingStat = stats[column]

      if (!existingStat) {
        addStat(stats, column, value)
      } else {
        stats[column] += value
      }
    }

    const updateStat = (stats, column, value, name) => {
      var existingStat = stats[column]

      if (!existingStat) {
        addStat(stats, column, value, name)
      } else {
        if (value === existingStat.stat) {
          existingStat.label.push(name)
        } else if (value > existingStat.stat) {
          addStat(stats, column, value, name)
        }
      }
    }

    const sharedApiStatus = createSharedData(apiStatus)

    clans.map(clan => {
      const clanMembers = members.filter(({ clanId }) => clanId === clan.id)
      const clanCurrentTotals = {}
      const clanCurrentStats = {}
      const clanMatchHistory = {}
      const totalSize = clanMembers.length
      const platforms = []

      clanMembers.map(member => {
        member.clanId = undefined

        const memberId = member.id
        const memberName = member.name
        const memberFullName = `${memberName} [${clan.tag}]`
        const hasPlayed = member.totals ? member.totals.games > 0 : false
        const platformId = member.platforms[0].id
        const existingPlatform = platforms.find(({ id }) => id === platformId)
        const memberLastChecked = lastChecked[memberId]

        if (existingPlatform) {
          if (hasPlayed) existingPlatform.active++
          existingPlatform.size++
          existingPlatform.percentage = Math.round(
            (existingPlatform.size / totalSize) * 100
          )
        } else {
          platforms.push({
            id: platformId,
            size: 1,
            active: hasPlayed ? 1 : 0,
            percentage: Math.round((1 / totalSize) * 100)
          })
        }

        if (currentEventId) {
          const currentTotals = currentClanLeaderboard[memberId]

          if (currentTotals) {
            const { games } = currentTotals
            const hasCurrentTotals = games > 0

            member.hasCurrentTotals = hasCurrentTotals

            if (hasCurrentTotals) {
              incrementStat(clanCurrentStats, 'totalActive', 1)
              incrementStat(currentEventStats, 'totalActive', 1)
              incrementStat(clanCurrentStats, 'totalGames', games)
              incrementStat(currentEventStats, 'totalGames', games)
            }

            clanCurrentTotals[memberId] = {
              ...currentTotals,
              updated: hasCurrentTotals ? memberLastChecked : null
            }

            if (games >= currentEventStatsGamesThreshold) {
              statsColumns.map(column => {
                if (column === 'bonuses' && currentTotals.bonuses) {
                  currentTotals.bonuses.map(({ shortName, count }) => {
                    updateStat(clanCurrentStats, shortName, count, memberName)
                    updateStat(
                      currentEventStats,
                      shortName,
                      count,
                      memberFullName
                    )
                  })
                } else {
                  const value = currentTotals[column]

                  updateStat(clanCurrentStats, column, value, memberName)
                  updateStat(currentEventStats, column, value, memberFullName)
                }
              })
            }
          }

          const memberMatchHistory = matchHistory[memberId]

          if (memberMatchHistory)
            clanMatchHistory[memberId] = memberMatchHistory
        }

        if (previousEventId) {
          const previousTotals = previousClanLeaderboard[memberId]

          if (previousTotals) member.previousTotals = previousTotals
        }
      })

      clan.platforms = platforms

      clanIds.push(clan.id)

      clientClans.push({
        path: clan.path,
        id: clan.id,
        name: clan.name,
        tag: clan.tag,
        avatar: clan.avatar,
        platforms: clan.platforms,
        medalTotals: clan.medalTotals
      })

      const sharedClan = createSharedData(clan)
      const sharedClanMembers = createSharedData(clanMembers)

      routes.push({
        path: clan.path,
        template: 'src/containers/clan/Overall',
        getData: async () => ({
          currentEventId: currentEventId || undefined,
          previousEventId: previousEventId || undefined
        }),
        sharedData: {
          clan: sharedClan,
          members: sharedClanMembers
        }
      })

      if (currentEventId) {
        routes.push({
          path: urlBuilder.currentEventUrl(clan.id),
          template: 'src/containers/clan/Current',
          getData: async () => ({
            currentTotals: clanCurrentTotals,
            currentStats: clanCurrentStats,
            statsGamesThreshold: currentEventStatsGamesThreshold,
            matchHistory: clanMatchHistory,
            matchHistoryLimit
          }),
          sharedData: {
            apiStatus: sharedApiStatus,
            clan: sharedClan,
            members: sharedClanMembers
          }
        })
      }
    })

    const sharedClans = createSharedData(clientClans)
    const winnersMedal = medals.find(
      ({ name }) =>
        name.toUpperCase() === constants.result.winnersMedal.toUpperCase()
    )
    var currentEventLeaderboards = []
    var currentEventSummary = []
    const currentEventSuggestions = []

    if (currentEventId) {
      currentEventLeaderboards = currentLeaderboards.map(
        ({ leaderboard, division }, tabIndex) => {
          leaderboard = leaderboard.map(
            ({ idStr, rank, totalScore, active, size }, i) => {
              const clan = clans.find(({ id }) => id === idStr)
              const { id, name, tag, avatar, platforms } = clan
              const clanLastChecked = lastChecked[id]

              currentEventSuggestions.push({
                id: `${tabIndex}${constants.blank}${i}`,
                name: `${name} [${tag}]`
              })

              return {
                path: urlBuilder.currentEventUrl(id),
                id,
                name,
                avatar,
                platforms,
                updated: clanLastChecked || null,
                rank: true,
                overall: statsHelper.ranking(rank),
                active,
                size,
                score: totalScore
              }
            }
          )

          currentEventSummary.push({
            leaderboard: leaderboard.slice(0, 3),
            division
          })

          return {
            leaderboard,
            division
          }
        }
      )
    }

    const sharedCurrentEventLeaderboards = createSharedData(
      currentEventLeaderboards
    )
    const suggestions = {}
    const clientEvents = []
    const currentEvent = events.find(({ id }) => id === currentEventId)
    const previousEvent = events.find(({ id }) => id === previousEventId)
    const nextEvent = events.filter(({ isFuture }) => isFuture).pop()

    events.map(event => {
      const eventId = event.id
      const eventWinners = []
      const eventSuggestions = []
      const eventLeaderboards = leaderboards[eventId]

      if (previousEvent && event.path === previousEvent.path)
        event.isPrevious = true
      if (nextEvent && event.path === nextEvent.path) event.isNext = true

      event.modifiers = event.modifiers.map(id => {
        const modifier = modifiers.find(modifier => modifier.id === id)

        if (modifier.creatorId) {
          const member = members.find(({ id }) => id === modifier.creatorId)

          if (member) {
            const clan = clans.find(({ id }) => id === member.clanId)

            modifier.creator = `${member.name}${clan ? ` [${clan.tag}]` : ''}`
          }
        }

        const { name, description, creator, scoringModifier, bonus } = modifier

        return {
          name,
          description,
          creator,
          scoringModifier: scoringModifier || undefined,
          bonus
        }
      })

      if (eventLeaderboards) {
        leaderboards[eventId] = eventLeaderboards.map(
          ({ leaderboard, division }, tabIndex) => {
            leaderboard = leaderboard.map(({ clanId, rank, score }, i) => {
              const clan = clans.find(({ id }) => id === `${clanId}`)
              const { path, id, name, tag, avatar, platforms } = clan
              var medal

              if (event.isCalculated && score > 0) {
                switch (i) {
                  case 0:
                    if (rank === 1) {
                      medal = {
                        tier: winnersMedal.tier,
                        name: winnersMedal.name,
                        description: winnersMedal.description
                      }
                    } else {
                      medal = medalBuilder.build(1, 2, division.name)
                    }

                    if (eventId === previousEventId) {
                      eventWinners.push({
                        path,
                        id,
                        name,
                        avatar,
                        platforms,
                        medal,
                        division,
                        score
                      })
                    }
                    break
                  case 1:
                  case 2:
                    medal = medalBuilder.build('top 3', 1, division.name)
                    break
                }
              }

              eventSuggestions.push({
                id: `${tabIndex}${constants.blank}${i}`,
                name: `${name} [${tag}]`
              })

              return {
                path,
                id,
                name,
                avatar,
                platforms,
                medal,
                rank: true,
                overall: statsHelper.ranking(rank),
                score
              }
            })

            return {
              leaderboard,
              division
            }
          }
        )
      }

      if (eventWinners.length) event.winners = eventWinners
      if (eventSuggestions.length) suggestions[eventId] = eventSuggestions

      clientEvents.push({
        path: event.path,
        name: event.name,
        startDate: event.startDate,
        endDate: event.endDate,
        isCurrent: event.isCurrent,
        isPast: event.isPast,
        modifiers: event.modifiers
      })

      const eventSharedData = {}

      if (event.isCurrent) {
        eventSharedData.apiStatus = sharedApiStatus
        eventSharedData.leaderboards = sharedCurrentEventLeaderboards
      }

      routes.push({
        path: event.path,
        template: 'src/containers/event/Details',
        getData: async () => ({
          event: { ...event, winners: undefined },
          leaderboards: !event.isCurrent ? leaderboards[eventId] : undefined,
          suggestions: event.isCurrent
            ? currentEventSuggestions
            : suggestions[eventId],
          stats: event.isCurrent ? currentEventStats : event.stats
        }),
        sharedData: {
          ...eventSharedData
        },
        _redirects: event.isCurrent
          ? [
              {
                from: urlBuilder.eventUrl(currentEventId),
                to: urlBuilder.currentEventRootUrl,
                code: 302
              },
              {
                from: `${urlBuilder.currentEventUrl(':clan')}*`,
                to: urlBuilder.currentEventUrl(':clan'),
                code: 200
              }
            ]
          : undefined
      })
    })

    const previousEventLeaderboards =
      previousEventId && leaderboards[previousEventId]
        ? leaderboards[previousEventId]
        : []

    routes.push(
      {
        path: urlBuilder.rootUrl,
        template: 'src/containers/Home',
        getData: async () => ({
          clanIds,
          currentEvent,
          previousEvent,
          nextEvent,
          currentEventSummary
        }),
        sharedData: {
          apiStatus: sharedApiStatus
        },
        _redirects: !currentEventId
          ? [
              {
                from: `${urlBuilder.currentEventRootUrl}*`,
                to: `${urlBuilder.rootUrl}#next`,
                code: 302
              }
            ]
          : undefined
      },
      {
        path: urlBuilder.eventRootUrl,
        template: 'src/containers/event/Listing',
        getData: async () => ({
          events: clientEvents
        })
      },
      {
        path: urlBuilder.clanRootUrl,
        template: 'src/containers/clan/Listing',
        sharedData: {
          clans: sharedClans
        }
      }
    )

    const sharedPreviousEventLeaderboards = createSharedData(
      previousEventLeaderboards
    )
    const customLeaderboardData = {
      event: currentEventId ? currentEvent : previousEvent,
      currentEventId
    }
    const customLeaderboardSharedData = {
      apiStatus: sharedApiStatus,
      clans: sharedClans,
      leaderboards: currentEventId
        ? sharedCurrentEventLeaderboards
        : sharedPreviousEventLeaderboards
    }

    routes.push(
      {
        path: urlBuilder.leaderboardRootUrl,
        template: 'src/containers/CustomLeaderboard',
        getData: async () => ({
          ...customLeaderboardData
        }),
        sharedData: {
          ...customLeaderboardSharedData
        }
      },
      {
        path: '/pixelpub/',
        template: 'src/containers/CustomLeaderboard',
        getData: async () => ({
          ...customLeaderboardData,
          selectedIds: constants.clans.pixelPub,
          meta: {
            title: 'PixelPub leaderboard',
            robots: 'noindex,nofollow',
            overall: false
          }
        }),
        sharedData: {
          ...customLeaderboardSharedData
        }
      }
    )

    return routes
  },
  Document: Html
}
