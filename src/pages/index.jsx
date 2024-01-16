import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BreakpointContext } from '../context/context'
import { Link, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { getIcon } from '../helpers'
import { Layout, Section } from '../components'

const ctaBTN = `btn btn-lg border-black text-black dark:border-white dark:text-white w-full shadow-lg`

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
    'sv-SE': [20, 20],
    'en-US': [15, 25],
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
  const { isMobile } = useContext(BreakpointContext)
  const { mainSection } = data.contentfulPage
  const heroText = documentToReactComponents(
    JSON.parse(mainSection.body.raw)
  )[0].props.children[0]

  return (
    <Layout>
      <Section id="hero" className="auto-rows-min">
        <img
          src={mainSection.image.file.url}
          alt=""
          className="h-screen w-full md:h-[500px] col-start-fullbleed  md:col-start-half col-end-fullbleed row-start-1 md:rounded-s-8xl object-cover"
        />
        <div className="hero-text">
          <div className={`p-8 rounded-3xl ${isMobile && 'glass shadow'}`}>
            <RenderHeroText
              text={heroText}
              locale={data.contentfulPage.node_locale}
            />
            <span className="flex gap-x-4">
              {mainSection.body.references.map((i) => (
                <a href={i.url} target="_blank" rel="noreferrer" key={i.id}>
                  <span className="hidden">{i.title}</span>
                  <FontAwesomeIcon
                    icon={getIcon(i.url)}
                    aria-hidden
                    className="icon"
                  />
                </a>
              ))}
            </span>
            <span className="flex flex-wrap lg:flex-nowrap gap-x-8 gap-y-2 mt-8">
              {mainSection.cta.map((cta) => (
                <Link
                  key={cta.id}
                  to={cta.href}
                  className={ctaBTN}
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
    contentfulPage(
      contentful_id: { eq: "2PM3XE7taJOd1Gisew7T9i" }
      node_locale: { eq: "sv-SE" }
    ) {
      title
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
            file {
              url
            }
          }
          cta {
            id
            href
            title
          }
        }
      }
      extraSection {
        ... on ContentfulCards {
          id
          title
          items {
            ... on ContentfulContent {
              id
              body {
                raw
              }
              title
              media {
                file {
                  url
                }
              }
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
