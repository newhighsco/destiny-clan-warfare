import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import List from '../list/List'
import { Grid, GridItem } from '../grid/Grid'
import styles from './Swatch.styl'

const baseClassName = 'swatch'
const colors = [
  { name: 'Terracotta', value: '#e27365' },
  { name: 'Equator', value: '#e2b265' },
  { name: 'Lemon', value: '#d6da2a' },
  { name: 'Pastel green', value: '#65e273' },
  { name: 'Cornflower', value: '#6596e2' },
  { name: 'White', value: '#fff' },
  { name: 'White smoke', value: '#f4f4f4' },
  { name: 'Silver', value: '#b3b3b3' },
  { name: 'Eclipse', value: '#404040' },
  { name: 'Nightrider', value: '#333' },
  { name: 'Nero', value: '#262626' },
  { name: 'Black', value: '#000' }
]

const Swatch = class extends PureComponent {
  render() {
    const { name, value } = this.props

    if (!value) return null

    return (
      <div className={styles[baseClassName]} style={{ backgroundColor: value }}>
        <div className={styles[`${baseClassName}__caption`]}>
          {name && (
            <h2 className={styles[`${baseClassName}__title`]}>{name}</h2>
          )}
          <List unstyled className={styles[`${baseClassName}__list`]}>
            <li className={styles[`${baseClassName}__value`]}>{value}</li>
          </List>
        </div>
      </div>
    )
  }
}

Swatch.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string
}

const SwatchList = class extends PureComponent {
  render() {
    return (
      <Grid stacked>
        {colors.map((colour, index) => (
          <GridItem
            key={index}
            sizes={[
              'one-half',
              'tablet-one-third',
              'tablet-landscape-one-quarter'
            ]}
          >
            <Swatch {...colour} />
          </GridItem>
        ))}
      </Grid>
    )
  }
}

export { Swatch, SwatchList }
