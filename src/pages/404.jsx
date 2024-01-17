import React from 'react'
import { Layout, MetaData, Section } from '../components'
import { Link, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

const NotFoundPage = ({ data }) => {
  const { mainSection } = data.page
  const errorMessage = documentToReactComponents(
    JSON.parse(mainSection.body.raw)
  )[0].props.children[0]
  const backToHome = mainSection.body.references[0]

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
    page: contentfulPage(
      contentful_id: { eq: "4XDWCwfYeCP0lxKwkL5PRt" }
      node_locale: { eq: "sv-SE" }
    ) {
      title
      metaData {
        title
        description
      }
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
  const metaData = data.page.metaData
  return <MetaData title={metaData.title} description={metaData.description} />
}
