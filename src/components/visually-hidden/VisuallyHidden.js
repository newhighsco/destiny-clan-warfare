import React, { PureComponent } from 'react'
import { node } from 'prop-types'
import styles from './VisuallyHidden.styl'

const baseClassName = 'visually-hidden'
const visuallyHiddenClassName = styles[baseClassName]

const VisuallyHidden = class extends PureComponent {
  render() {
    const { children } = this.props

    if (!children) return null

    return <span className={visuallyHiddenClassName}>{children}</span>
  }
}

VisuallyHidden.propTypes = {
  children: node
}

export { VisuallyHidden, visuallyHiddenClassName }
