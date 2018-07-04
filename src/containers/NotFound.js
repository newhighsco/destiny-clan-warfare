import React, { PureComponent } from 'react'
import NotFound from '../components/not-found/NotFound'

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
      <NotFound />
    )
  }
}

export default NotFoundContainer
