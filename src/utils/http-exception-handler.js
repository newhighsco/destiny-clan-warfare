const httpExceptionHandler = (err) => {
  const { status, statusText, data: { message } } = err.response

  console.log(`The server response was "${status} ${statusText}"`)

  if (message) {
    console.log(`Inner exception message : "${message}"`)
  }
}

module.exports = httpExceptionHandler
