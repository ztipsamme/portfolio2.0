import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'

const Header = () => {
  const { contentfulMenuComponent } = useStaticQuery(graphql`
    query {
      contentfulMenuComponent(contentful_id: { eq: "1aMgDo4QaXW2gniiwiwkwT" }) {
        id
        title
        menuItems {
          id
          url
          title
          href
        }
      }
    }
  `)

  return (
    <nav
      aria-label="Main Navigation"
      className={`glass md:bg-spring/50 md:text-black dark:md:bg-pine/50  dark:md:text-white shadow-md w-full flex justify-between items-center fixed bottom-0 md:sticky md:top-0 z-50 px-4 py-2 md:py-2 md:px-4 
      `}
    >
      <Link
        to={
          contentfulMenuComponent.menuItems.find((i) => i.title === 'Start')
            .href
        }
        className="text-h1 font-bold"
        smooth="true"
      >
        Emma Spitz
      </Link>
      <span className="flex w-screen left-0 md:w-min justify-between items-center md:gap-4">
        <ul
          className={`flex w-screen left-0 md:w-min justify-between md:gap-4`}
        >
          {contentfulMenuComponent.menuItems.map((i, index) => (
            <li
              key={i.id}
              className={`nav-link ${
                index === contentfulMenuComponent.menuItems.length - 1 &&
                'btn border-pine text-pine dark:border-white dark:text-white'
              }`}
            >
              <Link to={i.href}>{i.title}</Link>
            </li>
          ))}
        </ul>
      </span>
    </nav>
  )
}

export default Header
