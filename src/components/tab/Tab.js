import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Button from '../button/Button'

import './Tab.styl'

const Tab = ({ children, name }) => {
  return (
    <div className="tab">
      {children}
    </div>
  )
}

Tab.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired
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
    this.setState({ active: true })
  }

  handleToggle (e) {
    e.preventDefault()

    this.setState({ activeIndex: JSON.parse(e.target.dataset.index) })
  }

  render () {
    const { children, cutout } = this.props
    const { active, activeIndex } = this.state
    const baseClassName = 'tab-container'
    var visibleChildren = []

    React.Children.map(children, (child) => {
      if (child) visibleChildren.push(child)
    })

    if (!visibleChildren.length) return null

    return (
      <div className={classNames(baseClassName, cutout && `${baseClassName}--cutout`)}>
        {active &&
          <ul className="list--inline tab-navigation">
            {visibleChildren.map((child, i) => {
              return (
                <li key={i} className="tab-navigation__item">
                  <Button onClick={this.handleToggle} className={classNames('tab-button', activeIndex === i && 'is-active')} data-index={i} size="small">{child.props.name}</Button>
                </li>
              )
            })}
          </ul>
        }
        {visibleChildren.map((child, i) => {
          if (activeIndex === i || !active) {
            return [
              !active &&
                <div key={i} className="tab-navigation tab-navigation--heading">
                  <div className="tab-navigation__item">
                    <Button className="tab-button is-active" size="small">{child.props.name}</Button>
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
  children: PropTypes.node,
  cutout: PropTypes.bool
}

const components = {
  Tab,
  TabContainer
}

export default components
