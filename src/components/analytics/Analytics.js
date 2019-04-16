import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import * as ReactGA from 'react-ga-donottrack'
import { globalHistory } from '@reach/router'

const constants = require('../../utils/constants')

const historyListener = ({ location }) => {
  ReactGA.set({ page: location.pathname })
  ReactGA.pageview(location.pathname)
}

const Analytics = class extends PureComponent {
  constructor(props) {
    super(props)

    ReactGA.initialize(constants.meta.trackingId)
    ReactGA.set({
      transport: 'beacon'
    })
  }

  componentDidMount() {
    historyListener({ location: globalHistory.location, action: 'PUSH' })
    globalHistory.listen(historyListener)
  }

  render() {
    const { children } = this.props

    return children
  }
}

Analytics.propTypes = {
  children: PropTypes.node
}

export default Analytics
