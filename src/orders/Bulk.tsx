import React, {SyntheticEvent, useEffect, useState} from 'react';
// import Wrapper from "./Wrapper";
import {Product} from "../interfaces/product";
import {Link, Redirect} from "react-router-dom";

const Bulk = () => {

    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();



        // console.log(title,image);
        await fetch('http://localhost:8000/orders/bulk', {
            method: 'POST'
        });

        // if success, redirect to products listing table
        setRedirect(true);
    }

    if(redirect) {
        return <Redirect to={'/orders/products'} />
    }

    return (
        <div>

            <div className="container">
          <div className="py-5 text-center">
            <img className="d-block mx-auto mb-4" src="/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72"
                 height="57"/>
          </div>
             </div>


                <div className="col-md-7 col-lg-8">
              <h4 className="mb-3">Bulkl request</h4>
              <form className="needs-validation" onSubmit={submit}>

                  <button className="btn btn-outline-secondary">Request</button>



              </form>
                    </div>



        </div>
    );
};

export default Bulk;