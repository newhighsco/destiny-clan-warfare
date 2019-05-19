import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Lockup } from '../lockup/Lockup'
import List from '../list/List'
import SmartLink from '../smart-link/SmartLink'
import { Button, ButtonGroup } from '../button/Button'
import TextControl from '../text-control/TextControl'
import Notification from '../notification/Notification'
import ClanTag from '../clan-tag/ClanTag'
import TextButton from '../text-button/TextButton'
import { visuallyHiddenClassName } from '../visually-hidden/VisuallyHidden'
import styles from './Enrollment.styl'

const axios = require('axios')
const constants = require('../../utils/constants')
const apiHelper = require('../../utils/api-helper')
const bungieHelper = require('../../utils/bungie-helper')
const urlBuilder = require('../../utils/url-builder')

const baseClassName = 'enrollment'
const action = apiHelper.url(0, 'Home/AddClan/')
const redirectUrl = `${process.env.SITE_URL}/thanks`
const proxy = apiHelper.proxy()
const bungieApi = bungieHelper.api()

const Enrollment = class extends Component {
  constructor(props) {
    super(props)

    const { apiStatus } = this.props

    this.state = {
      active: false,
      open:
        apiStatus &&
        apiStatus.enrollmentOpen &&
        !bungieHelper.disabled(apiStatus.bungieStatus),
      name: '',
      groups: [],
      selectedGroup: null,
      source: axios.CancelToken.source()
    }

    this.handleEnroll = this.handleEnroll.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  async componentDidMount() {
    if (this.refs.form) {
      var { active, source } = this.state

      if (!active) this.setState({ active: true })

      await proxy(`Clan/AcceptingNewClans`, {
        cancelToken: source.token
      })
        .then(({ data }) => {
          const apiDisabled = JSON.parse(localStorage.getItem('apiDisabled'))
          active = data && !apiDisabled

          localStorage.setItem('enrollmentOpen', active)
          this.setState({ open: active })
        })
        .catch(() => {})
    }
  }

  componentWillUnmount() {
    var { source } = this.state

    source.cancel()
  }

  handleEnroll(e) {
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

  handleSearch(e) {
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
        const endpoint = isNumeric
          ? `GroupV2/${name}/`
          : `GroupV2/Name/${name}/${groupType}/`

        bungieApi(endpoint).then(({ data }) => {
          if (data.Response && data.Response.detail) {
            const detail = data.Response.detail
            const group = groups.find(
              ({ groupId }) => groupId === detail.groupId
            )

            if (!group && detail.groupType === groupType) {
              groups.unshift(detail)
            }

            this.setState({ groups: groups })
          }
        })

        this.setState({ name: name })
      }
    }
  }

  render() {
    const { ids } = this.props
    const { active, open, groups, selectedGroup } = this.state
    const id = constants.prefix.enroll
    const kicker = open ? 'Enroll your clan today' : 'Enrollment closed'
    const placeholder = active
      ? 'Enter clan name or ID'
      : 'Enter Bungie.net group ID'
    const name = active ? 'clanName' : 'clanId'

    return (
      <form
        ref="form"
        id={id}
        className={styles[baseClassName]}
        action={action}
        method="post"
        onSubmit={this.handleEnroll}
      >
        <input type="hidden" name="redirectUrl" value={redirectUrl} />
        {selectedGroup && (
          <input type="hidden" name="clanId" value={selectedGroup} />
        )}
        <label htmlFor="control--clan">
          <Lockup borderless center kicker={kicker} />
        </label>
        <div className={classNames(styles[`${baseClassName}__field`])}>
          {open ? (
            <TextControl
              type="search"
              name={name}
              id="control--clan"
              placeholder={placeholder}
              onChange={this.handleSearch}
              required
              autoComplete="off"
            />
          ) : (
            <Notification>
              <SmartLink href={constants.social.twitter} target="_blank">
                Follow us on Twitter
              </SmartLink>{' '}
              to find out first when it reopens.
            </Notification>
          )}
        </div>
        <ButtonGroup
          className={!open || active ? visuallyHiddenClassName : null}
        >
          <Button solid type="submit">
            Enroll clan
          </Button>
        </ButtonGroup>
        {groups.length > 0 && (
          <List unstyled className={styles[`${baseClassName}__clans`]}>
            {groups.map(({ groupId, name, clanInfo }, i) => {
              const existing = ids.indexOf(groupId) !== -1
              const Group = () => (
                <Fragment>
                  {name}{' '}
                  <ClanTag className={styles[`${baseClassName}__clan-tag`]}>
                    {clanInfo.clanCallsign}
                  </ClanTag>
                </Fragment>
              )

              return (
                <li key={i}>
                  {existing ? (
                    <TextButton
                      href={urlBuilder.clanUrl(groupId)}
                      className={styles[`${baseClassName}__clan`]}
                    >
                      <Group />
                    </TextButton>
                  ) : (
                    <TextButton
                      onClick={this.handleEnroll}
                      data-id={groupId}
                      className={styles[`${baseClassName}__clan`]}
                    >
                      <Group />
                    </TextButton>
                  )}
                </li>
              )
            })}
          </List>
        )}
        {(!open || active) && <br />}
      </form>
    )
  }
}

Enrollment.propTypes = {
  apiStatus: PropTypes.object,
  ids: PropTypes.array
}

export default Enrollment
