import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Avatar = (props) => {
  const { src, className } = props

  return (
    <div {...props} className={classNames('avatar', className)}>
      <img src={src} alt="" />
    </div>
  )
}

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default Avatar
