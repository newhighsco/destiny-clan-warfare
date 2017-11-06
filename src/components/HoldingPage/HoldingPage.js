import React from 'react'
import PropTypes from 'prop-types'

const HoldingPage = ({ children }) => (
  <div className="holding-page">
    <div className="content-center content-gutter text-center">
      {children}
    </div>
  </div>
)

HoldingPage.propTypes = {
  children: PropTypes.node
}

export default HoldingPage
