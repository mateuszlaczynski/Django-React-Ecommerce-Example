import React from 'react'
import { Link } from 'react-router-dom';

const Card = ({product}) => {
    const slug = `product/${product.slug}`
    return (
        <div className="card" style={{width: "18rem", marginBottom:"30px", marginRight:"30px"}}>
        <img className="card-img-top" src={product.image} alt="Card image cap"/>
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.price}$</p>
                <Link className="link-button" to={slug}>More</Link>
            </div>
        </div>
    )
}

export default Card;