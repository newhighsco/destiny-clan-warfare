import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './Advert.styl'

const online = require('../../utils/online')

class Advert extends Component {
  constructor (props) {
    super(props)

    this.state = { active: false }
  }

  componentDidMount () {
    (window.adsbygoogle = window.adsbygoogle || []).push({})

    this.setState({ active: true })
  }

  render () {
    const { client, slot, format } = this.props
    const { active } = this.state
    const baseClassName = 'advert'

    if (!online) return null

    return (
      <div className={classNames(baseClassName, active && `${baseClassName}--active`)}>
        <ins className="adsbygoogle" data-ad-client={client} data-ad-slot={slot} data-ad-format={format} />
      </div>
    )
  }
}

Advert.defaultProps = {
  client: 'ca-pub-5655051109573002',
  slot: '2916154772',
  format: 'auto'
}

Advert.propTypes = {
  client: PropTypes.string,
  slot: PropTypes.string,
  format: PropTypes.string
}

export default Advert
