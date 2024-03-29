import React, { useEffect, useState } from 'react'
import { Section } from '../components'
import { graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Card, Layout, MetaData } from '../components'

const Projects = ({ data }) => {
  const [selectedCategorys, setSelectedCategorys] = useState([])
  const [filterdProjects, setFilterdProjects] = useState([])
  const [categories, setCategories] = useState([])
  const projects = data.projects.nodes

  const handleFilter = (id) => {
    if (selectedCategorys.find((category) => category === id)) {
      setSelectedCategorys(selectedCategorys.filter((x) => x !== id))
      removeProject(selectedCategorys.filter((x) => x !== id))
      return
    }

    setSelectedCategorys([...selectedCategorys, id])
    addProject(id)
  }

  const addProject = (id) => {
    let newArr = []

    projects.forEach((project) => {
      if (filterdProjects.find((e) => e.id === project.id)) {
        return
      }

      if (project.categories.find((e) => e.contentful_id === id)) {
        newArr.push(project)
      }
    })

    setFilterdProjects([...filterdProjects, ...newArr])
  }

  const removeProject = (newSelectedCategories) => {
    let newArr = []

    newSelectedCategories.forEach((category) => {
      filterdProjects.forEach((project) => {
        if (newArr.find((e) => e.id === project.id)) {
          return
        }

        if (project.categories.find((e) => e.contentful_id === category)) {
          newArr.push(project)
        }
      })

      setFilterdProjects([...newArr])
    })
  }

  const categoryInUse = () => {
    let newArr = []

    projects.forEach((projects) => {
      projects.categories.forEach((category) => {
        if (newArr.find((e) => e.contentful_id === category.contentful_id)) {
          return
        }

        newArr.push(category)
      })
    })

    setCategories([...newArr])
  }

  useEffect(() => {
    categoryInUse()
  }, [])

  return (
    <Layout>
      <Section id="projects" className="content">
        <h2 className="section-header text-orange">{data.page.title}</h2>
        <h3 className="text-h1 mb-8">{data.page.mainSection.title}</h3>
        <nav className="mb-9">
          <form>
            {categories.map((i) => (
              <label
                key={i.id}
                className={`mb-1 mr-1 btn btn-xs border-pine dark:border-peach inline-block ${
                  selectedCategorys.find((x) => x === i.contentful_id)
                    ? 'bg-pine text-white dark:bg-peach dark:text-pine'
                    : 'text-pine dark:text-peach'
                }`}
              >
                {i.title}
                <input
                  type="checkbox"
                  value={i}
                  onChange={() => handleFilter(i.contentful_id)}
                  className="hidden"
                />
              </label>
            ))}
          </form>
        </nav>
        <ul>
          {(selectedCategorys <= 0 ? projects : filterdProjects).map((i) => (
            <li key={i.id}>
              <Card
                align={'left'}
                title={i.title}
                body={documentToReactComponents(JSON.parse(i.body.raw))}
                media={i.media && i.media}
                alt={i.media[0].description}
                links={[
                  { title: i.gitHubLinkTitle, to: i.gitHubLink },
                  { title: i.demoLinkTitle, to: i.demoLink },
                  { title: i.readMoreTitle, to: i.slug },
                ]}
              />
            </li>
          ))}
        </ul>
      </Section>
    </Layout>
  )
}

export default Projects

export const query = graphql`
  query ProjectsPage {
    page: contentfulPage(
      contentful_id: { eq: "1VOnPM8GCpWRzxA0WRuuBA" }
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
          title
        }
      }
    }
    projects: allContentfulProject(filter: { node_locale: { eq: "sv-SE" } }) {
      nodes {
        id
        slug
        title
        body {
          raw
        }
        demoLink
        demoLinkTitle
        gitHubLink
        gitHubLinkTitle
        media {
          gatsbyImageData
          description
        }
        categories {
          id
          contentful_id
          title
        }
      }
    }
  }
`

export const Head = ({ data }) => {
  const metaData = data.page.metaData
  return <MetaData title={metaData.title} description={metaData.description} />
}
