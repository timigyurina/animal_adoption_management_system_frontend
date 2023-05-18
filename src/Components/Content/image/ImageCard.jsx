import React from 'react'

const ImageCard = ({image}) => {
  return (
    <div>
        <img width="300" src={`${process.env.REACT_APP_BACKEND_URL}/${image.imagePath}`} alt={image.animal.name}  />
    </div>
  )
}

export default ImageCard