import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './ResponsiveMedia.styl'

const ratioRegex = /^\d+:\d+$/

const ResponsiveMedia = ({ children, ratio, className }) => {
  if (!ratio) return children

  const ratioParts = ratio.split(':')
  const ratioPercentage = ratio && (ratioParts[1] / ratioParts[0]) * 100
  const ratioPercentageRounded = ratioPercentage && parseFloat(ratioPercentage.toFixed(4))

  return (
    <div
      className={classNames('responsive-media', className)}
      style={ratio && { paddingBottom: `${ratioPercentageRounded}%` }}
      >
      {children}
    </div>
  )
}

ResponsiveMedia.defaultProps = {}

ResponsiveMedia.propTypes = {
  children: PropTypes.node.isRequired,
  ratio: (props, propName, componentName) => {
    const ratio = props[propName]
    return !ratio || ratioRegex.exec(ratio) ? null : new Error(`${propName} (${props[propName]}) in ${componentName} is not in the expected format (e.g. 16:9)`)
  },
  className: PropTypes.string
}

export default ResponsiveMedia
