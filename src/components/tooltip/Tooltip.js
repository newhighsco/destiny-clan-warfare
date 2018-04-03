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
    const { isActive } = this.state

    isActive
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
    const { children, className, clickOutsideToClose, enableHover, heading, text } = this.props
    const { isActive, align, valign } = this.state
    const TooltipClassNames = classNames(
      'tooltip',
      { 'is-active': isActive },
      className
    )
    const hasContent = heading || text

    return (
      <span
        className={TooltipClassNames}
        >
        <button
          type="button"
          className={classNames('text-button tooltip__trigger', hasContent && 'tooltip__trigger--enabled')}
          aria-label="Open tooltip"
          {...enableHover ? {
            onMouseOver: this.showTooltip,
            onMouseOut: this.hideTooltip,
            onTouchEnd: isActive ? this.hideTooltip : this.showTooltip
          } : {
            onClick: isActive ? this.hideTooltip : this.showTooltip
          }}
          >
          {children}
        </button>
        <span
          className={classNames(
            'tooltip__content',
            `tooltip__content--${align}`,
            `tooltip__content--${valign}`,
            { 'is-vhidden': !isActive },
            { 'is-hidden': !hasContent }
          )}
          {...isActive && {
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
        {isActive && clickOutsideToClose && !enableHover &&
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
  heading: PropTypes.string,
  text: PropTypes.string,
  valign: PropTypes.oneOf([ 'top', 'bottom' ])
}

export default Tooltip
