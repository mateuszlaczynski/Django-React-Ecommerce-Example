import React, {useState, useEffect} from 'react'
import { loadCart, removeFromCart, decrementItemAmount, incrementItemAmount } from './helper/cartHelper';
import Base from './Base';
import { buttonCheckPlus } from './helper/productHelper';
import { Link, useNavigate } from 'react-router-dom';
import { countTotalPrice } from './helper/cartHelper';

const Cart = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(false)

    const navigate = useNavigate();

    useEffect(()=>{
        setProducts(loadCart());
        setLoading(false)
    },[reload])

    const mapProducts = (products) => {
        return (
            <>
                <h1>Total price: {countTotalPrice(products)}$</h1>
                {products.map((product) => {
                    return (
                        <>
                        <hr/>
                            <div className="cart-detail">
                                <img onClick={() => navigate(`/product/${product.slug}`)} className="cart-detail-img" src={product.image} alt="Card image cap"/>
                                <h4 onClick={() => navigate(`/product/${product.slug}`)} className="cart-tag">{product.name} - {product.price}$ 
                                / total: {product.price * product.amount}$</h4>

                                <button className="plus-minus-button" onClick={() => decrementAmount(product)}>-</button>
                                <h4>{product.amount}</h4>
                                <button disabled={buttonCheckPlus(product, product.amount)} className="plus-minus-button" onClick={() => incrementAmount(product)}>+</button>
                                <button className="delete-button" onClick={() => removeItem(product)}>X</button>
                            </div>

                            
                        </>
                    )
                })}
                <hr/>
                <Link to="/checkout" style={{display:'flex', justifyContent:'flex-end'}}>
                    <button style={{marginBottom:"15px", width:'100px'}} className="submit-button">
                        Checkout
                    </button>
                </Link>
                
            </>
        )
    }

    const decrementAmount = (product) => {
        decrementItemAmount(product);
        setReload(!reload);
    }

    const incrementAmount = (product) => {
        incrementItemAmount(product);
        setReload(!reload);
    }

    const removeItem = (product) => {
        removeFromCart(product);
        setReload(!reload);
    }

    return (
        <Base title="Cart">
            {loading && <h1>Loading...</h1>}
            {!loading && products.length < 1 && <h1>Your cart is empty.</h1>}
            {!loading && mapProducts(products)}
        </Base>
    )
}

export default Cart;