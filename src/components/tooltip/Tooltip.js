import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './Tooltip.styl'

class Tooltip extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isActive: false,
      align: props.align,
      valign: props.valign
    }

    this.hideTooltip = this.hideTooltip.bind(this)
    this.showTooltip = this.showTooltip.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentDidUpdate () {
    this.state.isActive
      ? document.addEventListener('keydown', this.handleKeyDown)
      : document.removeEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  hideTooltip () {
    this.content.style = {}
    this.setState({ isActive: false })
  }

  showTooltip () {
    this.setState({ isActive: true })
  }

  handleKeyDown (e) {
    const keys = {
      27: this.hideTooltip
    }
    return keys[e.keyCode] && keys[e.keyCode]()
  }

  render () {
    const { children, className, clickOutsideToClose, enableHover, modifiers, heading, text } = this.props
    const TooltipClassNames = classNames(
      'tooltip',
      { 'is-active': this.state.isActive },
      modifiers && modifiers.map(modifierClass => `tooltip--${modifierClass}`),
      className
    )
    return (
      <span
        className={TooltipClassNames}
        >
        <button
          type="button"
          className="text-button tooltip__trigger"
          aria-label="Open tooltip"
          {...enableHover ? {
            onMouseOver: this.showTooltip,
            onMouseOut: this.hideTooltip,
            onTouchEnd: this.state.isActive ? this.hideTooltip : this.showTooltip
          } : {
            onClick: this.state.isActive ? this.hideTooltip : this.showTooltip
          }}
          >
          {children}
        </button>
        <span
          className={classNames(
            'tooltip__content',
            `tooltip__content--${this.state.align}`,
            `tooltip__content--${this.state.valign}`,
            { 'is-vhidden': !this.state.isActive }
          )}
          {...this.state.isActive && {
            tabIndex: 0,
            onBlur: this.hideTooltip
          }}
          ref={(span) => { this.content = span }}
          >
          {heading &&
            <span className="tooltip__heading">{heading}</span>
          }
          {text &&
            <span
              className="tooltip__text"
              dangerouslySetInnerHTML={{ __html: text }}
            />
          }
        </span>
        {this.state.isActive && clickOutsideToClose && !enableHover &&
          <span
            className="tooltip__backdrop"
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
  modifiers: PropTypes.arrayOf(PropTypes.string),
  heading: PropTypes.string,
  text: PropTypes.string.isRequired,
  valign: PropTypes.oneOf([ 'top', 'bottom' ])
}

export default Tooltip
