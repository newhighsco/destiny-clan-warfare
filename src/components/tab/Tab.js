import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Button } from '../button/Button'
import styles from './Tab.styl'

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

    this.state = {
      active: false,
      activeIndex: 0
    }

    this.handleToggle = this.handleToggle.bind(this)
  }

  componentDidMount () {
    const { active } = this.state

    if (!active) this.setState({ active: true })
  }

  handleToggle (e) {
    e.preventDefault()

    this.setState({ activeIndex: JSON.parse(e.target.dataset.index) })
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
                  <Button onClick={this.handleToggle} className={classNames(styles[buttonClassName], activeIndex === i && 'is-active')} data-index={i} size="small">{child.props.name}</Button>
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
