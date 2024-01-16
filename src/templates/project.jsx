import React from 'react'
import { Section } from '../components/UI'
import { graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Card, Layout } from '../components'

const Project = ({ data }) => {
  const project = data.contentfulProject

  return (
    <Layout>
      <Section id="projects" className="content">
        <h2 className="section-header text-orange">Projects</h2>
        <h3 className="text-h1 mb-8">Selected projects</h3>
        <ul className="">
          <Card
            id={project.id}
            align={'left'}
            title={project.title}
            body={documentToReactComponents(JSON.parse(project.body.raw))}
            img={project.media && project.media[0].file.url}
            links={[
              { title: project.gitHubLinkTitle, to: project.gitHubLink },
              { title: project.demoLinkTitle, to: project.demoLink },
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
    contentfulProject(slug: { eq: $slug }) {
      slug
      title
      media {
        file {
          url
        }
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
  return <title>{data.contentfulProject.title}</title>
}
