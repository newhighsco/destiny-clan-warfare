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

    var { activeIndex } = this.props
    const { children } = this.props
    const visibleChildren = []

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
      activeIndex
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
  }

  componentDidMount () {
    const { active } = this.state

    if (!active) this.setState({ active: true })
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.activeIndex !== this.props.activeIndex) {
      this.handleToggle(this.props.activeIndex)
      return
    }

    if (prevState.activeIndex !== this.state.activeIndex) {
      this.handleToggle(this.state.activeIndex)
      return
    }

    if (this.props.activeIndex !== this.state.activeIndex) {
      this.handleToggle(this.props.activeIndex)
    }
  }

  handleClick (e) {
    if (!e.currentTarget.href) {
      e.preventDefault()

      this.handleToggle(JSON.parse(e.currentTarget.dataset.index))
    }
  }

  handleToggle (index) {
    this.setState({ activeIndex: index })
  }

  render () {
    const { id, cutout, children } = this.props
    const { active, activeIndex } = this.state

    if (!children) return null

    return (
      <div id={id} className={classNames(styles[containerClassName], cutout && styles[`${containerClassName}--cutout`], active && 'is-active')}>
        {React.Children.map(children, (child, i) => {
          if (!child) return null

          const { id, href, state, prefetch, title, name } = child.props
          const isActive = i === activeIndex

          return (
            <Fragment key={i}>
              <div id={id} className={styles[navigationClassName]}>
                <Button onClick={this.handleClick} href={href} className={classNames(styles[buttonClassName], isActive && 'is-active')} state={state} prefetch={prefetch} data-index={i} size="small" data-exact={title}>{name}</Button>
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

TabContainer.defaultProps = {
  activeIndex: 0
}

TabContainer.propTypes = {
  id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  children: PropTypes.node,
  activeIndex: PropTypes.number,
  cutout: PropTypes.bool
}

export {
  Tab,
  TabContainer
}
