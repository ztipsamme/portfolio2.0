import React from 'react'

const Section = ({ id, className, children }) => {
  return (
    <section
      id={id}
      className={`w-full overflow-hidden grid grid-cols-container py-4 md:py-24 ${className}`}
    >
      {children}
    </section>
  )
}

export default Section
