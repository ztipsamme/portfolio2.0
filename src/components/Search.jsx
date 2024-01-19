import React, { useEffect, useState } from 'react'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Index } from 'elasticlunr'
import { Link, graphql, useStaticQuery } from 'gatsby'
const navBtnStyle = `h-4 aspect-square py-4 pl-8`

const Search = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [index, setIndex] = useState(null)
  const { siteSearchIndex } = useStaticQuery(graphql`
    query Search {
      siteSearchIndex {
        index
      }
    }
  `)
  const searchIndex = siteSearchIndex.index

  useEffect(() => {
    const getOrCreateIndex = () => (index ? index : Index.load(searchIndex))
    setIndex(getOrCreateIndex())
  }, [index, searchIndex])

  const handleSearch = (e) => {
    e.preventDefault()

    if (index) {
      const searchResults = index
        .search(query, { expand: true })
        .map(({ ref }) => index.documentStore.getDoc(ref))

      console.log(searchResults)
      setResults(searchResults)
    }
  }

  return (
    <div className="relative">
      <form className="w-fit flex items-center relative pr-6">
        <input
          type="text"
          value={query}
          className="text-black rounded-full px-2 my-4"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          aria-label="search"
          type="submit"
          className="absolute top-1/2 translate-y-[-50%] end-0"
          onClick={handleSearch}
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={`${navBtnStyle}`}
          />
        </button>
      </form>
      {results.length >= 1 && (
        <ul className="absolute top-full bg-pine rounded-xl p-2 w-full shadow-lg border-white border-2">
          {results.map((result) => (
            <li key={result.id}>
              <Link to={result.slug} className="nav-link font-normal underline">
                {result.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Search
