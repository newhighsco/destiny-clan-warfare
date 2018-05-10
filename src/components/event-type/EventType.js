import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Avatar from '../avatar/Avatar'
import Icons from './icons'

class EventType extends PureComponent {
  constructor (props) {
    super(props)

    const { name } = this.props
    const names = [
      { pattern: 'competitive|pvp', key: 'Competitive' },
      { pattern: 'crimson', key: 'CrimsonDays' },
      { pattern: 'iron banner', key: 'IronBanner' },
      { pattern: 'quickplay', key: 'Quickplay' },
      { pattern: 'strike', key: 'Strikes' },
      { pattern: 'trials', key: 'Trials' }
    ]

    const match = names.find(({ pattern, key }) => {
      const regex = new RegExp(pattern, 'i')
      return name.toLowerCase() === key.toLowerCase() || regex.test(name)
    })

    this.state = {
      key: match ? match.key : null
    }
  }

  render () {
    const { key } = this.state
    const IconSvg = Icons.hasOwnProperty(key) ? Icons[key] : null

    if (!IconSvg) return null

    return (
      <Avatar cutout>
        <IconSvg />
      </Avatar>
    )
  }
}

EventType.propTypes = {
  name: PropTypes.string
}

export default EventType
