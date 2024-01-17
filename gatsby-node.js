exports.createPages = async function ({ actions, graphql }) {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allContentfulProject {
        nodes {
          slug
          title
          categories {
            title
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Contentful posts`,
      result.errors
    )
    return
  }

  const projects = result.data.allContentfulProject.nodes

  if (projects.length > 0) {
    result.data.allContentfulProject.nodes.forEach((project) => {
      createPage({
        path: `/projects/${project.slug}/`,
        component: require.resolve('./src/templates/project.jsx'),
        context: {
          slug: project.slug,
        },
      })
    })
  }
}
