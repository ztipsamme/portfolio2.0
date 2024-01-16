import React from 'react'

const Card = (props) => {
  if (!props.align) return null

  if (props.align === 'alternating') {
    return (
      <div className={`card mb-8`}>
        {props.img && (
          <img
            src={props.img}
            alt={'alt'}
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
          <img src={props.img} alt="" className="card-img shadow" />
        )}

        <h4 className="text-h2 ">{props.title}</h4>
        <div>{props.body}</div>
        <div className="card-btns flex gap-4">
          {props.links.map((i, index) => (
            <a
              key={index}
              href={i.to}
              // target="_blank"
              // rel="noreferrer"
              className="btn btn-md btn-outline-orange font-bold shadow"
            >
              {i.title}
            </a>
          ))}
        </div>
      </div>
    )
  }
}

export default Card
