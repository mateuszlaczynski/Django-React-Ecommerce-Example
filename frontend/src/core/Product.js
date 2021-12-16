import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router';
import { getProductDetail, buttonCheckPlus, buttonCheckMinus  } from './helper/productHelper';
import { addToCart } from './helper/cartHelper';
import Base from './Base';

const Product = () => {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [amount, setAmount] = useState(1);
    
    const { slug } = useParams()
    const navigate = useNavigate();

    const loadProductData = (slug) => {
        getProductDetail(slug)
        .then((data) => {
            setLoading(false);
            setProduct(data)
        })
        .catch((error) => console.log(error))
    }

    useEffect(() => {
        loadProductData(slug)
    }, [])

    const addProductToCart = (product, amount) => {
        addToCart(product, amount);
        navigate("/cart")
    }

    const incrementAmount = () => {
        if (amount < product.stock) {
            let tempAmount = amount+1;
            setAmount(tempAmount);
        };
    };

    const decrementAmount = () => {
        if (amount > 1) {
            let tempAmount = amount-1;
            setAmount(tempAmount);
        };
    };
    
    return (
        <Base title={product.name}>
            {loading && <h1>Loading...</h1>}
            {!loading && (
                <div className="detail-container">
                    <h1>{product.name}</h1>
                    <img className="detail-image" src={product.image} alt={product.name}></img>
                    <h2>${product.price}, {product.stock} left</h2>

                    <div className="plus-minus-button-container">

                        <button disabled={buttonCheckMinus(product,amount)} className="plus-minus-button" onClick={decrementAmount}>-</button>
                        {amount}
                        <button disabled={buttonCheckPlus(product,amount)} className="plus-minus-button" onClick={incrementAmount}>+</button>
                        
                        <button style={{marginLeft:"15px"}} className="link-button" onClick={() => addProductToCart(product,amount)}>Add to cart</button>
                    </div>
                    <p style={{textAlign:'justify', fontSize:"168x"}}>{product.description}</p>
                </div>
            )}
        </Base>
    )
}

export default Product;