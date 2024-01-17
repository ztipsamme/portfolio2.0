import React from 'react'

const MetaData = (props) => {
  const { title, description } = props
  return (
    <>
      <html lang="sv" />
      <title>{title}</title>
      <meta name="description" content={description} />
    </>
  )
}

export default MetaData
