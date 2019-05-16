import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import List from '../list/List'
import styles from './Swatch.styl'

const baseClassName = 'swatch'

const Swatch = class extends PureComponent {
  render() {
    const { name, value } = this.props

    if (!value) return null

    return (
      <div className={styles[baseClassName]} style={{ backgroundColor: value }}>
        <div className={styles[`${baseClassName}__caption`]}>
          {name && (
            <h2 className={styles[`${baseClassName}__title`]}>{name}</h2>
          )}
          <List unstyled className={styles[`${baseClassName}__list`]}>
            <li className={styles[`${baseClassName}__value`]}>{value}</li>
          </List>
        </div>
      </div>
    )
  }
}

Swatch.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string
}

export default Swatch
