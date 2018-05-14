import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './Swatch.styl'

const baseClassName = 'swatch'

class Swatch extends PureComponent {
  render () {
    const { name, value } = this.props

    return (
      <div className={classNames(styles[baseClassName], styles[`${baseClassName}--${name.replace(/ /g, '-').toLowerCase()}`])}>
        <div className={styles[`${baseClassName}__caption`]}>
          <div className={styles[`${baseClassName}__title`]}>{name}</div>
          <ul className={classNames('list--unstyled', styles[`${baseClassName}__list`])}>
            <li className={styles[`${baseClassName}__value`]}>{value}</li>
          </ul>
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
