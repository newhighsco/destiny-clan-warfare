import React, { PureComponent } from 'react'
import { Link } from 'react-static'
import HoldingPage from '../components/holding-page/HoldingPage'
import { Logo } from '../components/logo/Logo'

const meta = {
  title: 'Page not found',
  description: 'Sorry, this page could not be found',
  robots: 'noindex,nofollow'
}

class NotFoundContainer extends PureComponent {
  constructor (props) {
    super(props)

    this.state = { active: false }
  }

  componentDidMount () {
    const { active } = this.state

    if (!active) this.setState({ active: true })
  }

  render () {
    const { active } = this.state

    if (!active) return null

    return (
      <HoldingPage meta={meta}>
        <Link to="/">
          <Logo />
        </Link>
      </HoldingPage>
    )
  }
}

export default NotFoundContainer
