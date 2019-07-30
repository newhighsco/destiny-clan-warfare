import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

const apiHelper = require('../utils/api-helper')
const bungieHelper = require('../utils/bungie-helper')

const proxy = apiHelper.proxy()
const bungieApi = bungieHelper.api()

const APIStatusContext = React.createContext()
const { Consumer, Provider } = APIStatusContext

function withAPIStatus(Component) {
  return function ThemeComponent(props) {
    return (
      <Consumer>{contexts => <Component {...props} {...contexts} />}</Consumer>
    )
  }
}

const APIStatusProvider = class extends Component {
  constructor(props) {
    super(props)

    const { apiStatus = {} } = this.props
    const apiDisabled = bungieHelper.disabled(apiStatus.bungieStatus)
    const enrollmentOpen = apiStatus.enrollmentOpen && !apiDisabled

    this.state = {
      apiDisabled,
      enrollmentOpen,
      sources: {
        bungie: axios.CancelToken.source(),
        api: axios.CancelToken.source()
      }
    }
  }

  async componentDidMount() {
    var { apiDisabled, enrollmentOpen, sources } = this.state

    if (!apiDisabled) {
      await bungieApi(`/Destiny2/Milestones/`, { cancelToken: sources.bungie })
        .then(({ data }) => {
          apiDisabled = bungieHelper.disabled(data.ErrorCode)
        })
        .catch(() => {})

      await proxy(`Clan/AcceptingNewClans`, { cancelToken: sources.api })
        .then(({ data }) => {
          enrollmentOpen = data && !apiDisabled
        })
        .catch(() => {})
    }

    this.setState({ apiDisabled, enrollmentOpen })
  }

  componentWillUnmount() {
    var { sources } = this.state

    sources.bungie.cancel()
    sources.api.cancel()
  }

  render() {
    const { children } = this.props
    const { sources, ...rest } = this.state

    return <Provider value={rest}>{children}</Provider>
  }
}

APIStatusProvider.propTypes = {
  apiStatus: PropTypes.object,
  children: PropTypes.node
}

export { APIStatusContext, APIStatusProvider, withAPIStatus }
