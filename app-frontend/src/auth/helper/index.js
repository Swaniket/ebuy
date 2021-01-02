import {API} from '../../backend'
import {cartEmpty} from '../../core/helper/cartHelper'

// Handling it in JSON format
export const signup = (user) => {
    return fetch(`${API}user/`, {
        // expected method, headers & body will go under here
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

// Handling it in Form Data way
export const signin = user => {
    const formData = new FormData()

    for (const name in user) {
        formData.append(name, user[name])
    }

    // To see the keys
    for (var key of formData.keys()){
        console.log("MYKEYS:", key);
    }

    return fetch(`${API}user/login/`, {
        method: "POST",
        body: formData
    })
    .then(response => {
        console.log("SUCCESS", response);
        return response.json()
    })
    .catch(err => console.log(err))
}

export const authenticate = (data, next) => {
    if(typeof window !== undefined) {
        localStorage.setItem("jwt", JSON.stringify(data))
        next()
    }
}

export const isAuthenticated = () => {
    if (typeof window == undefined) {
        return false
    }
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"))
        //TODO: Compare JWT with the database JSON token
    } else {
        return false
    }
}

export const signout = (next) => {
    const userId = isAuthenticated() && isAuthenticated().user.id

    if(typeof windows !== undefined) {
        localStorage.removeItem("jwt")
        cartEmpty(() => {})

        return fetch(`${API}user/logout/${userId}`, {
            method: "GET"
        })
        .then(response => {
            console.log("Signout Success")
            next()
        })
        .catch(err => console.log(err))
    }
}



