import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './TextControl.styl'

const baseClassName = 'text-control'

const TextControl = class extends PureComponent {
  render() {
    const {
      className,
      multiLine,
      required,
      rows,
      state,
      type,
      ...rest
    } = this.props
    const Element = multiLine ? 'textarea' : 'input'

    return (
      <Element
        aria-invalid={state === 'error' || undefined}
        aria-required={required}
        className={classNames(
          styles[baseClassName],
          multiLine && styles[`${baseClassName}--multi-line`],
          state && styles[`${baseClassName}--${state}`],
          className
        )}
        required={required}
        rows={multiLine && rows}
        type={!multiLine ? type : undefined}
        {...rest}
      />
    )
  }
}

TextControl.defaultProps = {
  type: 'text',
  rows: 3
}

TextControl.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  multiLine: PropTypes.bool,
  state: PropTypes.oneOf(['warning', 'error', 'success', 'notice']),
  rows: PropTypes.number
}

export default TextControl
