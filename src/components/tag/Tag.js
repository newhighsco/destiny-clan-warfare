import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './Tag.styl'

const baseClassName = 'tag'

const Tag = ({ name }) => {
  const allowedTags = [
    { name: 'Beta Tester', tier: 3, label: 'Beta' },
    { name: 'Creator', tier: 1, label: 'Creator' },
    { name: 'Insider', tier: 2, label: 'Insider' }
  ]

  const allowed = allowedTags.find(tag => tag.name.toLowerCase() === name.toLowerCase())

  if (!allowed) return null

  return (
    <div
      className={classNames(
        baseClassName,
        allowed.tier && `${baseClassName}--tier-${allowed.tier}`
      )}
      data-label={allowed.label}
    />
  )
}

Tag.propTypes = {
  name: PropTypes.string
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
