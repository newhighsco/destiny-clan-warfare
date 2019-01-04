import '@babel/polyfill'
import React, { Component } from 'react'
import { Root, Routes, Head } from 'react-static'
import { Router } from '@reach/router'
import ReactGA from 'react-ga'
// import withAnalytics from './components/analytics/Analytics'
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

    // TODO: Get analytics working
    ReactGA.initialize(constants.meta.trackingId)
  }

  render () {
    // const RenderRoutes = ({ routePath, getComponentForPath }) => (
    //   <Route
    //     path={routePath}
    //     render={props => {
    //       let Comp = withAnalytics(getComponentForPath(routePath))

    //       return <Comp key={routePath} {...props} />
    //     }}
    //   />
    // )

    return (
      <Root>
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
        <Router className="site-container">
          <MemberOverall path={urlBuilder.profileUrl(':clan', ':member')} />
          <MemberCurrent path={urlBuilder.currentEventUrl(':clan', ':member')} />
          <Routes default />
        </Router>
      </Root>
    )
  }
}

export default App
