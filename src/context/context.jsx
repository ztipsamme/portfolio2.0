import React from 'react'
import { createContext, useEffect, useState } from 'react'

export const BreakpointContext = createContext({
  isMobile: false,
  isSubMenuOpen: false,
})

export const BreakpointContextProvider = (props) => {
  const [isMobile, setIsMobile] = useState(false)
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false)

  const toggleSubMenu = (state) => {
    setIsSubMenuOpen(state !== undefined ? state : !isSubMenuOpen)
  }

  const toggleIsMobile = () => {
    if (window.innerWidth > 768) {
      setIsMobile(false)
      setIsSubMenuOpen(false)
    } else {
      setIsMobile(true)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', () => {
      toggleIsMobile()
    })

    window.addEventListener('load', () => {
      toggleIsMobile()
    })
  })

  return (
    <BreakpointContext.Provider
      value={{
        isMobile,
        isSubMenuOpen,
        toggleSubMenu: toggleSubMenu,
      }}
    >
      {props.children}
    </BreakpointContext.Provider>
  )
}

export const SelectedProjectsContext = createContext({
  amountOfSelectetProjects: 2,
})
