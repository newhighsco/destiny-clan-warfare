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
    const showIcons = keys.indexOf('icon') !== -1
    const showClanTag = keys.indexOf('clan') !== -1
    const showNames = keys.indexOf('name') !== -1
    const blackListedKeys = [ 'icon', 'name', 'clan' ]

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
        <table className="leaderboard__container">
          <thead>
            <tr>
              {showIcons && keys.length > 0 &&
                <th className="is-hidden-mobile" />
              }

              {showNames && keys.length > 0 &&
                <th className="leaderboard__heading" colSpan={showClanTag && 2} data-sortby="name" data-descending={sortBy === 'name' ? descending : null} onClick={this.handleSort}>Name</th>
              }

              {keys.map((key, i) => (
                <th key={i} className="leaderboard__heading text-center" data-sortby={key} data-descending={sortBy === key ? descending : null} onClick={this.handleSort}>{sentenceCase(key)}</th>
              ))}
            </tr>
          </thead>
          <tbody className="leaderboard__body">
            {data.map((item, i) => (
              <tr key={i} className="leaderboard__row">
                {showIcons &&
                  <td className="leaderboard__column leaderboard__avatar is-hidden-mobile">
                    <Avatar color={item.color} icon={item.icon} foreground={item.foreground} background={item.background} />
                  </td>
                }

                {showNames && [
                  <td key="name" className="leaderboard__column leaderboard__name">
                    <Link to={item.path}>
                      {item.name}
                    </Link>
                  </td>,
                  showClanTag && item.clan &&
                    <td key="tag" className="leaderboard__column leaderboard__tag text-right" aria-hidden="true">
                      <Link to={`/clans/${item.clanId}`}>
                        [{item.clan.tag}]
                      </Link>
                    </td>
                ]}

                {keys.map((key, i) => (
                  <td key={i} className="leaderboard__column text-center">{item[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
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
