import React, { Component } from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Lockup } from '../lockup/Lockup'
import { Button, ButtonGroup } from '../button/Button'
import Notification from '../notification/Notification'

import './Enrollment.styl'

const constants = require('../../utils/constants')
const api = require('../../utils/api-helper').proxy
const bungie = require('../../utils/bungie-helper')
const apiStatus = require('../../utils/api-status')
const action = `${constants.server.baseUrl}Home/AddClan/`
const redirectUrl = `${process.env.GATSBY_SITE_URL}/thanks`

class Enrollment extends Component {
  constructor (props) {
    super(props)

    const status = apiStatus()

    this.state = {
      active: false,
      open: status.enrollmentOpen && status.bungieStatus !== constants.bungie.disabledStatusCode,
      name: '',
      groups: [],
      selectedGroup: null
    }

    this.handleEnroll = this.handleEnroll.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount () {
    this.setState({ active: true })

    api(`Clan/AcceptingNewClans`)
      .then(({ data }) => {
        localStorage.setItem('enrollmentOpen', data)
        this.setState({ open: data })
      })
      .catch(err => console.log(err))
  }

  handleEnroll (e) {
    const { active } = this.state

    if (active) {
      e.preventDefault()

      const id = e.target.dataset.id

      if (id) {
        this.setState({ selectedGroup: id }, () => {
          this.refs.form.submit()
        })
      }
    }
  }

  handleSearch (e) {
    const { active, groups } = this.state

    if (active) {
      e.preventDefault()

      const name = e.target.value.trim()

      if (name.length === 0) {
        this.setState({
          groups: [],
          selectedGroup: null
        })
      } else if (name !== this.state.name) {
        const groupType = 1
        const isNumeric = !isNaN(name)
        const endpoint = isNumeric ? `GroupV2/${name}/` : `GroupV2/Name/${name}/${groupType}/`

        bungie(endpoint)
          .then(({ data }) => {
            if (data.Response && data.Response.detail) {
              const detail = data.Response.detail
              const group = groups.find(({ groupId }) => groupId === detail.groupId)

              if (!group && detail.groupType === groupType) {
                groups.push(detail)
              }

              this.setState({ groups: groups })
            }
          })
          .catch(err => console.log(err))

        this.setState({ name: name })
      }
    }
  }

  render () {
    const { clans } = this.props
    const { active, open, groups, selectedGroup } = this.state
    const id = 'enroll'
    const baseClassName = 'enrollment'
    const placeholder = active ? 'Enter clan name or ID' : 'Enter Bungie.net group ID'
    const name = active ? 'clanName' : 'clanId'

    return (
      <form ref="form" id={id} className={baseClassName} action={action} method="post" onSubmit={this.handleEnroll}>
        <input type="hidden" name="redirectUrl" value={redirectUrl} />
        {selectedGroup &&
          <input type="hidden" name="clanId" value={selectedGroup} />
        }
        <label htmlFor="control--clan">
          <Lockup borderless center kicker="Enroll your clan today" />
        </label>
        <div className="field" id="field--clan">
          <div className={classNames('field__answer', `${baseClassName}__field`)}>
            {open ? (
              <input type="search" className="control control--text" name={name} id="control--clan" placeholder={placeholder} onChange={this.handleSearch} required autoComplete="off" />
            ) : (
              <Notification>Enrollment for new clans is currently closed.</Notification>
            )}
          </div>
        </div>
        <ButtonGroup className={!open || active ? 'is-vhidden' : null}>
          <Button solid type="submit">Enroll clan</Button>
        </ButtonGroup>
        {groups.length > 0 &&
          <ul className={classNames('list--unstyled', `${baseClassName}__clans`)}>
            {groups.map((group, i) => {
              const clan = clans.find(clan => clan.id === group.groupId)

              return (
                <li key={i}>
                  {clan ? (
                    <Link to={clan.path} className={`${baseClassName}__clan`}>
                      {group.name}
                    </Link>
                  ) : (
                    <button onClick={this.handleEnroll} data-id={group.groupId} className={classNames('text-button', `${baseClassName}__clan`)}>
                      {group.name}
                    </button>
                  )}
                </li>
              )
            })}
          </ul>
        }
        {(!open || active) &&
          <br />
        }
      </form>
    )
  }
}

Enrollment.propTypes = {
  clans: PropTypes.array
}

export default Enrollment
