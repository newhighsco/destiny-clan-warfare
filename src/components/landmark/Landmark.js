import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styles from './Landmark.styl'

const baseClassName = 'landmark'

const Landmark = class extends PureComponent {
  render () {
    const { id, a11yText } = this.props

    return (
      <a id={id} className={styles[baseClassName]}>
        <span className="is-vhidden">{a11yText}</span>
      </a>
    )
  }
}

Landmark.propTypes = {
  id: PropTypes.string,
  a11yText: PropTypes.string
}

export default Landmark
