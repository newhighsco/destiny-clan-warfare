import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './Tag.styl'

const baseClassName = 'tag'
const allowedTags = [
  { name: 'Beta Tester', shortName: 'Beta', tier: 3 },
  { name: 'Creator', tier: 1 },
  { name: 'Insider', tier: 2 },
  { name: 'Rockstar', tier: 3 }
]

class Tag extends PureComponent {
  render() {
    const { name } = this.props
    const allowed = allowedTags.find(
      tag => tag.name.toLowerCase() === name.toLowerCase()
    )

    if (!allowed) return null

    return (
      <div
        className={classNames(
          styles[baseClassName],
          allowed.tier && styles[`${baseClassName}--tier-${allowed.tier}`]
        )}
        data-label={allowed.shortName || allowed.name}
      />
    )
  }
}

Tag.propTypes = {
  name: PropTypes.string
}

class TagList extends PureComponent {
  render() {
    const { tags, className } = this.props
    if (!tags || tags.length < 1) return null

    return (
      <ul
        className={classNames(
          'list--inline',
          styles[`${baseClassName}-list`],
          className
        )}
      >
        {tags.map((tag, i) => (
          <li key={i}>
            <Tag {...tag} />
          </li>
        ))}
      </ul>
    )
  }
}

TagList.propTypes = {
  tags: PropTypes.array,
  className: PropTypes.string
}

export { allowedTags, Tag, TagList }
