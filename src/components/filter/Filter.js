import React, { Component } from 'react'
import ReactTags from 'react-tag-autocomplete'
import PropTypes from 'prop-types'
import MultiSort from 'multi-sort'
import { Lockup } from '../lockup/Lockup'
import styles from './Filter.styl'

const baseClassName = 'filter'

const filterById = (all, id) => all.indexOf(`${id}`) !== -1

const getIds = tags => tags.reduce((ids, tag) => ids.concat(`${tag.id}`), [])

class Filter extends Component {
  render () {
    var { suggestions } = this.props
    const { kicker, placeholder, tags, handleAddition, handleDelete } = this.props
    const ids = getIds(tags)

    suggestions = MultiSort(
      suggestions.map(suggestion => ({ ...suggestion, disabled: filterById(ids, suggestion.id) })),
      'disabled',
      'ASC'
    )

    return (
      <div className="field">
        {kicker &&
          <Lockup borderless center kicker={kicker} className={styles[`${baseClassName}__lockup`]} />
        }
        <ReactTags
          placeholder={placeholder}
          suggestions={suggestions}
          tags={tags}
          handleAddition={handleAddition}
          handleDelete={handleDelete}
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
  placeholder: 'Add'
}

Filter.propTypes = {
  kicker: PropTypes.string,
  placeholder: PropTypes.string,
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
