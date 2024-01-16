// import { graphql } from 'gatsby'
import React from 'react'

const Category = () => {
  return <div>hej</div>
}

export default Category

// export const pageQuery = graphql`
//   query CategoryPage {
//     contentfulProject(categories: { elemMatch: { title: { eq: $category } } }) {
//       slug
//       title
//       media {
//         file {
//           url
//         }
//       }
//       gitHubLinkTitle
//       gitHubLink
//       demoLinkTitle
//       demoLink
//       body {
//         raw
//       }
//     }
//   }
// `
// export const Head = ({ data }) => {
//   return <title>{data.contentfulProject.title}</title>
// }
