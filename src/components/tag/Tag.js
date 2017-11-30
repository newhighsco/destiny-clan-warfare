import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './Tag.styl'

const slugify = require('slugg')

const baseClassName = 'tag'

const Tag = ({ name, description }) => {
  return (
    <div className={classNames(
      baseClassName,
      `${baseClassName}--${slugify(name)}`
    )} />
  )
}

Tag.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string
}

const TagList = ({ tags, className }) => {
  if (!tags) return null

  return (
    <ul className={classNames('list--inline', `${baseClassName}-list`, className)}>
      {tags.map((tag, i) => (
        <li key={i}>
          <Tag {...tag} />
        </li>
      ))}
    </ul>
  )
}

TagList.propTypes = {
  tags: PropTypes.array,
  className: PropTypes.string
}

export {
  Tag,
  TagList
}
