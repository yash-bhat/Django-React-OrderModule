import React, {SyntheticEvent, useEffect, useState, useRef} from 'react';
import { Redirect } from 'react-router-dom';
import * as uuid from 'uuid';

const ProductsCreate = () => {
    const [phone, setPhone] = useState('');
    const [customer_id, setCustomer_id] = useState('');
    const [name, setName] = useState('');
    // const [order_id, setOrder_id] = useState('');
    const temp = useRef(uuid.v4());
    const order_id = temp.current



    // useEffect(() => {
    //
    //     setOrder_id(uuid.v4());
    //
    // });

    // To set redirecting. For example, after adding product, go to listing products
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();



        // console.log(title,image);
        await fetch('http://localhost:8000/orders/products', {
            method: 'POST',
            // Since HTTP request, we need to work with json
            headers: {'Content-Type': 'application/json'},
            // to convert a JavaScript object or value to a JSON string
            // to update in backend
            body: JSON.stringify({
                order_id,
                name,
                phone,
                customer_id
            })
        });

        // if success, redirect to products listing table
        setRedirect(true);
    }

    if(redirect) {
        return <Redirect to={`/orders/products/items/${temp.current}`} />
    }

    return (
        <div>

            <div className="container">
          <div className="py-5 text-center">
            <img className="d-block mx-auto mb-4" src="public/ecom.jpeg" alt="" width="72"
                 height="57"/>
              <h2>Enter Details</h2>
              {/*<p className="lead">Below is an example form built entirely with Bootstrap’s form controls. Each required*/}
              {/*  form group has a validation state that can be triggered by attempting to submit the form without*/}
              {/*  completing it.</p>*/}
          </div>
             </div>


                <div className="col-md-7 col-lg-8">
              <h4 className="mb-3">Billing address</h4>



              <form className="needs-validation" onSubmit={submit}>

                {/*  Customer Name field*/}
                <div className="row g-3">
                  <div className="col-sm-6">
                    <label htmlFor="firstName" className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" placeholder=""
                            onChange={e => setName(e.target.value)}
                           required/>
                      <div className="invalid-feedback">
                        Valid first name is required.
                      </div>
                  </div>
                </div>

                  {/*  Phone field*/}
                <div className="row g-3">
                  <div className="col-sm-6">
                    <label htmlFor="firstName" className="form-label">Phone</label>
                    <input type="text" className="form-control" name="phone" placeholder=""
                            onChange={e => setPhone(e.target.value)}
                           required/>
                      <div className="invalid-feedback">
                        Valid first name is required.
                      </div>
                  </div>
                </div>

                  {/*  Customer ID field*/}
                    <div className="row g-3">
                    <div className="col-sm-6">
                    <label htmlFor="firstName" className="form-label">Customer ID / Email</label>
                    <input type="text" className="form-control" name="customer_id" placeholder=""
                            onChange={e => setCustomer_id(e.target.value)}
                           required/>
                      <div className="invalid-feedback">
                        Valid first name is required.
                      </div>
                    </div>

                        <button className="btn btn-outline-secondary">Save</button>


                </div>
              </form>
                </div>


        </div>
    );
};

export default ProductsCreate;