const online = () => {
  var online

  try {
    online = navigator && navigator.onLine
  } catch (e) {
    online = true
  }

  return online
}

module.exports = online
