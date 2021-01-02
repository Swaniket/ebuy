import React, {useState} from 'react'
import ImageHelper from './helper/ImageHelper'
import {Redirect} from 'react-router-dom'

import {addItemToCart, removeItemFromCart} from './helper/cartHelper'
import {isAuthenticated} from '../auth/helper/index'
import './styles/Card.css'

// function(f) {return f} 
const Card = ({product, addtoCart = true, removeFromCart = false, reload = undefined, setReload = f => f}) => {
    const [redirect, setRedirect] = useState(false)


    const cartTitle = product ? product.name : "A photo from pixels"
    const cartDescription = product? product.description : "Default Description"
    const cartPrice = product? product.price : "Default"


    const addToCart = () => {
      if (isAuthenticated()){
        addItemToCart(product, () => setRedirect(true))
        console.log("Added to cart");
      }
      else{
        console.log("Log in first");
      }
    }

    // Deal with this later
    const getAredirect = redirect => {
      if(redirect){
        return <Redirect to= '/cart'/>
      }
    }

    const showAddToCart = addToCart => {
      return(
        addtoCart && 
        ( 
          <button
            onClick={addToCart}
            className="btn btn-sm btn-primary mt-2 mb-2"
          >
            Add to Cart
          </button>
        )
      )
    }

    const showRemoveFromCart = (removeFromCart) => {
      return(
        removeFromCart && (
          <button
                onClick={() => {
                  removeItemFromCart(product.id)
                  setReload(!reload)
                  console.log("Product removed from cart")
                }}
                className="btn  btn-block btn-outline-danger mt-2 mb-2"
              >
                Remove from cart
          </button>
        )
      )
    }



    return (
      <div className="card mt-2 mb-2 text-dark">
        <ImageHelper product = {product}/>
        <div className="card-body">
          <p className="card-title">
            {cartTitle}
          </p>
          <p className="card-title">
            {cartDescription}
          </p>
          <p className="badge rounded-pill bg-primary mb-2">$ {cartPrice}</p>
          <div className="row">
            <div className="col-12">
              {showAddToCart(addToCart)}
            </div>
            <div className="col-12">
              {showRemoveFromCart(removeFromCart)}
            </div>
          </div>
        </div>
      </div>
    );
  };

export default Card
