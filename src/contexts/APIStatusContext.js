import React, { createContext, Component } from 'react'
import PropTypes from 'prop-types'

const apiHelper = require('../utils/api-helper')
const bungieHelper = require('../utils/bungie-helper')

const proxy = apiHelper.proxy()
const bungieApi = bungieHelper.api()

const defaultValue = {
  apiDisabled: false,
  enrollmentOpen: true
}

const APIStatusContext = createContext(defaultValue)

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

    this.state = defaultValue
  }

  async componentDidMount() {
    var { apiDisabled, enrollmentOpen } = this.state

    await bungieApi(`/Destiny2/Milestones/`)
      .then(({ data }) => {
        apiDisabled = bungieHelper.disabled(data.ErrorCode)
      })
      .catch(() => {})

    if (apiDisabled) {
      enrollmentOpen = false
    } else {
      await proxy(`Clan/AcceptingNewClans`)
        .then(({ data }) => {
          enrollmentOpen = data
        })
        .catch(() => {})
    }

    this.setState({ apiDisabled, enrollmentOpen })
  }

  render() {
    const { children } = this.props

    return <Provider value={this.state}>{children}</Provider>
  }
}

APIStatusProvider.propTypes = {
  children: PropTypes.node
}

export { APIStatusContext, APIStatusProvider, withAPIStatus }
