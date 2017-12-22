import React from 'react'
import PropTypes from 'prop-types'

import './Prose.styl'

const Prose = ({ children }) => {
  return (
    <div className="prose">
      {children}
    </div>
  )
}

Prose.propTypes = {
  children: PropTypes.node
}

export default Prose
