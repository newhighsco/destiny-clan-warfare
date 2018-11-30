import React, { Component } from 'react'
import classNames from 'classnames'
import ReactTags from 'react-tag-autocomplete'
import PropTypes from 'prop-types'
import { firstBy } from 'thenby'
import { Lockup } from '../lockup/Lockup'
import styles from './Filter.styl'

const baseClassName = 'filter'

const emptyHandle = () => {}

const filterById = (all, id) => all.indexOf(id) !== -1

const getIds = tags => tags.reduce((ids, tag) => ids.concat(tag.id), []).sort()

class Filter extends Component {
  render () {
    var { suggestions } = this.props

    if (!suggestions.length) return null

    const { className, kicker, placeholder, maxSuggestionsLength, tags, handleAddition, handleDelete } = this.props
    const ids = getIds(tags || [])

    suggestions = suggestions.map(suggestion => ({ ...suggestion, disabled: filterById(ids, suggestion.id) })).sort(firstBy('disabled'))

    return (
      <div className={classNames('field', className)}>
        {kicker &&
          <Lockup borderless center kicker={kicker} className={styles[`${baseClassName}__lockup`]} />
        }
        <ReactTags
          autofocus={false}
          placeholder={placeholder}
          suggestions={suggestions}
          tags={tags}
          handleAddition={handleAddition || emptyHandle}
          handleDelete={handleDelete || emptyHandle}
          maxSuggestionsLength={maxSuggestionsLength}
          classNames={{
            root: styles[baseClassName],
            rootFocused: styles['is-focused'],
            selected: styles[`${baseClassName}__selected`],
            selectedTag: styles[`${baseClassName}-tag`],
            selectedTagName: styles[`${baseClassName}-tag__name`],
            search: styles[`${baseClassName}__search`],
            searchInput: styles[`${baseClassName}__input`],
            suggestions: styles[`${baseClassName}__suggestions`],
            suggestionActive: styles['is-active'],
            suggestionDisabled: styles['is-disabled']
          }}
        />
      </div>
    )
  }
}

Filter.defaultProps = {
  placeholder: 'Filter',
  maxSuggestionsLength: 10,
  suggestions: []
}

Filter.propTypes = {
  className: PropTypes.string,
  kicker: PropTypes.string,
  placeholder: PropTypes.string,
  maxSuggestionsLength: PropTypes.number,
  suggestions: PropTypes.array,
  tags: PropTypes.array,
  handleAddition: PropTypes.func,
  handleDelete: PropTypes.func
}

export {
  Filter,
  getIds,
  filterById
}
