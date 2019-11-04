import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withApp } from '../../contexts/App'
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
const decode = require('../../utils/html-entities').decode

const baseClassName = 'enrollment'
const action = apiHelper.url(0, 'Home/AddClan/')
const redirectUrl = `${process.env.SITE_URL}/thanks`
const bungieApi = bungieHelper.api()

const Enrollment = class extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      groups: [],
      selectedGroup: null,
      source: axios.CancelToken.source()
    }

    this.handleEnroll = this.handleEnroll.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleEnroll(e) {
    const { isEnhanced } = this.props

    if (isEnhanced) {
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
    const { isEnhanced } = this.props
    const { groups } = this.state

    if (isEnhanced) {
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
        const endpoint = {
          method: isNumeric ? 'get' : 'post',
          url: isNumeric ? `GroupV2/${name}/` : 'GroupV2/NameV2/',
          data: isNumeric ? null : { groupName: name, groupType: 1 }
        }

        bungieApi(endpoint)
          .then(({ data }) => {
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
          .catch(() => {})

        this.setState({ name: name })
      }
    }
  }

  render() {
    const { isEnhanced, enrollmentOpen, ids } = this.props
    const { groups, selectedGroup } = this.state
    const id = constants.prefix.enroll
    const kicker = enrollmentOpen
      ? 'Enroll your clan today'
      : 'Enrollment closed'
    const placeholder = isEnhanced
      ? 'Enter clan name or ID'
      : 'Enter Bungie.net group ID'
    const name = isEnhanced ? 'clanName' : 'clanId'

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
          {enrollmentOpen ? (
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
              </SmartLink>
              , or{' '}
              <SmartLink href={constants.social.discord} target="_blank">
                join our Discord server
              </SmartLink>
            </Notification>
          )}
        </div>
        <ButtonGroup
          className={
            !enrollmentOpen || isEnhanced ? visuallyHiddenClassName : null
          }
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
                  {decode(name)}{' '}
                  <ClanTag className={styles[`${baseClassName}__clan-tag`]}>
                    {decode(clanInfo.clanCallsign)}
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
        {(!enrollmentOpen || isEnhanced) && <br />}
      </form>
    )
  }
}

Enrollment.propTypes = {
  isEnhanced: PropTypes.bool,
  enrollmentOpen: PropTypes.bool,
  ids: PropTypes.array
}

export default withApp(Enrollment)
