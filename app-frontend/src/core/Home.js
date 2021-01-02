import React, {useState, useEffect} from 'react'
import getProducts from './helper/coreapicalls'
import Base from './Base'
import Card from "./Card"
import '../styles.css'

export default function Home() {
    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)

    const loadAllProducts = () => {
        getProducts()
        // data?.error
        .then(data => {
            if (data && data.error) {
                setError(data.error)
                console.log(error);
            } else {
                console.log(data)
                setProducts(data)
            }
        })
    }

    useEffect(() => {
        loadAllProducts()
    }, [])

    return(
        <Base title = "Home Page" description = "Welcome to the store">
            <h1>This is the Home component</h1>
            <div className="row">
                {products.map((product, index) => {
                    return(
                        <div key = {index} className = "col-sm mb-2">
                            <Card product = {product}/>
                        </div>
                    )
                })}
            </div>
        </Base>
    )
}

