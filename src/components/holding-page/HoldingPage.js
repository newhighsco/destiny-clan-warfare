import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Meta from '../meta/Meta'
import ContentContainer from '../content-container/ContentContainer'
import TextAlign from '../text-align/TextAlign'
import styles from './HoldingPage.styl'

const baseClassName = 'holding-page'

const HoldingPage = class extends PureComponent {
  render() {
    const { children, meta, showBackground } = this.props

    return (
      <div
        className={classNames(
          styles[baseClassName],
          showBackground && styles[`${baseClassName}--background`]
        )}
      >
        <Meta {...meta} />
        <ContentContainer gutter>
          <TextAlign center>{children}</TextAlign>
        </ContentContainer>
      </div>
    )
  }
}

HoldingPage.defaultProps = {
  showBackground: true
}

HoldingPage.propTypes = {
  children: PropTypes.node,
  meta: PropTypes.object,
  showBackground: PropTypes.bool
}

export default HoldingPage
