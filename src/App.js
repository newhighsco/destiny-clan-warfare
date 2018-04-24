import React, { Component } from 'react'
import { Router, Switch, Route, Head, Loading } from 'react-static'
import identity from 'netlify-identity-widget'
import { hot } from 'react-hot-loader'
import Routes from 'react-static-routes'
import NProgress from 'nprogress'
import ReactGA from 'react-ga'
import withAnalytics from './components/analytics/Analytics'
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

    ReactGA.initialize(constants.meta.trackingId)

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
    const { title, name, description } = constants.meta

    const RenderRoutes = ({ getComponentForPath }) => (
      <Route
        path="*"
        render={props => {
          let Comp = withAnalytics(getComponentForPath(props.location.pathname))

          return <Comp key={props.location.pathname} {...props} />
        }}
      />
    )

    return (
      <Router>
        <div className="site-container">
          <Loading
            render={({ loading }) => {
              loading ? NProgress.isStarted() || NProgress.start() : NProgress.done()
              return null
            }}
          />
          <Head
            defaultTitle={title}
            titleTemplate={`%s | ${name}`}
          >
            <meta property="og:title" content={title} />
            <meta name="description" content={description} />
            <meta property="og:description" content={description} />
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
              <Route path={urlBuilder.profileUrl(':member')} component={withAnalytics(Member)} />
              <Route path={urlBuilder.currentEventUrl(':clan', ':member')} component={withAnalytics(EventMember)} />
              <Routes component={RenderRoutes} />
            </Switch>
          )}
        </div>
      </Router>
    )
  }
}

export default hot(module)(App)
