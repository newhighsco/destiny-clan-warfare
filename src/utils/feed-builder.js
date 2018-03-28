const constants = require('./constants')

module.exports = (allEvents, kicker) => {
  const pastEvents = allEvents.filter(node => node.isPast)
  const futureEvents = allEvents.filter(node => node.isFuture)
  const previousEvent = pastEvents.length > 0 ? pastEvents[0].node : null
  const nextEvent = futureEvents.length > 0 ? futureEvents[0].node : null
  const allowedEvents = []
  const allowedKickers = kicker ? [ kicker ] : [
    constants.kicker.current,
    constants.kicker.past,
    constants.kicker.future,
    constants.kicker.previous,
    constants.kicker.next
  ]

  allEvents.map((node) => {
    var kicker = node.isCurrent ? constants.kicker.current : (node.isPast ? constants.kicker.past : constants.kicker.future)

    if (previousEvent && node.path === previousEvent.path) kicker = constants.kicker.previous
    if (nextEvent && node.path === nextEvent.path) kicker = constants.kicker.next

    if (allowedKickers.indexOf(kicker) === -1) return

    const url = `${process.env.GATSBY_SITE_URL}${node.path}`
    const description = node.description
    const content = `${kicker}: ${url} - ${description}`

    allowedEvents.push({
      title: `${node.name} - ${kicker}`,
      description: description,
      url: url,
      guid: url,
      date: node.startDate,
      custom_elements: [
        {
          'content:encoded': content
        }
      ]
    })
  })

  return allowedEvents
}
