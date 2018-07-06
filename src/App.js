import React, { Component } from 'react'
import { Router, Switch, Route, Head, onLoading } from 'react-static'
import Routes from 'react-static-routes'
import NProgress from 'nprogress'
import ReactGA from 'react-ga'
import withAnalytics from './components/analytics/Analytics'
import MemberCurrent from './containers/member/Current'
import MemberOverall from './containers/member/Overall'
import appleTouchIcon from './images/apple-touch-icon.png'
import openGraphImage from './images/favicon-1200x1200.png'

import './stylus/index.styl'

const constants = require('./utils/constants')
const urlBuilder = require('./utils/url-builder')

const { title, name, description } = constants.meta

class App extends Component {
  constructor (props) {
    super(props)

    ReactGA.initialize(constants.meta.trackingId)
  }

  componentDidMount () {
    onLoading(loading => {
      loading ? NProgress.isStarted() || NProgress.start() : NProgress.done()
    })
  }

  render () {
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
          <Switch>
            {/* <Route path={urlBuilder.profileUrl(':clan', ':member')} component={withAnalytics(MemberOverall)} />
            <Route path={urlBuilder.currentEventUrl(':clan', ':member')} component={withAnalytics(MemberCurrent)} /> */}
            <Routes component={RenderRoutes} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
