import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'

const Card = (props) => {
  if (!props.align) return null

  if (props.align === 'alternating') {
    return (
      <div className={`card mb-8`}>
        {props.img && (
          <GatsbyImage
            image={getImage(props.img)}
            alt={props.alt && props.alt}
            className={`card-img card-img-right row-span-2 col-span-half aspect-4/3 shadow-lg`}
          />
        )}
        <h3 className="text-h1">{props.title}</h3>
        <div>{props.body}</div>
      </div>
    )
  }

  if (props.align === 'left') {
    return (
      <div className={`card mb-8`}>
        {props.img && (
          <div className="md:col-start-1 md:row-start-1 md:row-span-2 lg:row-span-3">
            <GatsbyImage
              image={getImage(props.img)}
              alt=""
              className="card-img shadow w-fit aspect-5/8"
            />
          </div>
        )}

        <h4 className="text-h2 ">{props.title}</h4>
        <div>{props.body}</div>
        <div className="card-btns flex gap-4">
          {props.links.map(
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
