import type { Handler } from '@netlify/functions'

export const handler: Handler = async event => {
  if (event.httpMethod.toUpperCase() !== 'POST') {
    return {
      statusCode: 204
    }
  }

  // const signature =
  //   event.headers['X-Webhook-Signature'] || event.headers['x-webhook-signature']

  // if (
  //   !signature ||
  //   !jwtSecret ||
  //   !event.body ||
  //   !isValidSignature(signature, jwtSecret, event.body)
  // ) {
  //   return {
  //     statusCode: 403
  //   }
  // }

  const token = process.env.CIRCLECI_TOKEN

  if (!token) {
    console.error('CIRCLECI_TOKEN not set')

    return {
      statusCode: 204
    }
  }

  const { branch } = JSON.parse(event.body)
  const { workflow } = event.queryStringParameters

  try {
    console.log('Triggering CircleCI workflow', workflow)

    const response = await fetch(
      'https://circleci.com/api/v2/project/gh/newhighsco/destiny-clan-warfare/pipeline',
      {
        method: 'POST',
        headers: { 'Content-type': 'application/json', 'Circle-Token': token },
        body: JSON.stringify({ branch, parameters: { workflow } })
      }
    )

    console.log('CircleCI workflow triggered', response.status)

    return {
      statusCode: response.status,
      body: JSON.stringify({})
    }
  } catch (error) {
    console.error('CircleCI workflow failed', error)

    return {
      statusCode: 500
    }
  }
}
