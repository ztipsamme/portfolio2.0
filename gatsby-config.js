/**
 * @type {import('gatsby').GatsbyConfig}
 */

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `portfolio`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    {
      resolve: 'gatsby-source-contentful',
      options: {
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        spaceId: process.env.CONTENTFUL_SPACE_ID,
      },
    },
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        fields: [
          'title',
          'body',
          'node_locale',
          'companyOrSchool',
          'description',
          'slug',
          'parent',
        ],
        resolvers: {
          ContentfulProject: {
            title: (node) => node.title,
            body: (node) => node.body,
            slug: (node) => node.slug,
            node_locale: (node) => node.node_locale,
          },
          ContentfulContent: {
            title: (node) => node.title,
            body: (node) => node.body,
            slug: (node, getNode) => {
              if (getNode(node.page___NODE)) {
                return getNode(node.page___NODE)
              } else {
                return getNode(node.cards___NODE)
              }
            },
            node_locale: (node) => node.node_locale,
          },
          ContentfulCards: {
            title: (node) => node.title,
            slug: (node, getNode) => getNode(node.page___NODE),
            node_locale: (node) => node.node_locale,
          },
          ContentfulPage: {
            title: (node) => node.title,
            slug: (node) => node.slug,
            node_locale: (node) => node.node_locale,
          },
          // ContentfulExperience: {
          //   title: (node) => node.title,
          //   // companyOrSchool: (node) => node.companyOrSchool,
          //   // description: (node) => node.description,
          //   slug: (node, getNode) => getNode(node.section_component___NODE),
          //   node_locale: (node) => node.node_locale,
          // },
          ContentfulCategory: {
            title: (node) => node.title,
            slug: (node, getNode) => getNode(node.project___NODE),
          },
        },
        filter: (node, getNode) => node.node_locale !== 'en-US',
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-postcss',
    'gatsby-plugin-netlify',
  ],
}
