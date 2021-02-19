import React, {PropsWithRef, SyntheticEvent, useEffect, useState} from 'react';
import { Redirect } from 'react-router-dom';
import Select from 'react-select';
import {Product} from "../interfaces/product";
import {Item} from "../interfaces/item";

const ItemsCreate = (props: PropsWithRef<any>) => {
    const [item_name, setItem_name] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [lis, setLis] = useState([]);
    const [status, setStatus] = useState('');


    // To set redirecting. For example, after adding product, go to listing products
    const [redirect, setRedirect] = useState(false);

  const opts = [
        { value: '0', label: '' },
  { value: '100', label: 'idli' },
  { value: '50', label: 'dosa' },
  { value: '60', label: 'vada' },
  { value: '20', label: 'sambhar' }
    ];

  useEffect(() => {
        // asynchronous function
        (
            async () => {


                setStatus('InProgress')

            await fetch(`http://localhost:8000/orders/productsupdate/${props.match.params.id}`, {
            method: 'PUT',
            // Since HTTP request, we need to work with json
            headers: {'Content-Type': 'application/json'},
            // to convert a JavaScript object or value to a JSON string
            // to update in backend
            body: JSON.stringify({
                status
            })
        });
        }
    )();
    }, []);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        // console.log(title,image);
        await fetch(`http://localhost:8000/orders/items/${props.match.params.id}`, {
            method: 'POST',
            // Since HTTP request, we need to work with json
            headers: {'Content-Type': 'application/json'},
            // to convert a JavaScript object or value to a JSON string
            // to update in backend
            body: JSON.stringify({
                item_name,
                quantity,
                price
            })
        });

        const item_response = await fetch(`http://localhost:8000/orders/items/${props.match.params.id}`);
        const item_data = await item_response.json();

        // get sum of msgCount prop across all objects in array
        // const msgTotal = item_data.reduce((prev, cur) => prev + cur.price, 0);

        console.log(item_data)
        setLis(item_data);

        // if success, redirect to products listing table
        setRedirect(false);
    }


    useEffect( () => {

        let newPrice: any = opts.find( p  => p.label == item_name);
        // console.log(newPrice);
        setPrice(newPrice.value);

    }, [item_name]);


    const onDropdownChange = (e: any) => {
        // console.log(e.target.value)
       setItem_name(e.target.value)
    }

    // const add =  async (res: any) => {
    //     const item_response = await fetch(`http://localhost:8000/orders/items/${res}`);
    //     const item_data = await item_response.json();
    //     console.log(item_data)
    //     setLis(item_data);
    //
    // }

    if(redirect) {
        return <Redirect to='#'/>
    }

    return (
                <div>

                    <div className="container">
                        <div className="py-5 text-center">
                            <img className="d-block mx-auto mb-4" src="/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72"
                                 height="57"/>
                            <h2>Add Items</h2>
                            {/*<p className="lead">Below is an example form built entirely with Bootstrap’s form controls. Each required*/}
                            {/*    form group has a validation state that can be triggered by attempting to submit the form without*/}
                            {/*    completing it.</p>*/}
                        </div>
                    </div>


                    <div className="row g-3">

                        <div className="col-md-5 col-lg-4 order-md-last">

                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-muted">Your cart</span>

                        <span className="badge bg-secondary rounded-pill">3</span>\


                    </h4>
                            <h5>Item  ---------------   Price    ---------------   Quantity</h5>


            {lis.map(
                    (i: Item) => {
                    return (<div>
            <ul className="list-group mb-3">



                <li className="list-group-item d-flex justify-content-between lh-sm">

                    <div>
                        <h6 className="my-0">{i.item_name}</h6>
                        {/*<small className="text-muted">Brief description</small>*/}
                    </div>
                    <span className="text-muted">{i.price}</span>
                    <span className="text-muted">{i.quantity}</span>
                </li>
            </ul>
                        </div>
                        )
                })}
                        </div>





                    <div className="col-md-7 col-lg-8">
                        <h4 className="mb-3">Billing address</h4>
                        <form className="needs-validation" onSubmit={submit}>

                            {/*  Item Name field*/}
                            <div className="row g-3">
                                <div className="col-sm-6">
                                    <label htmlFor="itemName" className="form-label">Item Name</label>
                                    {/*<Select className="mt-4 col-md-6 col-offset-4" name="item_name"*/}
                                    {/*        onChange={e => setItem_name(opts.label)}*/}
                                    {/*        options={options}*/}
                                    {/*    />*/}

                                    <select className="form-control"

                                          onChange={e => onDropdownChange(e)} >
                                         {opts.map((option) => (
                                            <option value={option.label} >{option.label}</option>
                                        ))}
                                    </select>


                                    <div className="invalid-feedback">
                                        Valid first name is required.
                                    </div>
                                </div>
                            </div>

                            {/*  Price field*/}
                            <div className="row g-3">
                                <div className="col-sm-6">
                                    <label htmlFor="firstName" className="form-label">Price</label>
                                    {/*<input readOnly type="text" className="form-control" name="price" value={item_name}  defaultValue={item_name}*/}
                                    {/*/>*/}
                                    <input readOnly type="text" className="form-control" name="title"
                                    value={price}/>
                                    <div className="invalid-feedback">
                                        Valid first name is required.
                                    </div>
                                </div>
                            </div>

                            {/*  Quantity field*/}
                            <div className="row g-3">
                                <div className="col-sm-6">
                                    <label htmlFor="firstName" className="form-label">Quantity</label>
                                    <input type="text" className="form-control" name="quantity" placeholder=""
                                           onChange={e => setQuantity(e.target.value)}
                                           required/>
                                    <div className="invalid-feedback">
                                        Valid first name is required.
                                    </div>
                                </div>

                                <a href={`/orders/products/payments/${props.match.params.id}`} className="btn btn-outline-secondary"
                                   // onClick={e => add(props.match.params.id)}
                                > Go to Payment </a>

                                <button className="btn btn-outline-secondary">Add Items</button>


                            </div>
                        </form>
                    </div>

                </div>
                </div>
            );

};


export default ItemsCreate;