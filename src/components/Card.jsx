import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import Slider from './Slider'

const Card = (props) => {
  const { align, alt, media, title, body, links } = props
  if (!align) return null

  if (align === 'alternating') {
    return (
      <div className={`card mb-8`}>
        {media && (
          <GatsbyImage
            image={getImage(media)}
            alt={alt && alt}
            className={`card-img card-media-right row-span-2 col-span-half aspect-4/3 shadow-lg`}
          />
        )}
        <h3 className="text-h1">{title}</h3>
        <div>{body}</div>
      </div>
    )
  }

  if (align === 'left') {
    return (
      <div className={`card mb-8`}>
        {media && (
          <div className="md:col-start-1 md:row-start-1 md:row-span-2 lg:row-span-3">
            {media.length >= 2 ? (
              <Slider media={media} />
            ) : (
              <GatsbyImage
                image={getImage(media[0])}
                alt=""
                className="card-img shadow w-fit aspect-5/8"
              />
            )}
          </div>
        )}

        <h4 className="text-h2 ">{title}</h4>
        <div>{body}</div>
        <div className="card-btns flex gap-4">
          {links.map(
            (i, index) =>
              i.to && (
                <a
                  key={index}
                  href={i.to}
                  // target="_blank"
                  // rel="noreferrer"
                  className="btn btn-md btn-outline-orange font-bold shadow"
                >
                  {i.title}
                </a>
              )
          )}
        </div>
      </div>
    )
  }
}

export default Card
