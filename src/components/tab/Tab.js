import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Button } from '../button/Button'
import styles from './Tab.styl'

const constants = require('../../utils/constants')
const baseClassName = 'tab'
const containerClassName = `${baseClassName}-container`
const navigationClassName = `${baseClassName}-navigation`
const contentClassName = `${baseClassName}-content`
const buttonClassName = `${baseClassName}-button`

class Tab extends PureComponent {
  render () {
    const { children } = this.props

    return children || null
  }
}

Tab.propTypes = {
  children: PropTypes.node
}

class TabContainer extends PureComponent {
  constructor (props) {
    super(props)

    const { children } = this.props
    const visibleChildren = []
    var activeIndex = 0

    React.Children.map(children, (child) => {
      if (child) visibleChildren.push(child)
    })

    if (typeof location !== 'undefined') {
      const id = location.hash.replace(constants.prefix.hash, '')

      if (id && id.length) {
        activeIndex = Math.max(visibleChildren.findIndex(child => child.props.id === id), 0)
      }
    }

    this.state = {
      active: false,
      activeIndex: activeIndex,
      children: visibleChildren
    }

    this.handleToggle = this.handleToggle.bind(this)
  }

  componentDidMount () {
    const { active } = this.state

    if (!active) this.setState({ active: true })
  }

  handleToggle (e) {
    if (!e.currentTarget.href) {
      e.preventDefault()

      this.setState({ activeIndex: JSON.parse(e.currentTarget.dataset.index) })
    }
  }

  render () {
    const { id, cutout } = this.props
    const { children, active, activeIndex } = this.state

    if (!children.length) return null

    return (
      <div id={id} className={classNames(styles[containerClassName], cutout && styles[`${containerClassName}--cutout`], active && 'is-active')}>
        {children.map((child, i) => {
          const { id, href, state, prefetch, title, name } = child.props
          const isActive = i === activeIndex

          return (
            <Fragment key={i}>
              <div id={id} className={styles[navigationClassName]}>
                <Button onClick={this.handleToggle} href={href} className={classNames(styles[buttonClassName], isActive && 'is-active')} state={state} prefetch={prefetch} data-index={i} size="small" data-exact={title}>{name}</Button>
              </div>
              <div className={classNames(styles[contentClassName], isActive && 'is-active')}>
                {child}
              </div>
            </Fragment>
          )
        })}
      </div>
    )
  }
}

TabContainer.propTypes = {
  id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  children: PropTypes.node,
  cutout: PropTypes.bool
}

export {
  Tab,
  TabContainer
}
