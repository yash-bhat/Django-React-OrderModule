import React, {PropsWithRef, SyntheticEvent, useEffect, useRef, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import * as uuid from "uuid";
import {Payment} from "../interfaces/payment";
import {Product} from "../interfaces/product";

const PaymentsMore = (props: PropsWithRef<any>) => {
    // const [payment_method, setPayment_method] = useState('');
    // const [card_number, setCard_number] = useState('');
    // const [bill_addr1, setBilling_addr1] = useState('');
    // const [bill_addr2, setBilling_addr2] = useState('');
    // const [state, setState] = useState('');
    // const [city, setCity] = useState('');
    // const [zipcode, setZipcode] = useState('');
    // const temp = useRef(uuid.v4());
    // const id = temp.current

    const [lis, setLis] = useState([]);


    // To set redirecting. For example, after adding product, go to listing products
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        // asynchronous function
        (
            async () => {

                const payment_response = await fetch(`http://localhost:8000/orders/payments/${props.match.params.id5}`);
            const payment_data = await payment_response.json();

            // get sum of msgCount prop across all objects in array

            console.log(payment_data)
            setLis(payment_data);
        }
    )();
    }, []);

    const del = async (order_id: number) => {

        // const payment_response = await fetch(`http://localhost:8000/orders/payments/${order_id}`);
        // const payment_data = await payment_response.json();

        // setRedirect(true);

        return <Redirect to={`/orders/checkout/${order_id}`}/>


    }






    // if(redirect) {
    //     return <Redirect to={`/orders/checkout/${p.id}`}/>
    // }

    return (
        <div className="container">
        <h2>Add shipping details</h2>
            <div className="table-responsive">
              <table className="table table-striped table-sm">
                <thead>
                <tr>
                  <th>Payment Method</th>
                  <th>Card Number</th>
                  <th>State</th>
                  <th>City</th>
                    <th>Zipcode</th>
                </tr>
                </thead>
                <tbody>
                {lis.map(
                    (p: Payment) => {
                    return (
                       <tr key={p.id}>
                           <td>{p.payment_method}</td>
                           <td>{p.card_number}</td>
                           <td>{p.state}</td>
                           <td>{p.city}</td>
                           <td>{p.zipcode}</td>
                           <td>
                               <div className="btn-group mr-2">
                                   <Link to={`/orders/products/shippings/${p.id}`} className="btn btn-sm btn-outline-secondary"> Shipping Details </Link>


                               </div>
                           </td>
                       </tr>
                    )
                })}

                <a href="#" className="btn btn-sm btn-outline-secondary"
                                   onClick={() => del(props.match.params.id5)} > Checkout </a>



                </tbody>
              </table>


            </div>
        </div>
    );
};

export default PaymentsMore;