import React, { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const apiHelper = require('../utils/api-helper')
const bungieHelper = require('../utils/bungie-helper')

const proxy = apiHelper.proxy()
const bungieApi = bungieHelper.api()

const defaultValue = {
  isEnhanced: false,
  apiDisabled: false,
  enrollmentOpen: false
}

const AppContext = createContext(defaultValue)

const { Consumer, Provider } = AppContext

const withApp = Component => {
  const AppComponent = props => {
    return (
      <Consumer>{contexts => <Component {...props} {...contexts} />}</Consumer>
    )
  }

  return AppComponent
}

function AppProvider({ children, value }) {
  const [state, setState] = useState({ ...defaultValue, ...value })

  useEffect(() => {
    var { isEnhanced, apiDisabled, enrollmentOpen } = state
    var complete = isEnhanced

    // Disable API lookups
    complete = true

    async function fetchData() {
      if (!complete) {
        setState(state => ({ ...state, isEnhanced: true }))

        await bungieApi(`/Destiny2/Milestones/`)
          .then(({ data }) => {
            apiDisabled = bungieHelper.disabled(data.ErrorCode)
          })
          .catch(() => {
            apiDisabled = true
          })

        if (apiDisabled) {
          enrollmentOpen = false
        } else {
          await proxy(`Clan/AcceptingNewClans`)
            .then(({ data }) => {
              enrollmentOpen = data
            })
            .catch(() => {
              enrollmentOpen = false
            })
        }

        setState(state => ({ ...state, apiDisabled, enrollmentOpen }))
      }
    }

    fetchData()

    return () => {
      complete = true
    }
  }, [])

  return <Provider value={state}>{children}</Provider>
}

AppProvider.propTypes = {
  children: PropTypes.node,
  value: PropTypes.object
}

export { AppContext, AppProvider, withApp }
