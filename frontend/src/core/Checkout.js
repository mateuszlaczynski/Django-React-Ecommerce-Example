import React, {useState, useEffect} from 'react'
import Base from './Base'
import { isAuthenticated } from '../user/helper/userApiCalls';
import { loadCart } from './helper/cartHelper';
import { countTotalPrice } from './helper/cartHelper';
import PaymentAuth from '../auth/PaymentAuth';

const Checkout = () => {
    const [products, setProducts] = useState([]);
    const [values, setValues] = useState({
        adress:"",
        postalCode:"",
        phone:"",
        name:"",
        surname:"",
    });
    const [payment, setPayment] = useState(false)
    const [dataError, setDataError] = useState(false) 

    const { email, adress, postalCode, phone, name, surname } = values;
    
    useEffect(() => {
        setProducts(loadCart());
        setUserEmail(isAuthenticated());

    }, [])

    const handleChange = (field) =>
    (event) => {
        setValues({...values, [field]: event.target.value})
        setDataError(false)
    }
    
    const setUserEmail = (session) => {
        if (session) {
            const user = isAuthenticated().user
            setValues({...values, email: user.email})
        }
        
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values});
        if (!email || !adress || !postalCode || !phone || !name || !surname) {
            setDataError(true);
            setValues({
                email:email,
                adress:adress,
                postalCode:postalCode,
                phone:phone,
                name:name,
                surname:surname
            }) 
        } else {
            setPayment(true)
        }
    }

    const checkoutForm = () => {
        return (
           <>
               <h2 style={{paddingTop:"10px", paddingLeft:"20px"}}>Shipment info</h2><hr/>
               <form style={{padding:"20px"}}>
                   <div className="form-group">
                   <label>Name</label>
                   <input
                       name="name"
                       value={name}
                       onChange={handleChange("name")}
                       className="form-control"
                       type="text"
                   />
                   </div>
                    <div className="form-group">
                   <label>Surname</label>
                   <input
                       name="surname"
                       value={surname}
                       onChange={handleChange("surname")}
                       className="form-control"
                       type="text"
                   />
                   </div>
                   <div className="form-group">
                   <label>Adress</label>
                   <input
                       name="adress"
                       value={adress}
                       onChange={handleChange("adress")}
                       className="form-control"
                       type="name"
                   />
                   </div>
                   <div className="form-group">
                   <label>Postal code</label>
                   <input
                       name="postalCode"
                       value={postalCode}
                       onChange={handleChange("postalCode")}
                       className="form-control"
                       type="text"
                   />
                   </div>
                   <div className="form-group">
                   <label>Phone</label>
                   <input
                       name="phone"
                       value={phone}
                       onChange={handleChange("phone")}
                       className="form-control"
                       type="text"
                   />
                   </div>
                   <button
                   className="submit-button"
                   onClick={onSubmit}
                   >
                   Submit
                   </button>
               </form>
           </>
           )
       }

    const paymentForm = () => {
        return (
            <>
                <div className="row">
                    <div className="col-6" style={{borderRightStyle:"solid"}}>
                        <h3>Shipment info:</h3>
                        <p>Name: {name} {surname} <br/>
                        Adress: {adress} {postalCode} <br/>
                        Email: {email} <br/>
                        Phone number: {phone} <br/>
                        Total price: {countTotalPrice(products)}$</p>
                        <button style={{marginTop:"0px", width:"100px"}} onClick={() => setPayment(false)} className="submit-button">Edit</button>
                    </div>
                    <div className="col-6">
                        <PaymentAuth products={products} shipmentInfo={values}/>
                    </div>
                </div>

            </>
        )
    }

    return (
        <Base title="Checkout">
            {!isAuthenticated() && <h1>You need to log in first!</h1>}
            {loadCart() && isAuthenticated() && (<>
                {!payment && checkoutForm()}
                {dataError && <h6 className="error-message">Incorrect data, check all fields again!</h6>}
                {payment && paymentForm()}
            </>)}
            {!loadCart() && <h1>Your cart is empty! Unable to checkout!</h1>}

        </Base>
    )
}
export default Checkout;