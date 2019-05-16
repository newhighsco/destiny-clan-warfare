import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './Grid.styl'

const Grid = class extends PureComponent {
  render() {
    const {
      children,
      gutterless,
      gutter,
      reverse,
      middled,
      bottomed,
      flex,
      stacked,
      className
    } = this.props

    if (!children) return null

    return (
      <div
        className={classNames(
          'grid',
          gutterless && 'grid--gutterless',
          gutter && `grid--gutter-${gutter}`,
          reverse && `grid--reverse`,
          middled && 'grid--middled',
          bottomed && 'grid--bottomed',
          flex && 'grid--flex',
          stacked && 'grid--stacked',
          className
        )}
      >
        {children}
      </div>
    )
  }
}

Grid.propTypes = {
  children: PropTypes.node,
  gutterless: PropTypes.bool,
  gutter: PropTypes.string,
  reverse: PropTypes.bool,
  middled: PropTypes.bool,
  bottomed: PropTypes.bool,
  flex: PropTypes.bool,
  stacked: PropTypes.bool,
  className: PropTypes.string
}

const GridItem = class extends PureComponent {
  render() {
    const { children, sizes, className } = this.props

    if (!children) return null

    return (
      <div
        className={classNames(
          'grid__item',
          sizes && sizes.map(size => size),
          className
        )}
      >
        {children}
      </div>
    )
  }
}

GridItem.propTypes = {
  children: PropTypes.node,
  sizes: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string
}

export { Grid, GridItem }
