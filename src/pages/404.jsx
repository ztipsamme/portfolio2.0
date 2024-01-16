import React from 'react'
import { Layout, Section } from '../components'
import { Link, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

const NotFoundPage = ({ data }) => {
  const { mainSection } = data.contentfulPage
  const errorMessage = documentToReactComponents(
    JSON.parse(mainSection.body.raw)
  )[0].props.children[0]
  const backToHome = mainSection.body.references[0]

  console.log(mainSection.body.references)
  return (
    <Layout>
      <Section className="content">
        <h1 className="text-h1">{mainSection.title}</h1>
        <p>{errorMessage}</p>
        <div className="mt-9">
          <Link
            to={backToHome.href}
            className="btn btn-sm btn-orange inline-block"
          >
            {backToHome.title}
          </Link>
        </div>
      </Section>
    </Layout>
  )
}

export default NotFoundPage

export const query = graphql`
  query {
    contentfulPage(
      contentful_id: { eq: "4XDWCwfYeCP0lxKwkL5PRt" }
      node_locale: { eq: "sv-SE" }
    ) {
      title
      mainSection {
        ... on ContentfulContent {
          id
          title
          body {
            raw
            references {
              title
              href
            }
          }
        }
      }
    }
  }
`

export const Head = ({ data }) => {
  return <title>{data.contentfulPage.title}</title>
}
