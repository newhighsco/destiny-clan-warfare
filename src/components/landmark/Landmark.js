import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { VisuallyHidden } from '../visually-hidden/VisuallyHidden'
import styles from './Landmark.styl'

const baseClassName = 'landmark'

const Landmark = class extends PureComponent {
  render () {
    const { id, a11yText } = this.props

    return (
      <a id={id} className={styles[baseClassName]}>
        <VisuallyHidden>{a11yText}</VisuallyHidden>
      </a>
    )
  }
}

Landmark.propTypes = {
  id: PropTypes.string,
  a11yText: PropTypes.string
}

export default Landmark
