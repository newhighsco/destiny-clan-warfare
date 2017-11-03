import React from 'react'
import PropTypes from 'prop-types'

const HoldingPage = ({ children }) => (
  <div className="holding-page">
    {children}
  </div>
)

HoldingPage.propTypes = {
  children: PropTypes.node
}

export default HoldingPage
