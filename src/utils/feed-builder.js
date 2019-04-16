const constants = require('./constants')
const urlBuilder = require('./url-builder')

module.exports = route => {
  const { event } = route.data
  var kicker

  if (event.isCurrent) kicker = constants.kicker.current
  if (event.isPast)
    kicker = event.isPrevious
      ? constants.kicker.previous
      : constants.kicker.past
  if (event.isFuture)
    kicker = event.isNext ? constants.kicker.next : constants.kicker.future

  const url = `${process.env.SITE_URL}${urlBuilder.eventUrl(event.id)}`
  const canonicalUrl = `${process.env.SITE_URL}${event.path}`
  const description = event.description
  const content = `${kicker}: ${canonicalUrl} - ${description}`

  return {
    title: `${event.name} - ${kicker}`,
    description,
    url,
    guid: url,
    date: event.startDate,
    custom_elements: [{ 'content:encoded': content }]
  }
}
