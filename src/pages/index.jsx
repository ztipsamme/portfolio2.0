import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { getIcon } from '../helpers'
import { Layout, MetaData, Section } from '../components'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const sliceText = (text, ...lengths) => {
  let start = 0
  return lengths.map((length) => {
    const slice = text.substring(start, start + length)
    start += length
    return slice
  })
}

const RenderHeroText = (props) => {
  const { text, locale } = props

  if (!text || !locale) return null

  const localeMappings = {
    'sv-SE': [33, 28],
    'en-US': [15, 26],
  }

  const lengths = localeMappings[locale]

  if (!lengths) return null

  const [top, middle, bottom] = sliceText(
    text,
    lengths[0],
    lengths[1],
    text.length
  )

  return (
    <>
      <h1 className="hidden">Start</h1>
      <h2 className="text-h1">
        {top}
        <br />
        <span className="text-hero capitalize text-orange">{middle}</span>
        <br />
        {bottom}
      </h2>
    </>
  )
}

const IndexPage = ({ data }) => {
  const { mainSection } = data.page

  return (
    <Layout>
      <Section id="hero" className="auto-rows-min">
        <GatsbyImage
          image={getImage(mainSection.image)}
          alt={mainSection.image.description}
          class="hero-image"
        />

        <div className="hero-text">
          <div>
            <RenderHeroText
              text={
                documentToReactComponents(JSON.parse(mainSection.body.raw))[0]
                  .props.children[0]
              }
              locale={data.page.node_locale}
            />
            <span className="flex gap-x-4">
              {mainSection.body.references.map((i) => (
                <a
                  href={i.url}
                  target="_blank"
                  rel="noreferrer"
                  key={i.id}
                  title={i.title}
                >
                  <span className="hidden">{i.title}</span>
                  <FontAwesomeIcon
                    icon={getIcon(i.url)}
                    aria-hidden
                    className="icon"
                  />
                </a>
              ))}
            </span>
            <span className="flex flex-wrap lg:flex-nowrap md:gap-x-4 gap-y-2 mt-8">
              {mainSection.cta.map((cta, index) => (
                <Link
                  key={cta.id}
                  to={cta.href}
                  className={`btn btn-lg shadow-lg w-full md:w-fit ${
                    index === 0
                      ? 'bg-pine border-pine text-white dark:bg-white dark:border-white dark:text-pine'
                      : 'border-black dark:border-white dark:text-white'
                  }`}
                  smooth="true"
                >
                  {cta.title}
                </Link>
              ))}
            </span>
          </div>
        </div>
      </Section>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query HomePage {
    page: contentfulPage(
      contentful_id: { eq: "2PM3XE7taJOd1Gisew7T9i" }
      node_locale: { eq: "sv-SE" }
    ) {
      title
      metaData {
        title
        description
      }
      node_locale
      mainSection {
        ... on ContentfulHeroComponent {
          id
          body {
            raw
            references {
              ... on ContentfulLink {
                id
                url
                title
                href
              }
            }
          }
          title
          image {
            description
            gatsbyImageData
          }
          cta {
            id
            href
            title
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
