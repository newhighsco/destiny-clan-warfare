const constants = require('./constants')
const urlBuilder = require('./url-builder')

module.exports = (allEvents, kicker) => {
  const pastEvents = allEvents.filter(({ isPast }) => isPast)
  const futureEvents = allEvents.filter(({ isFuture }) => isFuture)
  const previousEvent = pastEvents.length > 0 ? pastEvents[0] : null
  const nextEvent = futureEvents.length > 0 ? futureEvents[0] : null
  const allowedEvents = []
  const allowedKickers = kicker ? [ kicker ] : [
    constants.kicker.current,
    constants.kicker.past,
    constants.kicker.future,
    constants.kicker.previous,
    constants.kicker.next
  ]

  allEvents.map(event => {
    var kicker = event.isCurrent ? constants.kicker.current : (event.isPast ? constants.kicker.past : constants.kicker.future)

    if (previousEvent && event.path === previousEvent.path) kicker = constants.kicker.previous
    if (nextEvent && event.path === nextEvent.path) kicker = constants.kicker.next

    if (allowedKickers.indexOf(kicker) === -1) return

    const url = `${process.env.SITE_URL}${urlBuilder.eventUrl(event.id)}`
    const canonicalUrl = `${process.env.SITE_URL}${event.path}`
    const description = event.description
    const content = `${kicker}: ${canonicalUrl} - ${description}`

    allowedEvents.push({
      title: `${event.name} - ${kicker}`,
      description: description,
      url: url,
      guid: url,
      date: event.startDate,
      custom_elements: [
        {
          'content:encoded': content
        }
      ]
    })
  })

  return allowedEvents
}
