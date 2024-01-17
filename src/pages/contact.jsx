import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Layout, MetaData, Section } from '../components'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const header = (data, index) => {
  return documentToReactComponents(JSON.parse(data.page.mainSection.body.raw))[
    index
  ].props.children[0]
}

const ListItem = ({ href, title, icon }) => {
  return (
    <li>
      <a href={href} className="py-3" target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={icon} className="mr-4 w-8 text-orange" />
        {title}
      </a>
    </li>
  )
}

const Contact = ({ data }) => {
  const { topSection, mainSection } = data.page
  const links = mainSection.body.references

  return (
    <Layout>
      <GatsbyImage
        id="desk-setup-img"
        image={getImage(topSection[0].media[0])}
        alt=""
        className="h-96 w-full object-cover gatsby-image-index"
      />
      <Section id="contact" className="content">
        <h2 className="section-header text-orange">{data.page.title}</h2>
        <h3 className="text-h1">{header(data, 0)}</h3>
        <address className="not-italic	">
          <ul className="text-h2">
            <ListItem
              href={'mailto:' + links[0].href}
              title={links[0].href}
              icon={faEnvelope}
            />
            <ListItem
              href={links[1].url}
              title={links[1].title}
              icon={faLinkedin}
            />
          </ul>
        </address>
        <h3 className="text-h1 mt-8 md:mt-auto md:row-start-2">
          {header(data, 2)}
        </h3>
        <nav>
          <ul className="text-h2">
            <ListItem
              href={links[2].url}
              title={links[2].title}
              icon={faGithub}
            />
            <ListItem
              href={links[3].url}
              title={links[3].title}
              icon={faLink}
            />
          </ul>
        </nav>
      </Section>
    </Layout>
  )
}

export default Contact

export const query = graphql`
  query ContactPage {
    page: contentfulPage(
      contentful_id: { eq: "5mVs0235aMUkrvPIQVSftn" }
      node_locale: { eq: "sv-SE" }
    ) {
      id
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
              id
              href
              title
              url
            }
          }
        }
      }
      topSection {
        ... on ContentfulContent {
          id
          media {
            gatsbyImageData
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
