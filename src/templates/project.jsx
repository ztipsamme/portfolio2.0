import React from 'react'
import { graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Card, Layout, MetaData, Section } from '../components'

const Project = ({ data }) => {
  const {
    id,
    title,
    body,
    media,
    gitHubLinkTitle,
    gitHubLink,
    demoLinkTitle,
    demoLink,
  } = data.project

  return (
    <Layout>
      <Section id="projects" className="content">
        <h2 className="section-header text-orange">Projects</h2>
        <h3 className="text-h1 mb-8">Selected projects</h3>
        <ul className="">
          <Card
            id={id}
            align={'left'}
            title={title}
            body={documentToReactComponents(JSON.parse(body.raw))}
            media={media && media}
            alt={media[0].description}
            links={[
              { title: gitHubLinkTitle, to: gitHubLink },
              { title: demoLinkTitle, to: demoLink },
            ]}
          />
        </ul>
      </Section>
    </Layout>
  )
}

export default Project

export const pageQuery = graphql`
  query ProjectPage($slug: String!) {
    project: contentfulProject(slug: { eq: $slug }) {
      slug
      title
      media {
        gatsbyImageData
      }
      gitHubLinkTitle
      gitHubLink
      demoLinkTitle
      demoLink
      body {
        raw
      }
    }
  }
`

export const Head = ({ data }) => {
  const project = data.project
  return (
    <MetaData
      title={project.title}
      description={
        documentToReactComponents(JSON.parse(project.body.raw))[0].props
          .children[0]
      }
    />
  )
}
