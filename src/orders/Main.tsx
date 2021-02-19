import React, {SyntheticEvent, useEffect, useState, useRef, PropsWithRef} from 'react';
import { Redirect } from 'react-router-dom';
import * as uuid from 'uuid';
import {Product} from "../interfaces/product";

const Mainsy = () => {
    const [getid, setGetid] = useState('');
    const [temp, setTemp] = useState('');




    // To set redirecting. For example, after adding product, go to listing products
    const [redirect, setRedirect] = useState(false);
    const [redir, setRedir] = useState(false);

        const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        // if success, redirect to products listing table
        setRedirect(true);
    }

    const getorder = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:8000/orders/productsmail/${getid}`);
        const data = await response.json();
        console.log(data)
        setTemp(data[0].order_id);


        // if success, redirect to products listing table
        setRedir(true);
    }

    if(redirect) {
        return <Redirect to={`/orders/productsmail/${getid}`} />
    }

     if(redir) {
        return <Redirect to={`/orders/checkout/${temp}`} />
    }



    const del = async (email: string) => {

            setGetid(email);


        // return <Redirect to={`/orders/productsmail/${email}`} />
        }

    // const geto = async (idd: string) => {
    //
    //         setGetid(idd);
    //
    //
    //     // return <Redirect to={`/orders/productsmail/${email}`} />
    //     }





    return (
        <div>

            <div className="container">
          <div className="py-5 text-center">
            <img className="d-block mx-auto mb-4" src="/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72"
                 height="57"/>
              <h2>Single Order </h2>
              {/*<p className="lead">Below is an example form built entirely with Bootstrap’s form controls. Each required*/}
              {/*  form group has a validation state that can be triggered by attempting to submit the form without*/}
              {/*  completing it.</p>*/}
          </div>
             </div>


                <div className="col-md-7 col-lg-8">
              <h4 className="mb-3">Services:</h4>

                      <a href={`/orders/products/create`} className="btn btn-outline-secondary"
                                   // onClick={e => add(props.match.params.id)}
                                > Create an Order </a>







              <form className="needs-validation" onSubmit={submit}>



                  {/*  Phone field*/}
                <div className="row g-3">
                  <div className="col-sm-6">
                    <label htmlFor="firstName" className="form-label">Cancel an Order</label>
                    <input type="text" className="form-control" name="phone" placeholder=""
                            onChange={e => del(e.target.value)}
                           required/>
                      <div className="invalid-feedback">
                        Valid first name is required.
                      </div>
                  </div>
                </div>

                  {/*  Customer ID field*/}
                    <div className="row g-3">


                        <button className="btn btn-outline-secondary">Cancel</button>
                </div>
              </form>

                    <form className="needs-validation" onSubmit={getorder}>



                  {/*  Phone field*/}
                <div className="row g-3">
                  <div className="col-sm-6">
                    <label htmlFor="firstName" className="form-label">Get an Order</label>
                    <input type="text" className="form-control" name="phone" placeholder=""
                            onChange={e => del(e.target.value)}
                           required/>
                      <div className="invalid-feedback">
                        Valid first name is required.
                      </div>
                  </div>
                </div>

                  {/*  Customer ID field*/}
                    <div className="row g-3">


                        <button className="btn btn-outline-secondary">Get Order</button>
                </div>
              </form>


                </div>


        </div>
    );
};

export default Mainsy;