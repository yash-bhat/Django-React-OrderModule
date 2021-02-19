import React, {PropsWithRef, SyntheticEvent, useEffect, useState} from 'react';
import { Redirect } from 'react-router-dom';

const ProductsEdit = (props: PropsWithRef<any>) => {
    const [item_name, setItem_name] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    // const [item_order, setItem_order] = useState('');

    // To set redirecting. For example, after adding product, go to listing products
    const [redirect, setRedirect] = useState(false);

    const opts = [
        { value: '0', label: '' },
  { value: '100', label: 'idli' },
  { value: '50', label: 'dosa' },
  { value: '60', label: 'vada' },
  { value: '20', label: 'sambhar' }
    ];


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

        // if success, redirect to products listing table
        setRedirect(true);
    }

    useEffect( () => {

        let newPrice: any = opts.find( p  => p.label == item_name);
        console.log(newPrice);
        setPrice(newPrice.value);

    }, [item_name]);


    const onDropdownChange = (e: any) => {
        console.log(e.target.value)
       setItem_name(e.target.value)
    }

    if(redirect) {
        return <Redirect to={`/orders/products/payments/${props.match.params.id}`}/>
    }

    return (
        <div>
        {/*<Wrapper>*/}

        <div className="py-5 text-center">

                <img className="d-block mx-auto mb-4" src="/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72"
                 height="57"/>
                <h2>Add Items</h2>
                <p className="lead">Below is an example form built entirely with Bootstrap’s form controls. Each
                    required form group has a validation state that can be triggered by attempting to submit the form
                    without completing it.</p>
            </div>

            <div className="row g-3">

                <div className="col-md-5 col-lg-4 order-md-last">

            <form onSubmit={submit}>
                <div className="form-group">
                    <label> Item Name</label>
                    {/* Every time this input changes, we will set the title */}

                    <select
                        onChange={e => onDropdownChange(e)} >
                        {opts.map((option) => (
                            <option value={option.label} >{option.label}</option>
                        ))}
                    </select>

                </div>
                <div className="form-group">
                    <label> Price</label>
                    <input type="text" className="form-control" name="image" value={price}
                            // default makes value from the backend to show in the field
                    // onChange={e => setPrice(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label> Quantity</label>
                    <input type="text" className="form-control" name="image"
                            // default makes value from the backend to show in the field
                    onChange={e => setQuantity(e.target.value)}
                    />
                </div>
                <button className="btn btn-outline-secondary">Add</button>
                <button className="btn btn-outline-secondary">Save</button>
            </form>

                </div>
            </div>
        {/*</Wrapper>*/}
        </div>
    );
};

export default ProductsEdit;