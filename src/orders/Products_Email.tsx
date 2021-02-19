import React, {PropsWithRef, useEffect, useState} from 'react';
// import Wrapper from "./Wrapper";
import {Product} from "../interfaces/product";
import {Link} from "react-router-dom";

const ProductsMail = (props: PropsWithRef<any>) => {

    const [products, setProducts] = useState([]);

    
    useEffect(() => {
        // asynchronous function
        (
            async () => {

            const response = await fetch(`http://localhost:8000/orders/productsmail/${props.match.params.mail}`);
            const data = await response.json();
            setProducts(data);
        }
    )();
    }, []);

    const del = async (order_id: number) => {
        if(window.confirm('Are you sure you want to delete this product?')) {
            await fetch(`http://localhost:8000/orders/products/${order_id}`, {
                method: 'DELETE'
            });

            setProducts(products.filter((p: Product) => p.order_id != order_id));
        }

    }

    return (
        <div className="container">
        <h2>Section title</h2>
            <div className="table-responsive">
              <table className="table table-striped table-sm">
                <thead>
                <tr>
                  <th>CustomerID</th>
                  <th>Phone</th>
                  <th>Status</th>
                    <th></th>
                  {/*<th>Tax</th>*/}
                  {/*<th>Total</th>*/}
                </tr>
                </thead>
                <tbody>
                {products.map(
                    (p: Product) => {
                    return (
                       <tr key={p.order_id}>
                           <td>{p.customer_id}</td>
                           <td>{p.phone}</td>
                           <td>{p.status}</td>
                           <td>
                               <div className="btn-group mr-2">
                                   {/*<Link to={`/orders/products/items/${p.order_id}`} className="btn btn-sm btn-outline-secondary"> Edit </Link>*/}
                                   <a href="#" className="btn btn-sm btn-outline-secondary"
                                   onClick={() => del(p.order_id)}> Delete </a>
                               </div>
                           </td>
                       </tr>
                    )
                })}

                </tbody>
              </table>

                <Link to={'/main'} className="btn btn-sm btn-outline-secondary"> Home </Link>
            </div>
        </div>
    );
};

export default ProductsMail;