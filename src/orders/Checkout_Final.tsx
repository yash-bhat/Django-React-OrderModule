import React, {PropsWithRef, useEffect, useState, useLayoutEffect} from 'react';
// import Wrapper from "./Wrapper";
import {Product} from "../interfaces/product";
import {Link} from "react-router-dom";
import {Item} from "../interfaces/item";
import {Payment} from "../interfaces/payment";
import {Shipping} from "../interfaces/shipping";

const Checkout_Final = (props: PropsWithRef<any>) => {

    const [orders, setOrders] = useState([]);
    const [items, setItems] = useState([]);
    const [payments, setPayments] = useState([]);
    const [shippings, setShippings] = useState([]);

    useEffect(() => {

    // asynchronous function

   (

       async () => {



           const payment_response = await fetch(`http://localhost:8000/orders/paymentsonid/${props.match.params.id4}`);
           const payment_data = await payment_response.json();
           // console.log('payment',payment_data);
           setPayments(payment_data);
           console.log('payment', payment_data);

           const order_response = await fetch(`http://localhost:8000/orders/products/${payment_data[0].payment_order}`);
           console.log(order_response)
           const order_data = await order_response.json();
           setOrders(order_data);
           console.log('order', order_data);

           const item_response = await fetch(`http://localhost:8000/orders/items/${payment_data[0].payment_order}`);
           const item_data = await item_response.json();
           setItems(item_data);
           console.log('item', item_data);

           const shipping_response = await fetch(`http://localhost:8000/orders/shippings/${props.match.params.id4}`);
           const shipping_data = await shipping_response.json();
           setShippings(shipping_data);
           console.log('shipping', shipping_data);
           // initilaly to check in the browser

           //
           //     Promise.all([payment_data, order_data, item_data, shipping_data]).then((values) => {
           //         setPayments(values[0]);
           //         setOrders(values[1]);
           //         setItems(values[2]);
           //         setShippings(values[3]);
           //     console.log(orders,items,payments,shippings);
           //     });
       }

           )();
}, []);

    const del = async () => {
        if(window.confirm('Are you sure you want to delete this order?')) {
            await fetch(`http://localhost:8000/orders/products/${props.match.params.id4}`, {
                method: 'DELETE'
            });

            setOrders(orders.filter((p: Product) => p.order_id != props.match.params.id4));
        }

    }

return (
        <div className="container">
        <h2>CHECKOUT</h2>
            <br/>
            <div className="table-responsive">
              <table className="table table-striped table-sm">


                <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Created At</th>
                  <th>Modified At</th>
                </tr>
                </thead>
                  <tbody>
                {items.map(
                    (i: Item) => {
                    return (
                       <tr key={i.id}>
                          <td>{i.item_name}</td>
                          <td>{i.quantity}</td>
                          <td>{i.price}</td>
                          <td>{i.created_at}</td>
                          <td>{i.modified_at}</td>
                       </tr>
                    )
                })}
                </tbody>

                  <br/>
                  <br/>
                <h4>Payment Details</h4>
                <thead>
                <tr>
                  <th>Payment Method Name</th>
                  <th>Card Number</th>
                  <th>Address</th>
                  <th>State</th>
                  <th>City</th>
                  <th>Zip</th>
                    <th>Created At</th>
                  <th>Modified At</th>
                </tr>
                </thead>
                  <tbody>

                {payments.map(
                    (p: Payment) => {
                    return (
                       <tr key={p.id}>
                          <td>{p.payment_method}</td>
                          <td>{p.card_number}</td>
                          <td>{p.bill_addr1}</td>
                          <td>{p.state}</td>
                          <td>{p.city}</td>
                          <td>{p.zipcode}</td>
                          <td>{p.created_at}</td>
                          <td>{p.modified_at}</td>
                       </tr>
                    )
                })}
                </tbody>

                  <br/>
                  <br/>
                <h4>Shipping Details</h4>
                <thead>
                <tr>
                  <th>Shipping Charges</th>
                  <th>Address</th>
                  <th>State</th>
                  <th>City</th>
                  <th>Zip</th>
                    <th>Created At</th>
                  <th>Modified At</th>
                </tr>
                </thead>
                  <tbody>

                {shippings.map(
                    (s: Shipping) => {
                    return (
                       <tr key={s.id}>
                          <td>{s.ship_charge}</td>
                          <td>{s.bill_addr1}</td>
                           <td>{s.state}</td>
                          <td>{s.city}</td>
                          <td>{s.zipcode}</td>
                          <td>{s.created_at}</td>
                          <td>{s.modified_at}</td>
                       </tr>
                    )
                })}
                </tbody>
                  <p>{orders.toString()}</p>
                {/*{orders[0].map(*/}
                {/*    (o: Product) => {*/}
                {/*    return (*/}
                {/*       <tr key={o.order_id}>*/}
                {/*          <td>{o.customer_id}</td>*/}
                {/*       </tr>*/}
                {/*    )*/}
                {/*})}*/}

              </table>
                <br/>
                <Link to={'#'} className="btn btn-sm btn-outline-secondary"> Done </Link>
                <a href="#" className="btn btn-sm btn-outline-secondary"
                                   onClick={() => del()} > Cancel Order </a>

            </div>
        </div>
    );
};

export default Checkout_Final;