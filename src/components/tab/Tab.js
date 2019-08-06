import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withApp } from '../../contexts/App'
import { Button } from '../button/Button'
import styles from './Tab.styl'

const constants = require('../../utils/constants')
const baseClassName = 'tab'
const containerClassName = `${baseClassName}-container`
const navigationClassName = `${baseClassName}-navigation`
const contentClassName = `${baseClassName}-content`
const buttonClassName = `${baseClassName}-button`

const Tab = class extends PureComponent {
  render() {
    const { children } = this.props

    return children || null
  }
}

Tab.propTypes = {
  children: PropTypes.node
}

const TabContainer = class extends PureComponent {
  constructor(props) {
    super(props)

    var { activeIndex } = this.props
    const { children } = this.props
    const visibleChildren = []

    React.Children.map(children, child => {
      if (child) visibleChildren.push(child)
    })

    if (typeof location !== 'undefined') {
      const id = location.hash.replace(constants.prefix.hash, '')

      if (id && id.length) {
        activeIndex = Math.max(
          visibleChildren.findIndex(child => child.props.id === id),
          0
        )
      }
    }

    this.state = {
      activeIndex
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
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

  handleClick(e) {
    if (!e.currentTarget.href) {
      e.preventDefault()

      this.handleToggle(JSON.parse(e.currentTarget.dataset.index))
    }
  }

  handleToggle(index) {
    this.setState({ activeIndex: index })
  }

  render() {
    const { isEnhanced, id, cutout, children } = this.props
    const { activeIndex } = this.state

    if (!children) return null

    return (
      <div
        id={id}
        className={classNames(
          styles[containerClassName],
          cutout && styles[`${containerClassName}--cutout`],
          isEnhanced && styles['is-enhanced']
        )}
      >
        {React.Children.map(children, (child, i) => {
          if (!child) return null

          const { id, href, state, title, name } = child.props
          const active = i === activeIndex

          return (
            <Fragment key={i}>
              <div id={id} className={styles[navigationClassName]}>
                <Button
                  onClick={this.handleClick}
                  href={href}
                  className={classNames(
                    styles[buttonClassName],
                    active && styles['is-active']
                  )}
                  state={state}
                  data-index={i}
                  size="small"
                  data-exact={title}
                >
                  {name}
                </Button>
              </div>
              <div
                className={classNames(
                  styles[contentClassName],
                  active && styles['is-active']
                )}
              >
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
  isEnhanced: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node,
  activeIndex: PropTypes.number,
  cutout: PropTypes.bool
}

const ProgressivelyEnhancedTabContainer = withApp(TabContainer)

export { Tab, ProgressivelyEnhancedTabContainer as TabContainer }
