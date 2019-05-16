import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import SmartLink from '../smart-link/SmartLink'
import Icon from '../icon/Icon'
import ExternalSvg from '../../images/icons/external.svg'
import styles from './Button.styl'

const baseClassName = 'button'

const Button = class extends PureComponent {
  render() {
    const { children, className, size, solid, target, ...rest } = this.props

    if (!children) return null

    return (
      <SmartLink
        className={classNames(
          styles[baseClassName],
          size && styles[`${baseClassName}--${size}`],
          solid && styles[`${baseClassName}--solid`],
          className
        )}
        target={target}
        {...rest}
      >
        <span>
          {children}
          {target === '_blank' && (
            <Icon
              className={styles[`${baseClassName}__external`]}
              a11yText="View permalink"
            >
              <ExternalSvg />
            </Icon>
          )}
        </span>
      </SmartLink>
    )
  }
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  target: PropTypes.string,
  size: PropTypes.oneOf(['small']),
  solid: PropTypes.bool
}

const ButtonGroup = class extends PureComponent {
  render() {
    const { children, className } = this.props

    if (!children) return null

    return (
      <div className={classNames(styles[`${baseClassName}-group`], className)}>
        {children}
      </div>
    )
  }
}

ButtonGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

export { Button, ButtonGroup }
