import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import TextButton from '../text-button/TextButton'
import { visuallyHiddenClassName } from '../visually-hidden/VisuallyHidden'
import styles from './Tooltip.styl'

const baseClassName = 'tooltip'

const Tooltip = class extends PureComponent {
  constructor(props) {
    super(props)

    const { active } = this.props

    this.state = {
      active,
      align: props.align,
      valign: props.valign
    }

    this.hideTooltip = this.hideTooltip.bind(this)
    this.showTooltip = this.showTooltip.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentDidUpdate() {
    const { active } = this.state

    active
      ? document.addEventListener('keydown', this.handleKeyDown)
      : document.removeEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  hideTooltip() {
    this.setState({ active: false })
  }

  showTooltip() {
    this.setState({ active: true })
  }

  handleKeyDown(e) {
    const keys = {
      27: this.hideTooltip
    }
    return keys[e.keyCode] && keys[e.keyCode]()
  }

  render() {
    const {
      children,
      className,
      enableHover,
      href,
      target,
      heading,
      text
    } = this.props
    const { active, align, valign } = this.state
    const hasContent = heading || text
    const triggerClassName = `${baseClassName}__trigger`
    const contentClassName = `${baseClassName}__content`

    return (
      <span
        className={classNames(
          styles[baseClassName],
          active && styles['is-active'],
          className
        )}
      >
        <TextButton
          href={href}
          target={target}
          className={classNames(
            styles[triggerClassName],
            hasContent && enableHover && styles[`${triggerClassName}--enabled`]
          )}
          aria-label="Open tooltip"
          {...enableHover && {
            onMouseOver: this.showTooltip,
            onMouseOut: this.hideTooltip,
            onTouchEnd: active ? this.hideTooltip : this.showTooltip
          }}
        >
          {children}
        </TextButton>
        {hasContent && (
          <span
            className={classNames(
              styles[contentClassName],
              styles[`${contentClassName}--${align}`],
              styles[`${contentClassName}--${valign}`],
              !active && visuallyHiddenClassName
            )}
            {...active && {
              tabIndex: 0,
              onBlur: this.hideTooltip
            }}
            ref={span => {
              this.content = span
            }}
          >
            {heading && (
              <span className={styles[`${baseClassName}__heading`]}>
                {heading}
              </span>
            )}
            {text && (
              <span className={styles[`${baseClassName}__text`]}>{text}</span>
            )}
          </span>
        )}
      </span>
    )
  }
}

Tooltip.defaultProps = {
  align: 'center',
  valign: 'top'
}

Tooltip.propTypes = {
  align: PropTypes.oneOf(['left', 'right', 'center']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  enableHover: PropTypes.bool,
  href: PropTypes.string,
  target: PropTypes.string,
  heading: PropTypes.string,
  text: PropTypes.node,
  valign: PropTypes.oneOf(['top', 'bottom', 'middle']),
  active: PropTypes.bool
}

export default Tooltip
