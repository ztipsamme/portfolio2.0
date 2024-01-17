import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React, { Fragment, useEffect, useState } from 'react'

const Button = (props) => {
  const { children, onClick } = props
  const isPrevious = children === 'previous'
  return (
    <button value={children} className="" onClick={onClick}>
      <FontAwesomeIcon
        icon={isPrevious ? faAngleLeft : faAngleRight}
        className={`icon`}
      />
    </button>
  )
}

const Slider = (props) => {
  const { media } = props
  const [slides, setSlides] = useState([...media])

  const handleSlider = (direction) => {
    if (direction === 'next') {
      const slide = slides.shift()
      setSlides([...slides, slide])
      return
    }

    if (direction === 'previous') {
      const slide = slides.pop()
      setSlides([slide, ...slides])
      return
    }
  }

  return (
    <div className="slider-container">
      <div className="slider-controlls">
        {['previous', 'next'].map((direction, index) => (
          <Button
            key={index}
            value={media}
            onClick={() => handleSlider(direction)}
          >
            {direction}
          </Button>
        ))}
      </div>
      <div className="slider-track-container">
        <div className="slider-track">
          {slides.map((img, index) => (
            <Fragment key={index}>
              <GatsbyImage
                image={getImage(img)}
                alt=""
                className={`card-img shadow aspect-5/8 w-60 slider-item`}
              />
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Slider
