import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import List from '../list/List'
import styles from './Tag.styl'

const baseClassName = 'tag'
const allowedTags = [
  { name: 'Beta Tester', shortName: 'Beta', tier: 3 },
  { name: 'Creator', tier: 1 },
  { name: 'Insider', tier: 2 },
  { name: 'Rockstar', tier: 3 }
]

const isAllowed = name => {
  return allowedTags.find(tag => tag.name.toLowerCase() === name.toLowerCase())
}

const Tag = class extends PureComponent {
  render() {
    const { element, name, size } = this.props

    if (!name) return null

    const allowed = isAllowed(name)

    if (!allowed) return null

    const Element = element

    return (
      <Element
        className={classNames(
          styles[baseClassName],
          allowed.tier && styles[`${baseClassName}--tier-${allowed.tier}`],
          size && styles[`${baseClassName}--${size}`]
        )}
        data-label={allowed.shortName || allowed.name}
      />
    )
  }
}

Tag.defaultProps = {
  element: 'div'
}

Tag.propTypes = {
  element: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.oneOf(['large'])
}

const TagList = class extends PureComponent {
  render() {
    const { tags, cutout, stacked, size, className } = this.props

    if (!tags || tags.length < 1) return null

    const allowed = tags.filter(({ name }) => isAllowed(name))

    if (allowed.length < 1) return null

    const listClassName = `${baseClassName}-list`

    return (
      <List
        inline
        className={classNames(
          styles[listClassName],
          cutout && styles[`${listClassName}--cutout`],
          stacked && styles[`${listClassName}--stacked`],
          className
        )}
      >
        {allowed.map((tag, i) => (
          <li key={i}>
            <Tag {...tag} size={size} />
          </li>
        ))}
      </List>
    )
  }
}

TagList.propTypes = {
  tags: PropTypes.array,
  className: PropTypes.string,
  cutout: PropTypes.bool,
  stacked: PropTypes.bool,
  size: PropTypes.oneOf(['large'])
}

export { allowedTags, Tag, TagList }
