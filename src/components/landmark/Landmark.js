import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { VisuallyHidden } from '../visually-hidden/VisuallyHidden'
import styles from './Landmark.styl'

const baseClassName = 'landmark'

const Landmark = class extends PureComponent {
  render() {
    const { id, a11yText } = this.props

    return (
      <Fragment>
        {/* eslint-disable jsx-a11y/anchor-is-valid */}
        <a id={id} className={styles[baseClassName]}>
          {a11yText && <VisuallyHidden>{a11yText}</VisuallyHidden>}
        </a>
        {/* eslint-enable jsx-a11y/anchor-is-valid */}
      </Fragment>
    )
  }
}

Landmark.propTypes = {
  id: PropTypes.string,
  a11yText: PropTypes.string
}

export default Landmark
