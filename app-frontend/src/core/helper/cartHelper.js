export const addItemToCart = (item, next) => {
    let cart = []
    // Firstly check if there are any data in browser local storage or not
    if (typeof windows !== undefined) {
        // If any information already exist in cart then add it in the cart
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"))
        }

        cart.push({
            ...item 
        })
        localStorage.setItem("cart", JSON.stringify(cart))
        // it's for chainnning other call back functions
        next()
    }
}

export const loadCart = () => {
    if (typeof windows !== undefined) {
        if (localStorage.getItem("cart")) {
            return JSON.parse(localStorage.getItem("cart"))
        }
    }
}

export const removeItemFromCart = (productId) => {
    let cart = []

    if (typeof windows !== undefined) {

        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"))
        }

        cart.map((product, i) => {
            if (product.id === productId){
                cart.splice(i,1)
            }
        })

        localStorage.setItem("cart", JSON.stringify(cart))
    }

    return cart 
}

export const cartEmpty = (next) => {
    if (typeof windows !== undefined) {
        // If we are gonna delete the whole cart then it will throw error in some other methods where a cart object needs to be there
        localStorage.removeItem("cart")

        let cart = []
        localStorage.setItem("cart", JSON.stringify(cart))
        next()
    }
}