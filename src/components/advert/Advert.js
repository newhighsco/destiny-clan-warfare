import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styles from './Advert.styl'

class Advert extends PureComponent {
  componentDidMount () {
    if (typeof window !== 'undefined' && window) (window.adsbygoogle = window.adsbygoogle || []).push({})

    document.body.classList.add(styles['has-advert'])
  }

  render () {
    const { client, slot, format } = this.props

    return (
      <div className={styles.advert}>
        <ins className={styles.adsbygoogle} data-ad-client={client} data-ad-slot={slot} data-ad-format={format} />
      </div>
    )
  }
}

Advert.defaultProps = {
  client: 'ca-pub-5655051109573002',
  slot: '2916154772',
  format: 'auto'
}

Advert.propTypes = {
  client: PropTypes.string,
  slot: PropTypes.string,
  format: PropTypes.string
}

export default Advert
