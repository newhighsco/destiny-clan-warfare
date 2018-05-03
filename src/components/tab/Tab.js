import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Button } from '../button/Button'
import styles from './Tab.styl'

const constants = require('../../utils/constants')
const baseClassName = 'tab'

const Tab = ({ children, name, id }) => {
  return (
    <div className={styles[baseClassName]}>
      {children}
    </div>
  )
}

Tab.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ])
}

class TabContainer extends Component {
  constructor (props) {
    super(props)

    const { children } = this.props
    var activeIndex = 0

    if (typeof location !== 'undefined') {
      const id = location.hash.replace(constants.prefix.hash, '')

      if (id && id.length) {
        const childArray = React.Children.toArray(children)
        const found = childArray.find(child => child.props.id === id)

        if (found) activeIndex = childArray.indexOf(found)
      }
    }

    this.state = {
      active: false,
      activeIndex: activeIndex
    }

    this.handleToggle = this.handleToggle.bind(this)
  }

  componentDidMount () {
    const { active } = this.state

    if (!active) this.setState({ active: true })
  }

  handleToggle (e) {
    if (!e.target.href) {
      e.preventDefault()

      this.setState({ activeIndex: JSON.parse(e.target.dataset.index) })
    }
  }

  render () {
    const { id, children, cutout } = this.props
    const { active, activeIndex } = this.state
    const containerClassName = `${baseClassName}-container`
    const navigationClassName = `${baseClassName}-navigation`
    const navigationItemClassName = `${baseClassName}-navigation__item`
    const buttonClassName = `${baseClassName}-button`
    var visibleChildren = []

    React.Children.map(children, (child) => {
      if (child) visibleChildren.push(child)
    })

    if (!visibleChildren.length) return null

    return (
      <div id={id} className={classNames(styles[containerClassName], cutout && styles[`${containerClassName}--cutout`])}>
        {active &&
          <ul className={classNames('list--inline', styles[navigationClassName])}>
            {visibleChildren.map((child, i) => {
              return (
                <li key={i} id={child.props.id} className={styles[navigationItemClassName]}>
                  <Button onClick={this.handleToggle} href={child.props.href} state={child.props.state} prefetch={child.props.prefetch} className={classNames(styles[buttonClassName], activeIndex === i && 'is-active')} data-index={i} size="small">{child.props.name}</Button>
                </li>
              )
            })}
          </ul>
        }
        {visibleChildren.map((child, i) => {
          if (activeIndex === i || !active) {
            return [
              !active &&
                <div key={i} className={classNames(styles[navigationClassName], styles[`${navigationClassName}--heading`])}>
                  <div className={styles[navigationItemClassName]}>
                    <Button className={classNames(styles[buttonClassName], 'is-active')} size="small">{child.props.name}</Button>
                  </div>
                </div>,
              child
            ]
          }

          return null
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
