// import React, { Component } from 'react'
// import PropTypes from 'prop-types'

// class ClanTemplate extends Component {
//   render () {
//     const currentPage = this.props.data.clan

//     return (
//       <div>
//         <h1>Clan</h1>
//         <p dangerouslySetInnerHTML={{ __html: currentPage.name }} />
//       </div>
//     )
//   }
// }

// ClanTemplate.propTypes = {
//   data: PropTypes.object
// }

// export default ClanTemplate

// export const pageQuery = graphql`
//   query currentPageQuery($id: String!) {
//     clan(id: { eq: $id }) {
//       name
//     }
//   }
// `
