import React, { Component, Fragment } from 'react'
import { Link } from 'react-static'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Lockup } from '../lockup/Lockup'
import { Button, ButtonGroup } from '../button/Button'
import Notification from '../notification/Notification'
import ClanTag from '../clan-tag/ClanTag'
import styles from './Enrollment.styl'

const constants = require('../../utils/constants')
const apiHelper = require('../../utils/api-helper')
const bungie = require('../../utils/bungie-helper')
const apiStatus = require('../../utils/api-status')
const action = apiHelper.url(0, 'Home/AddClan/')
const redirectUrl = `${process.env.SITE_URL}/thanks`
const proxy = apiHelper.proxy()

class Enrollment extends Component {
  constructor (props) {
    super(props)

    const status = apiStatus()

    this.state = {
      active: false,
      open: status.enrollmentOpen && constants.bungie.disabledStatusCode.indexOf(status.bungieStatus) === -1,
      name: '',
      groups: [],
      selectedGroup: null
    }

    this.handleEnroll = this.handleEnroll.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount () {
    if (this.refs.form) {
      const { active } = this.state

      if (!active) this.setState({ active: true })

      proxy(`Clan/AcceptingNewClans`)
        .then(({ data }) => {
          localStorage.setItem('enrollmentOpen', data)
          this.setState({ open: data })
        })
        .catch(err => console.log(err))
    }
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
                groups.unshift(detail)
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
    const id = constants.prefix.enroll
    const baseClassName = 'enrollment'
    const kicker = open ? 'Enroll your clan today' : 'Enrollment closed'
    const placeholder = active ? 'Enter clan name or ID' : 'Enter Bungie.net group ID'
    const name = active ? 'clanName' : 'clanId'

    return (
      <form ref="form" id={id} className={styles[baseClassName]} action={action} method="post" onSubmit={this.handleEnroll}>
        <input type="hidden" name="redirectUrl" value={redirectUrl} />
        {selectedGroup &&
          <input type="hidden" name="clanId" value={selectedGroup} />
        }
        <label htmlFor="control--clan">
          <Lockup borderless center kicker={kicker} />
        </label>
        <div className="field" id="field--clan">
          <div className={classNames('field__answer', styles[`${baseClassName}__field`])}>
            {open ? (
              <input type="search" className="control control--text" name={name} id="control--clan" placeholder={placeholder} onChange={this.handleSearch} required autoComplete="off" />
            ) : (
              <Notification><a href={constants.social.twitter} target="_blank" rel="noopener noreferrer">Follow us on Twitter</a>, or <a href={constants.social.discord} target="_blank" rel="noopener noreferrer">join our Discord server</a> to find out first when it reopens.</Notification>
            )}
          </div>
        </div>
        <ButtonGroup className={!open || active ? 'is-vhidden' : null}>
          <Button solid type="submit">Enroll clan</Button>
        </ButtonGroup>
        {groups.length > 0 &&
          <ul className={classNames('list--unstyled', styles[`${baseClassName}__clans`])}>
            {groups.map((group, i) => {
              const clan = clans.find(clan => clan.id === group.groupId)
              const Group = () => <Fragment>{group.name} <ClanTag>{group.clanInfo.clanCallsign}</ClanTag></Fragment>

              return (
                <li key={i}>
                  {clan ? (
                    <Link to={clan.path} className={styles[`${baseClassName}__clan`]}>
                      <Group />
                    </Link>
                  ) : (
                    <button onClick={this.handleEnroll} data-id={group.groupId} className={classNames('text-button', styles[`${baseClassName}__clan`])}>
                      <Group />
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
