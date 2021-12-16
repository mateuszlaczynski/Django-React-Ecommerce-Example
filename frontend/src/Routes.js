import React from 'react'
import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import Home from './core/Home';
import Detail from './core/Detail';
import Product from './core/Product';
import Signin from './user/Signin';
import Signup from './user/Signup';
import Error from './auth/Error';
import Signout from './user/Signout';
import Cart from './core/Cart';
import Checkout from './core/Checkout';
import Success from './core/Success';

const Routes = () => {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" element={<Home/>}/>
          <Route path="/" element={<Detail/>}>
            <Route path="product/:slug" element={<Product/>}/>
          </Route>
          <Route path="/cart" element={<Cart/>}></Route>
          <Route path="/checkout" element={<Checkout/>}></Route>
          <Route path="/success" element={<Success/>}></Route>
          <Route path="/signin" element={<Signin/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/signout" element={<Signout/>}></Route>
          <Route path="*" element={<Error/>}></Route>
        </Switch>
      </BrowserRouter>
    )
}

export default Routes;