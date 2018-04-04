import React, { Component } from 'react'
import { Router, Switch, Route, Head, onLoading } from 'react-static'
import identity from 'netlify-identity-widget'
import { hot } from 'react-hot-loader'
import Routes from 'react-static-routes'
import NProgress from 'nprogress'
import HoldingPage from './components/holding-page/HoldingPage'
import { Logo } from './components/logo/Logo'
import { Button, ButtonGroup } from './components/button/Button'
import Member from './templates/member'
import EventMember from './templates/event-member'
import appleTouchIcon from './images/apple-touch-icon.png'
import openGraphImage from './images/favicon-1200x1200.png'

import './stylus/index.styl'

const constants = require('./utils/constants')
const enableIdentity = JSON.parse(process.env.ENABLE_IDENTITY)
const enableIdentityLogin = JSON.parse(process.env.ENABLE_IDENTITY_LOGIN)
const urlBuilder = require('./utils/url-builder')

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      user: identity.currentUser(),
      enableIdentity: false,
      enableIdentityLogin: enableIdentityLogin
    }

    identity.on('login', (user) => {
      this.setState({ user: user })
      identity.close()
    })
    identity.on('logout', () => this.setState({ user: null }))

    this.handleLogin = this.handleLogin.bind(this)
  }

  componentWillMount () {
    this.unsubscribe = onLoading(loading => {
      if (loading) {
        NProgress.start()
      } else {
        NProgress.done()
      }
    })
  }

  componentDidMount () {
    this.setState({ enableIdentity: enableIdentity })
    identity.init()

    if (!enableIdentityLogin) identity.logout()
  }

  handleLogin (e) {
    e.preventDefault()
    identity.open()
  }

  render () {
    const { user, enableIdentity, enableIdentityLogin } = this.state
    const { title, name } = constants.meta

    return (
      <Router>
        <div className="site-container">
          <Head
            defaultTitle={title}
            titleTemplate={`%s | ${name}`}
          >
            <link rel="apple-touch-icon" href={appleTouchIcon} />
            <meta property="og:image" content={openGraphImage} />
          </Head>
          {(enableIdentity && !user) ? (
            <HoldingPage>
              <Logo />
              {enableIdentityLogin &&
                <ButtonGroup>
                  <Button onClick={this.handleLogin}>Log in to view</Button>
                </ButtonGroup>
              }
            </HoldingPage>
          ) : (
            <Switch>
              <Route path={urlBuilder.profileUrl(':member')} component={Member} />
              <Route path={urlBuilder.currentEventUrl(':clan', ':member')} component={EventMember} />
              <Routes />
            </Switch>
          )}
        </div>
      </Router>
    )
  }
}

export default hot(module)(App)
