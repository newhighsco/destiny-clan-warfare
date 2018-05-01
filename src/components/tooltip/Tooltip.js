import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './Tooltip.styl'

const baseClassName = 'tooltip'

class Tooltip extends Component {
  constructor (props) {
    super(props)

    const { active } = this.props

    this.state = {
      active: active,
      align: props.align,
      valign: props.valign
    }

    this.hideTooltip = this.hideTooltip.bind(this)
    this.showTooltip = this.showTooltip.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentDidUpdate () {
    const { active } = this.state

    active
      ? document.addEventListener('keydown', this.handleKeyDown)
      : document.removeEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  hideTooltip () {
    this.content.style = {}
    this.setState({ active: false })
  }

  showTooltip () {
    this.setState({ active: true })
  }

  handleKeyDown (e) {
    const keys = {
      27: this.hideTooltip
    }
    return keys[e.keyCode] && keys[e.keyCode]()
  }

  render () {
    const { children, className, clickOutsideToClose, enableHover, heading, text } = this.props
    const { active, align, valign } = this.state
    const hasContent = heading || text
    const triggerClassName = `${baseClassName}__trigger`
    const contentClassName = `${baseClassName}__content`

    return (
      <span
        className={classNames(baseClassName, { 'is-active': active }, className)}>
        <button
          type="button"
          className={classNames('text-button', styles[triggerClassName], hasContent && styles[`${triggerClassName}--enabled`])}
          aria-label="Open tooltip"
          {...enableHover ? {
            onMouseOver: this.showTooltip,
            onMouseOut: this.hideTooltip,
            onTouchEnd: active ? this.hideTooltip : this.showTooltip
          } : {
            onClick: active ? this.hideTooltip : this.showTooltip
          }}
          >
          {children}
        </button>
        <span
          className={classNames(
            styles[contentClassName],
            styles[`${contentClassName}--${align}`],
            styles[`${contentClassName}--${valign}`],
            { 'is-vhidden': !active },
            { 'is-hidden': !hasContent }
          )}
          {...active && {
            tabIndex: 0,
            onBlur: this.hideTooltip
          }}
          ref={(span) => { this.content = span }}
          >
          {heading &&
            <span className={styles[`${baseClassName}__heading`]}>{heading}</span>
          }
          {text &&
            <span
              className={styles[`${baseClassName}__text`]}
              dangerouslySetInnerHTML={{ __html: text }}
            />
          }
        </span>
        {active && clickOutsideToClose && !enableHover &&
          <span
            className={styles[`${baseClassName}__backdrop`]}
            onClick={this.hideTooltip}
          />
        }
      </span>
    )
  }
}

Tooltip.defaultProps = {
  align: 'center',
  clickOutsideToClose: true,
  valign: 'top'
}

Tooltip.propTypes = {
  align: PropTypes.oneOf([ 'left', 'right', 'center' ]),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  clickOutsideToClose: PropTypes.bool,
  enableHover: PropTypes.bool,
  heading: PropTypes.string,
  text: PropTypes.string,
  valign: PropTypes.oneOf([ 'top', 'bottom' ]),
  active: PropTypes.bool
}

export default Tooltip
