import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Checkout from "./orders/Checkout";
import ProductsCreate from "./orders/ProductsCreate";
import AddItems from "./orders/AddItems";
import ProductsEdit from "./orders/ProductsEdit";
import PaymentsEdit from "./orders/PaymentsEdit";
import ShippingsEdit from "./orders/ShippingsEdit";
import Bulk from "./orders/Bulk";
import Products from "./orders/Products";
import PaymentsMore from "./orders/PaymentsMore";
import Checkout_Final from "./orders/Checkout_Final";
import Mainsy from "./orders/Main";
import ProductsMail from "./orders/Products_Email";

function App() {
  return (
      <div className="App">


            <BrowserRouter>
                {/* exact makes sure it doesn't confuse with other similar paths*/}
                <Route path='/main' exact component={Mainsy}/>
                <Route path='/orders/products' exact component={Products}/>
                <Route path='/orders/productsmail/:mail' exact component={ProductsMail}/>
                <Route path='/orders/bulk' exact component={Bulk}/>
                <Route path='/orders/checkout/:id4' exact component={Checkout_Final}/>
                <Route path='/orders/products/create' exact component={ProductsCreate}/>
                <Route path='/orders/products/items/:id' exact component={AddItems}/>
                {/*<Route path='/orders/products/check' exact component={AddItems}/>*/}
                <Route path='/orders/products/payments/:id2' exact component={PaymentsEdit}/>
                <Route path='/orders/products/paymentsmore/:id5' exact component={PaymentsMore}/>
                <Route path='/orders/products/shippings/:id3' exact component={ShippingsEdit}/>
            </BrowserRouter>




        </div>

      );
}

export default App;