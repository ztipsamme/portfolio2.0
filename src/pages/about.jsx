import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Card, Layout, MetaData, Section } from '../components'
import {
  faCss3Alt,
  faFigma,
  faGit,
  faGithub,
  faHtml5,
  faJira,
  faNode,
  faNpm,
  faReact,
  faSass,
  faSquareJs,
  faTrello,
  faVuejs,
  faWordpress,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Stack = (props) => {
  const stack = [
    { label: 'HTML', icon: faHtml5 },
    { label: 'CSS', icon: faCss3Alt },
    { label: 'Sass', icon: faSass },
    { label: 'JavaScript', icon: faSquareJs },
    { label: 'TypeScript', svg: './images/typescript.svg' },
    { label: 'Vue.js', icon: faVuejs },
    { label: 'React.js', icon: faReact },
    { label: 'WordPress', icon: faWordpress },
    { label: 'NPM', icon: faNpm },
    { label: 'Node.js', icon: faNode },
    { label: 'Trello', icon: faTrello },
    { label: 'Jira', icon: faJira },
    { label: 'Figma', icon: faFigma },
    { label: 'Git', icon: faGit },
    { label: 'GitHub', icon: faGithub },
  ]
  const li = props.li.props.children

  if (!li) return null

  const string = li[0].props.children[0]

  const foundTool = stack.find(
    (tool) => tool.label.toLocaleLowerCase() === string.toLocaleLowerCase()
  )
  const isSVG = 'svg' in foundTool

  return (
    <li key={props.index} title={string} className="cursor-help">
      {!foundTool ? (
        string
      ) : (
        <>
          <span className="hidden">{string}</span>
          {isSVG ? (
            <img src={foundTool.svg} alt={foundTool.label + ' icon'} />
          ) : (
            <FontAwesomeIcon
              icon={foundTool.icon}
              aria-hidden
              className="icon"
            />
          )}
        </>
      )}
    </li>
  )
}

const About = ({ data }) => {
  const { mainSection, extraSection } = data.page
  const stack = documentToReactComponents(
    JSON.parse(extraSection[0].body.raw)
  )[1].props.children

  console.log(extraSection)

  return (
    <Layout>
      <Section className="content bg-peach dark:bg-beige dark:text-black">
        <h1 className="section-header text-white dark:text-orange">
          {data.page.title}
        </h1>
        {mainSection.items.map((i) => (
          <Fragment key={i.id}>
            <Card
              align={'alternating'}
              title={i.title}
              body={
                documentToReactComponents(JSON.parse(i.body.raw))[0].props
                  .children
              }
              media={i.media[0]}
              alt={i.media[0].description}
            />
          </Fragment>
        ))}
      </Section>
      <Section className="bg-orange text-white full-bleed content">
        <h2 className="section-header bleed">{extraSection[0].title}</h2>
        <h3 className="text-h1 bleed mb-4">{extraSection[0].subheading}</h3>
        <ul className="bleed flex flex-wrap gap-4">
          {stack.map((tool, index) => (
            <Fragment key={index}>
              <Stack li={tool} index={index} />
            </Fragment>
          ))}
        </ul>
      </Section>
      <Section className="full-bleed content">
        <h2 className="section-header bleed  dark:text-orange">
          {extraSection[1].title}
        </h2>
        {extraSection[1].items.map((i) => (
          <Fragment key={i.id}>
            <Card
              align={'alternating'}
              title={i.title}
              body={documentToReactComponents(JSON.parse(i.description.raw))}
              media={''}
            />
          </Fragment>
        ))}
      </Section>
      <Section className="full-bleed content">
        <h2 className="section-header bleed dark:text-orange">
          {extraSection[2].title}
        </h2>
        {extraSection[2].items.map((i) => (
          <Fragment key={i.id}>
            <Card
              align={'alternating'}
              title={i.title}
              body={documentToReactComponents(JSON.parse(i.description.raw))}
              media={''}
            />
          </Fragment>
        ))}
      </Section>
    </Layout>
  )
}

export default About

export const query = graphql`
  query AboutPage {
    page: contentfulPage(
      contentful_id: { eq: "5PpAzwG6zPGcMGi9de7pij" }
      node_locale: { eq: "sv-SE" }
    ) {
      id
      title
      metaData {
        title
        description
      }
      mainSection {
        ... on ContentfulCards {
          id
          title
          items {
            ... on ContentfulContent {
              id
              body {
                raw
              }
              media {
                gatsbyImageData
                description
              }
              title
            }
          }
        }
      }
      extraSection {
        ... on ContentfulContent {
          id
          body {
            raw
          }
          media {
            gatsbyImageData
            description
          }
          title
          subheading
          page {
            slug
          }
        }
        ... on ContentfulSectionComponent {
          id
          title
          items {
            id
            title
            start
            end
            description {
              raw
            }
          }
          page {
            slug
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
