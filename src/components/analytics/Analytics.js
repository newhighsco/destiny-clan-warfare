import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'

export default function withAnalytics (WrappedComponent, options = {}) {
  const trackPage = (page) => {
    ReactGA.set({
      page,
      ...options
    })
    ReactGA.pageview(page)
  }

  const Analytics = class extends Component {
    componentDidMount () {
      const page = this.props.location.pathname

      trackPage(page)
    }

    componentWillReceiveProps (nextProps) {
      const currentPage = this.props.location.pathname
      const nextPage = nextProps.location.pathname

      if (currentPage !== nextPage) {
        trackPage(nextPage)
      }
    }

    render () {
      return <WrappedComponent {...this.props} />
    }
  }

  Analytics.propTypes = {
    location: PropTypes.object
  }

  return Analytics
}
