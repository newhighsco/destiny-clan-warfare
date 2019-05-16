import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import SmartLink from '../smart-link/SmartLink'
import Icon from '../icon/Icon'
import ExternalSvg from '../../images/icons/external.svg'
import styles from './TextButton.styl'

const baseClassName = 'text-button'

const TextButton = class extends PureComponent {
  render() {
    const { children, className, target, ...rest } = this.props

    if (!children) return null

    return (
      <SmartLink
        className={classNames(styles[baseClassName], className)}
        target={target}
        {...rest}
      >
        {children}
        {target === '_blank' && (
          <Icon
            className={styles[`${baseClassName}__external`]}
            a11yText="View permalink"
          >
            <ExternalSvg />
          </Icon>
        )}
      </SmartLink>
    )
  }
}

TextButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  target: PropTypes.string
}

export default TextButton
