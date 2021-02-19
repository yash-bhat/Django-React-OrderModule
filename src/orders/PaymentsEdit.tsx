import React, {PropsWithRef, SyntheticEvent, useRef, useState} from 'react';
import { Redirect } from 'react-router-dom';
import * as uuid from "uuid";
import {Item} from "../interfaces/item";
import {Payment} from "../interfaces/payment";

const PaymentsEdit = (props: PropsWithRef<any>) => {
    const [payment_method, setPayment_method] = useState('');
    const [card_number, setCard_number] = useState('');
    const [bill_addr1, setBilling_addr1] = useState('');
    const [bill_addr2, setBilling_addr2] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [zipcode, setZipcode] = useState('');
    const temp = useRef(uuid.v4());
    const id = temp.current

    const [lis, setLis] = useState([]);

    const opts = [
        { value: '0', label: '' },
  { value: '100', label: 'In-Store Pickup' },
  { value: '50', label: 'Curbside Delivery' },
  { value: '60', label: 'Ship to Home' },
  { value: '20', label: 'Uber Eats' }
    ];


    // To set redirecting. For example, after adding product, go to listing products
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        // console.log(title,image);
        await fetch(`http://localhost:8000/orders/payments/${props.match.params.id2}`, {
            method: 'POST',
            // Since HTTP request, we need to work with json
            headers: {'Content-Type': 'application/json'},
            // to convert a JavaScript object or value to a JSON string
            // to update in backend
            body: JSON.stringify({
                id,
                payment_method,
                card_number,
                bill_addr1,
                bill_addr2,
                state,
                city,
                zipcode
            })
        });

        const payment_response = await fetch(`http://localhost:8000/orders/payments/${props.match.params.id2}`);
        const payment_data = await payment_response.json();

        // get sum of msgCount prop across all objects in array

        console.log(payment_data)
        setLis(payment_data);

        // if success,  to products listing table
        setRedirect(false);
    }

    const onDropdownChange = (e: any) => {
        // console.log(e.target.value)
       setCard_number(e.target.value)
    }

    if(redirect) {
        return <Redirect to={`/orders/products/paymentsmore/${props.match.params.id2}`}/>
    }

    return (
        <div>
        {/*<Wrapper>*/}

        <div className="container">
                        <div className="py-5 text-center">
                            <img className="d-block mx-auto mb-4" src="/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72"
                                 height="57"/>
                            <h2>Make Payment</h2>
                            {/*<p className="lead">Below is an example form built entirely with Bootstrap’s form controls. Each required*/}
                            {/*    form group has a validation state that can be triggered by attempting to submit the form without*/}
                            {/*    completing it.</p>*/}
                        </div>
                    </div>

            <div className="row g-3">

                        <div className="col-md-5 col-lg-4 order-md-last">

                    {/*<h4 className="d-flex justify-content-between align-items-center mb-3">*/}
                    {/*    <span className="text-muted">Your cart</span>*/}
                    {/*    <span className="badge bg-secondary rounded-pill">3</span>*/}
                    {/*</h4>*/}


            {lis.map(
                    (i: Payment) => {
                    return (<div>
            <ul className="list-group mb-3">

                <li className="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                        <h6 className="my-0">{i.card_number}</h6>
                        <small className="text-muted">{i.bill_addr1}{i.bill_addr2}</small>
                    </div>
                    <span className="text-muted">{i.state}</span>
                    <span className="text-muted">{i.city}</span>
                    <span className="text-muted">{i.zipcode}</span>
                </li>
            </ul>
                        </div>
                        )
                })}
                        </div>

                <div className="col-md-7 col-lg-8">
                        <h4 className="mb-3">Billing address</h4>


            <form onSubmit={submit}>
                <div className="form-group">
                    <label> Payment Method</label>
                    {/* Every time this input changes, we will set the title */}
                    <input type="text" className="form-control" name="title"
                    onChange={e => setPayment_method(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label> Delivery Method</label>
                    {/* Every time this input changes, we will set the title */}
                    <select className="form-control"

                                          onChange={e => onDropdownChange(e)} >
                                         {opts.map((option) => (
                                            <option value={option.label} >{option.label}</option>
                                        ))}
                                    </select>
                </div>
                <div className="form-group">
                    <label> Billing Addr1</label>
                    {/* Every time this input changes, we will set the title */}
                    <input type="text" className="form-control" name="title"
                    onChange={e => setBilling_addr1(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label> Billing Addr2</label>
                    {/* Every time this input changes, we will set the title */}
                    <input type="text" className="form-control" name="title"
                    onChange={e => setBilling_addr2(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label> State</label>
                    {/* Every time this input changes, we will set the title */}
                    <input type="text" className="form-control" name="title"
                    onChange={e => setState(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label> City</label>
                    <input type="text" className="form-control" name="image"
                            // default makes value from the backend to show in the field
                    onChange={e => setCity(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label> Zipcode</label>
                    <input type="text" className="form-control" name="image"
                            // default makes value from the backend to show in the field
                    onChange={e => setZipcode(e.target.value)}
                    />
                </div>

                {/*<a href={`/orders/products/shippings/${temp.current}`} className="btn btn-sm btn-outline-secondary"*/}
                {/*                   // onClick={e => add(props.match.params.id)}*/}
                {/*                > Go to Shipping </a>*/}

                <a href={`/orders/products/paymentsmore/${props.match.params.id2}`} className="btn btn-sm btn-outline-secondary"
                                   // onClick={e => add(props.match.params.id)}
                                > Go to Shipping </a>

                <button className="btn btn-outline-secondary">Add another payment method</button>
            </form>
                </div>
            
        {/*</Wrapper>*/}
        </div>
        </div>
    );
};

export default PaymentsEdit;