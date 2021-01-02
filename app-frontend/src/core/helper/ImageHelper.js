import React from 'react'

const ImageHelper = ({product}) => {
    const imageurl = product ? product.image : `https://unsplash.com/photos/d8VkM-PzQIc`
    return(
        <div className = "rounded">
            <img 
                src={imageurl} 
                style = {{height: "300px", weight: "200px", borderTopLeftRadius: "29px", borderTopRightRadius: "29px"}}
                className = "card-img-top mb-0"
                alt=""
            />

        </div>
    )
}

export default ImageHelper