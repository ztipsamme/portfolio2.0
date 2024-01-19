import React, { useState } from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { Search } from './index'
import { faBars, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const navBtnStyle = `h-4 aspect-square py-4 pl-8`

const Header = () => {
  const { menu } = useStaticQuery(graphql`
    query Header {
      menu: contentfulMenuComponent(
        contentful_id: { eq: "1aMgDo4QaXW2gniiwiwkwT" }
      ) {
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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false)
      return
    }
    setIsMenuOpen(true)
  }

  return (
    <nav
      aria-label="Main Navigation"
      className="sticky top-0 bg-spring dark:bg-pine z-10 md:flex md:items-center"
    >
      <span className="flex justify-between px-4 md:flex-grow">
        <Link
          to={menu.menuItems.find((i) => i.title === 'Start').href}
          className="text-h3 py-[14.5px] font-bold"
        >
          Emma Spitz
        </Link>

        <span className="flex justify-end">
          <Search />

          <button onClick={toggleMenu} aria-label={menu.title}>
            <FontAwesomeIcon
              icon={isMenuOpen ? faX : faBars}
              className={`inline md:hidden ${navBtnStyle}`}
            />
          </button>
        </span>
      </span>

      <ul
        className={`${isMenuOpen ? 'absolute' : 'hidden'}
      w-full h-fit bg-spring dark:bg-pine md:flex flex-col px-4 pb-4 md:w-min md:h-min md:bg-transparent md:flex-row md:gap-x-4 md:px-0 md:pb-0`}
      >
        {menu.menuItems.map((i) => (
          <li key={i.id} className="nav-link w-full">
            <Link to={i.href}>{i.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Header
