import React, { Component } from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Lockup } from '../lockup/Lockup'
import { Button, ButtonGroup } from '../button/Button'

import './Enrollment.styl'

const axios = require(`axios`)
const constants = require('../../utils/constants')
const action = `${constants.server.baseUrl}Home/AddClan/`
const redirectUrl = `${process.env.SITE_URL}/thanks`
const bungie = axios.create({
  baseURL: constants.bungie.apiUrl,
  headers: {
    'X-API-Key': process.env.BUNGIE_API_KEY
  }
})

class Enrollment extends Component {
  constructor (props) {
    super(props)

    this.state = {
      active: false,
      name: '',
      groups: [],
      selectedGroup: null
    }

    this.handleEnroll = this.handleEnroll.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount () {
    this.setState({ active: true })
  }

  handleEnroll (e) {
    e.preventDefault()

    const id = e.target.dataset.id

    if (id) {
      this.setState({ selectedGroup: id }, () => {
        this.refs.form.submit()
      })
    }
  }

  handleSearch (e) {
    e.preventDefault()

    const { active, groups } = this.state

    if (active) {
      const name = e.target.value.trim()

      if (name.length === 0) {
        this.setState({
          groups: [],
          selectedGroup: null
        })
      } else if (name !== this.state.name) {
        bungie(`GroupV2/Name/${name}/1/`)
        .then(({ data }) => {
          if (data.Response && data.Response.detail) {
            const detail = data.Response.detail
            const group = groups.find(({ groupId }) => groupId === detail.groupId)

            if (!group) {
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
    const { active, groups, selectedGroup } = this.state
    const baseClassName = 'enrollment'
    const placeholder = active ? 'Enter clan name' : 'Enter Bungie.net group ID'
    const name = active ? 'clanName' : 'clanId'

    return (
      <form ref="form" id="enroll" className={baseClassName} action={action} method="post" onSubmit={this.handleEnroll}>
        <input type="hidden" name="redirectUrl" value={redirectUrl} />
        {selectedGroup &&
          <input type="hidden" name="clanId" value={selectedGroup} />
        }
        <label htmlFor="control--clan">
          <Lockup borderless center kicker="Enroll your clan today" />
        </label>
        <div className="field" id="field--clan">
          <div className={classNames('field__answer', `${baseClassName}__field`)}>
            <input type="search" className="control control--text" name={name} id="control--clan" placeholder={placeholder} onChange={this.handleSearch} required autoComplete="off" />
          </div>
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
        </div>
        <ButtonGroup>
          {active ? (
            <br />
          ) : (
            <Button solid type="submit">Enroll clan</Button>
          )}
        </ButtonGroup>
      </form>
    )
  }
}

Enrollment.propTypes = {
  clans: PropTypes.array.isRequired
}

export default Enrollment
