import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import identity from 'netlify-identity-widget'
import HoldingPage from '../components/HoldingPage/HoldingPage'
import Logo from '../components/Logo/Logo'

import '../stylus/index.styl'

class TemplateWrapper extends Component {
  constructor (props) {
    super(props)

    this.state = { user: identity.currentUser() }

    identity.on('init', (user) => this.setState({ user }))
    identity.on('login', (user) => this.setState({ user }))
    identity.on('logout', () => this.setState({ user: null }))

    this.handleOpen = this.handleOpen.bind(this)
  }

  componentDidMount () {
    identity.init()
  }

  handleOpen () {
    identity.open()
  }

  render () {
    const { children, data } = this.props
    const { user } = this.state

    if (data.site.siteMetadata.enableIdentity && !user) {
      return (
        <div className="site-container">
          <Helmet
            meta={[
              { name: 'robots', content: 'noindex,nofollow' }
            ]}
          />
          <HoldingPage>
            <div className="content-center content-gutter text-center">
              <Logo />
              <button className="button" onClick={this.handleOpen}>Log in to view</button>
            </div>
          </HoldingPage>
        </div>
      )
    }

    return (
      <div className="site-container">
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: data.site.siteMetadata.description }
          ]}
          htmlAttributes={
            { lang: 'en' }
          }
        />
        {children()}
      </div>
    )
  }
}

TemplateWrapper.propTypes = {
  children: PropTypes.func,
  data: PropTypes.object
}

export default TemplateWrapper

export const query = graphql`
  query templateWrapperQuery {
    site {
      siteMetadata {
        enableIdentity
        title
        description
      }
    }
  }
`
