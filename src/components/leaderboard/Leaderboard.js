import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import classNames from 'classnames'
import Avatar from '../avatar/Avatar'

const sentenceCase = require('sentence-case')

class Leaderboard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      sortBy: this.props.sortBy,
      descending: this.props.descending
    }

    this.handleSort = this.handleSort.bind(this)
  }

  handleSort (e) {
    e.preventDefault()

    this.setState({
      sortBy: e.target.dataset.sortby,
      descending: e.target.dataset.descending ? !JSON.parse(e.target.dataset.descending) : true
    })
  }

  render () {
    const { data, columns, className } = this.props
    const { sortBy, descending } = this.state

    if (!data) return (null)

    let keys = columns || Object.keys(data[0])
    const showIcons = keys.indexOf('icon') !== -1 && navigator.onLine
    const showClanTag = keys.indexOf('clan') !== -1
    const showNames = keys.indexOf('name') !== -1
    const blackListedKeys = [ 'icon', 'name', 'clan', 'path' ]

    keys = keys.reduce((filtered, key) => {
      if (blackListedKeys.indexOf(key) === -1) {
        filtered.push(key)
      }

      return filtered
    }, [])

    if (sortBy) {
      const direction = descending ? -1 : 1

      data.sort((a, b) => {
        var x = a[sortBy]; var y = b[sortBy]
        return ((x < y) ? (-1 * direction) : ((x > y) ? (1 * direction) : 0))
      })
    }

    return (
      <div className={classNames('leaderboard', className)}>
        {data.map((item, i) => (
          <div key={i} className="leaderboard__row">
            <div className="leaderboard__header">
              {showIcons &&
                <Avatar className="leaderboard__icon" color={item.color} icon={item.icon} foreground={item.foreground} background={item.background} />
              }
              {showNames &&
                <Link to={item.path} className="leaderboard__name">
                  {item.name}
                </Link>
              }
              {showClanTag && item.clan &&
                <Link to={`/clans/${item.clanId}`} className="leaderboard__tag">
                  {item.clan.tag}
                </Link>
              }
            </div>
            {keys.length > 0 &&
              <div className="leaderboard__body">
                <div className="leaderboard__stats">
                  {keys.map((key, i) => (
                    <div key={i} className="leaderboard__stat" data-label={sentenceCase(key)}>{item[key]}</div>
                  ))}
                </div>
              </div>
            }
          </div>
        ))}
      </div>
    )
  }
}

Leaderboard.defaultProps = {
  descending: false
}

Leaderboard.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array,
  sortBy: PropTypes.string,
  descending: PropTypes.bool,
  className: PropTypes.string
}

export default Leaderboard
