import React, {useState, useEffect} from "react";
import { getmeToken, processPayment } from "./helper/paymentHelper";
import { countTotalPrice } from "../core/helper/cartHelper";
import { isAuthenticated } from "../user/helper/userApiCalls";
import { cartEmpty } from "../core/helper/cartHelper";
import { createOrder } from "./helper/orderHelper";
import { useNavigate } from "react-router";
import DropIn from "braintree-web-drop-in-react"

const PaymentAuth = ({
    products,
    shipmentInfo,
    reload = undefined,
    setReload = (f) => f,
  }) => {
    const [importedProducts, setImportedProdcuts] = useState(products);
    const [info, setInfo] = useState({
      loading: false,
      success: false,
      clientToken: null,
      error: "",
      instance: {},
    });
  
    const {phone, adress, name, surname, postalCode} = shipmentInfo
    const userId = isAuthenticated().user.id;
    const token = isAuthenticated().token;
    const navigate = useNavigate();

    const getToken = (userId, token) => {
      getmeToken(userId, token)
      .then((response) => {
          const clientToken = response.clientToken
          setInfo({clientToken})
      })
    };
  
    useEffect(() => {
      getToken(userId, token);
    }, []);
    
    const showOrderedProducts = (products) => {
        let backendProductNames = ``
        for (let i = 0 ; i < products.length; i++) {
            backendProductNames += `${products[i].name}: ${products[i].amount}, `
        }
        return backendProductNames;
    }

    const onPurchase = () => {
      setInfo({ loading: true });
      let nonce;
      let getNonce = info.instance.requestPaymentMethod().then((data) => {
        nonce = data.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: countTotalPrice(importedProducts),
        };
        processPayment(userId, token, paymentData)
          .then((response) => {
            if (response.error) {
            } else {
              setInfo({ ...info, success: response.success, loading: false });
              console.log("PAYMENT SUCCESS");
  
              const orderData = {
                products: showOrderedProducts(importedProducts),
                transaction_id: response.transaction.id,
                amount: countTotalPrice(importedProducts),
                adress:adress,
                postal_code: postalCode,
                phone:phone,
                name:name,
                surname:surname
              };
              createOrder(userId, token, orderData)
                .then((response) => {
                  if (response.error) {

                  } else {
                    if (response.success == true) {
                      console.log("ORDER PLACED!!");
                    }
                  }
                })
                .catch((error) => {
                  setInfo({ loading: false, success: false });
                  console.log("Order FAILED", error);
                });
              cartEmpty(() => {
                console.log("Did we got a crash?");
              });
              navigate('/success')
            }
          })
          .catch((error) => {
            setInfo({ loading: false, success: false });
            console.log("PAYMENT FAILED", error);
          });
      });
    };
  
    const showbtnDropIn = () => {
      return (
        <div>
          {info.clientToken !== null && products.length > 0
            ? (
              <div>
                <DropIn
                  options={{ authorization: info.clientToken }}
                  onInstance={(instance) => (info.instance = instance)}
                >
                </DropIn>
                <button
                  onClick={onPurchase}
                  className="btn btn-block btn-success"
                >
                  Buy Now
                </button>
              </div>
            )
            : (
              <h3>Please login first or add something in cart</h3>
            )}
        </div>
      );
    };
  
    return (
      <div>
        <h3>Your bill is $ {countTotalPrice(products)}</h3>
        {showbtnDropIn()}
      </div>
    );
  };
  
  export default PaymentAuth;
  