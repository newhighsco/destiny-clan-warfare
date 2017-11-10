import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ResponsiveMedia from '../responsive-media/ResponsiveMedia'

const Avatar = (props) => {
  const { src, className } = props

  return (
    <div {...props} className={classNames('avatar', className)}>
      <ResponsiveMedia ratio="1:1">
        <img src={src} alt="" />
      </ResponsiveMedia>
    </div>
  )
}

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default Avatar
