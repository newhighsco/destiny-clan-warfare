import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import identity from 'netlify-identity-widget'
import HoldingPage from '../components/holding-page/HoldingPage'
import { Logo } from '../components/logo/Logo'
import { Button, ButtonGroup } from '../components/button/Button'

import '../stylus/index.styl'

class MasterLayout extends Component {
  constructor (props) {
    super(props)

    this.state = {
      user: identity.currentUser(),
      enableIdentity: false
    }

    identity.on('login', (user) => {
      this.setState({ user: user })
      identity.close()
    })
    identity.on('logout', () => this.setState({ user: null }))

    this.handleLogin = this.handleLogin.bind(this)
  }

  componentDidMount () {
    this.setState({ enableIdentity: JSON.parse(process.env.ENABLE_IDENTITY) })
    identity.init()
  }

  handleLogin (e) {
    e.preventDefault()
    identity.open()
  }

  render () {
    const { children, data } = this.props
    const { user, enableIdentity } = this.state

    return (
      <div className="site-container">
        <Helmet
          defaultTitle={data.site.siteMetadata.title}
          titleTemplate={`%s | ${data.site.siteMetadata.name}`}
        >
          <html lang="en" />
          <meta name="description" content={data.site.siteMetadata.description} />
        </Helmet>
        {(enableIdentity && !user) ? (
          <HoldingPage>
            <Logo />
            <ButtonGroup>
              <Button onClick={this.handleLogin}>Log in to view</Button>
            </ButtonGroup>
          </HoldingPage>
        ) : (
          children
        )}
      </div>
    )
  }
}

MasterLayout.propTypes = {
  children: PropTypes.node,
  data: PropTypes.object
}

export default MasterLayout
