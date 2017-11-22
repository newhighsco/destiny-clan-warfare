import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../icon/Icon'
import Tooltip from '../tooltip/Tooltip'
import MedalSvg from '../../images/medal.svg'

import './Medals.styl'

const Medals = ({ count }) => {
  if (count <= 0) return null

  return (
    <ul className="list--inline medals">
      {(function (rows, i, len) {
        while (++i <= len) {
          rows.push(
            <li key={i}>
              <Tooltip heading="Medal name TBC" text="Medal description TBC" enableHover>
                <Icon className="medals__icon">
                  <MedalSvg />
                </Icon>
              </Tooltip>
            </li>
          )
        }
        return rows
      })([], 0, count)}
    </ul>
  )
}

Medals.propTypes = {
  count: PropTypes.number
}

export default Medals
