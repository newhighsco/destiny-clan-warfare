import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './Tag.styl'

const slugify = require('slugg')

const baseClassName = 'tag'

const Tag = ({ name, description }) => {
  const allowedTags = [
    { name: 'Beta Tester', label: 'Beta' },
    { name: 'Creator', label: 'Creator' }
  ]

  const allowed = allowedTags.find(tag => tag.name.toLowerCase() === name.toLowerCase())

  if (!allowed) return null

  return (
    <div
      className={classNames(
        baseClassName,
        `${baseClassName}--${slugify(allowed.name)}`
      )}
      data-label={allowed.label}
    />
  )
}

Tag.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string
}

const TagList = ({ tags, className }) => {
  if (!tags || tags.length < 1) return null

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
