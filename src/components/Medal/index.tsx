import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { paramCase } from 'param-case'
import { List, ResponsiveMedia, Tooltip } from '@newhighsco/chipset'
import Icon from '@components/Icon'
import { duplicates } from './foregrounds'

import styles from './Medal.module.scss'

export enum MedalTiers {
  Primary = 3,
  Secondary = 2,
  Tertiary = 1
}

export interface MedalProps {
  name: string
  description: string
  tier: MedalTiers
  count?: number
  awardedTo?: string[]
  tooltipProps?: PropTypes.InferProps<Tooltip.propTypes>
}

const Medal: React.FC<MedalProps> = ({
  name,
  description,
  tier = MedalTiers.Tertiary,
  count = 1,
  awardedTo,
  tooltipProps
}) => {
  const key = paramCase(name || '')
  const label = new Intl.ListFormat().format(awardedTo)

  return (
    <Tooltip
      toggle={
        <div
          className={classNames(styles.root, styles[MedalTiers[tier]])}
          data-icon={name}
        >
          <ResponsiveMedia ratio="124:129" className={styles.layers}>
            <Icon
              name={`medal/background/tier${tier}`}
              theme={{ root: classNames(styles.background, styles.layer) }}
            />
            {key && (
              <Icon
                name={`medal/foreground/${duplicates[key] || key}`}
                theme={{ root: classNames(styles.foreground, styles.layer) }}
              />
            )}
            <Icon
              name="medal/highlight"
              theme={{ root: classNames(styles.highlight, styles.layer) }}
            />
            {count > 1 && (
              <div className={classNames(styles.foreground, styles.count)}>
                <span className={styles.background}>{count}</span>
              </div>
            )}
          </ResponsiveMedia>
          {label && (
            <div
              className={styles.label}
              dangerouslySetInnerHTML={{ __html: label }}
            />
          )}
        </div>
      }
      heading={name}
      {...tooltipProps}
    >
      {description}
    </Tooltip>
  )
}

export interface MedalListProps {
  medals: Array<MedalProps>
  tooltipProps?: MedalProps['tooltipProps']
}

const MedalList: React.FC<MedalListProps> = ({ medals, tooltipProps }) => {
  if (!medals?.length) return null

  return (
    <List inline className={styles.list}>
      {medals
        .sort((a, b) => b.tier - a.tier)
        .map((medal, i) => (
          <li key={i}>
            <Medal {...medal} tooltipProps={tooltipProps} />
          </li>
        ))}
    </List>
  )
}

export { Medal, MedalList }
