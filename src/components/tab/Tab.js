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
      activeIndex: 0
    }

    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle (e) {
    e.preventDefault()

    this.setState({
      activeIndex: JSON.parse(e.target.dataset.index)
    })
  }

  render () {
    const { children, cutout } = this.props
    const { activeIndex } = this.state
    const baseClassName = 'tab-container'

    if (!children) return null

    return (
      <div className={classNames(baseClassName, cutout && `${baseClassName}--cutout`)}>
        <ul className="list--inline tab-navigation">
          {React.Children.map(children, (child, i) => (
            <li className="tab-navigation__item">
              <Button onClick={this.handleToggle} className={classNames('tab-button', activeIndex === i && 'is-active')} data-index={i} size="small">{child.props.name}</Button>
            </li>
          ))}
        </ul>
        {React.Children.map(children, (child, i) => {
          if (activeIndex === i) return child
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
