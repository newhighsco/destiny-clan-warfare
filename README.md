# Destiny Clan Warfare

https://destinyclanwarfare.com

[![Netlify Status](https://api.netlify.com/api/v1/badges/1e5e8d64-7f4c-4975-b77e-af014b42eb51/deploy-status)](https://app.netlify.com/sites/destiny-clan-warfare/deploys)
[![Storybook](https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg)](https://storybook.destinyclanwarfare.com/)
[![CircleCI](https://circleci.com/gh/newhighsco/destiny-clan-warfare.svg?style=svg)](https://circleci.com/gh/newhighsco/destiny-clan-warfare)
[![codecov](https://codecov.io/gh/newhighsco/destiny-clan-warfare/branch/main/graph/badge.svg)](https://codecov.io/gh/newhighsco/destiny-clan-warfare)

## Setup

Install dependencies

```
nvm install
yarn install
```

Add a `.env.local` at the root of your project and configure the following environment variables:

```elixir
URL=https://localhost.destinyclanwarfare.com:9001

# Copy from Bungie.net "development" application
# https://www.bungie.net/en/Application
BUNGIE_API_KEY= # "API Key"
BUNGIE_CLIENT_ID= # "OAuth client_id"
BUNGIE_CLIENT_SECRET= # "OAuth client_secret"

# Copy from Netlify environment variables
NEXTAUTH_JWT_SIGNING_KEY=
NEXTAUTH_SECRET=
```

## Run

All project processes can be started using the following:

```
yarn start
```

## Testing

Runs all the automated QA tools

This can be run using:

```
yarn test
```

## Build

Generate a production build of the site using the following:

```
yarn build
```

## [CHANGELOG](CHANGELOG.md)
