import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../icon/Icon'
import Tooltip from '../tooltip/Tooltip'
import HighlightSvg from './highlight.svg'
import Tier1Svg from './tier1.svg'
import Tier2Svg from './tier2.svg'
import Tier3Svg from './tier3.svg'

import './Medals.styl'

const TierSvgs = {
  1: Tier1Svg,
  2: Tier2Svg,
  3: Tier3Svg
}

const Medals = ({ count }) => {
  if (count <= 0) return null
  let tier = 1

  return (
    <ul className="list--inline medals">
      {(function (rows, i, len) {
        while (++i <= len) {
          const MedalSvg = TierSvgs[tier]

          rows.push(
            <li key={i}>
              <Tooltip heading="Medal name TBC" text="Medal description TBC" enableHover>
                <Icon className="medals__icon">
                  <MedalSvg className={`medals__tier--${tier}`} />
                  <HighlightSvg className="medals__highlight" />
                </Icon>
              </Tooltip>
            </li>
          )

          tier++
          if (tier > 3) tier = 1
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
