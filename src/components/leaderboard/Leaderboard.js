import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import classNames from 'classnames'
import Avatar from '../avatar/Avatar'

const sentenceCase = require('sentence-case')

const Leaderboard = ({ data, columns, className }) => {
  if (!data) return (null)

  let keys = columns || Object.keys(data[0].node)
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

  return (
    <div className={classNames('leaderboard', className)}>
      <table className="leaderboard__container">
        <thead>
          <tr>
            {showIcons && keys.length > 0 &&
              <th className="is-hidden-mobile" />
            }

            {showNames && keys.length > 0 &&
              <th className="leaderboard__heading" colSpan={showClanTag && 2}>Name</th>
            }

            {keys.map((key, i) => (
              <th key={i} className="leaderboard__heading text-center">{sentenceCase(key)}</th>
            ))}
          </tr>
        </thead>
        <tbody className="leaderboard__body">
          {data.map(({ node }) => (
            <tr key={node.id} className="leaderboard__row">
              {showIcons &&
                <td className="leaderboard__column leaderboard__avatar is-hidden-mobile">
                  {node.icon &&
                    <Avatar src={node.icon} style={node.color && { backgroundColor: node.color }} />
                  }
                </td>
              }

              {showNames && [
                <td className="leaderboard__column leaderboard__name">
                  <Link to={node.path}>
                    {node.name}
                  </Link>
                </td>,
                showClanTag && node.clan &&
                  <td className="leaderboard__column leaderboard__tag text-right" aria-hidden="true">
                    <Link to={`/clans/${node.clanId}`}>
                      [{node.clan.tag}]
                    </Link>
                  </td>
              ]}

              {keys.map((key, i) => (
                <td key={i} className="leaderboard__column text-center">{node[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

Leaderboard.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array,
  className: PropTypes.string
}

export default Leaderboard
