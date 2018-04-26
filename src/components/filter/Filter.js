import React, { Component } from 'react'
import ReactTags from 'react-tag-autocomplete'
import PropTypes from 'prop-types'
import styles from './Filter.styl'

const baseClassName = 'filter'

class Filter extends Component {
  render () {
    const { placeholder, suggestions, tags, handleAddition, handleDelete } = this.props

    return (
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
          selectedTag: styles[`${baseClassName}__selected-tag`],
          selectedTagName: styles[`${baseClassName}__selected-tag-name`],
          search: styles[`${baseClassName}__search`],
          searchInput: styles[`${baseClassName}__search-input`],
          suggestions: styles[`${baseClassName}__suggestions`],
          suggestionActive: styles['is-active'],
          suggestionDisabled: styles['is-disabled']
        }}
      />
    )
  }
}

Filter.defaultProps = {
  placeholder: 'Filter'
}

Filter.propTypes = {
  placeholder: PropTypes.string,
  suggestions: PropTypes.array,
  tags: PropTypes.array,
  handleAddition: PropTypes.func,
  handleDelete: PropTypes.func
}

export default Filter
