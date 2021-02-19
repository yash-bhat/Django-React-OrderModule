import React, {PropsWithRef, SyntheticEvent, useEffect, useState} from 'react';
import { Redirect } from 'react-router-dom';

const ShippingsEdit = (props: PropsWithRef<any>) => {
    const [ship_charge, setShip_charge] = useState('');
    const [bill_addr1, setBilling_addr1] = useState('');
    const [bill_addr2, setBilling_addr2] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [check_id, setCheck_id] = useState('');
    const [status, setStatus] = useState('');


    // To set redirecting. For example, after adding product, go to listing products
    const [redirect, setRedirect] = useState(false);


      useEffect(() => {
        // asynchronous function
        (
            async () => {


                setStatus('Out For Delivery')

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
        await fetch(`http://localhost:8000/orders/shippings/${props.match.params.id3}`, {
            method: 'POST',
            // Since HTTP request, we need to work with json
            headers: {'Content-Type': 'application/json'},
            // to convert a JavaScript object or value to a JSON string
            // to update in backend
            body: JSON.stringify({
                ship_charge,
                bill_addr1,
                bill_addr2,
                state,
                city,
                zipcode
            })
        });



        // if success, redirect to products listing table
        setRedirect(true);
    }

    if(redirect) {
        // return <Redirect to={`/orders/checkout/${props.match.params.id3}`}/>
        return <Redirect to={`/orders/products/paymentsmore/${props.match.params.id3}`}/>
    }

    return (
        <div>
        {/*<Wrapper>*/}
            <form onSubmit={submit}>
                <div className="form-group">
                    <label> Shipping Charge</label>
                    {/* Every time this input changes, we will set the title */}
                    <input type="text" className="form-control" name="title"
                    onChange={e => setShip_charge(e.target.value)}
                    />
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
                <button className="btn btn-outline-secondary">Save</button>
            </form>
            
        {/*</Wrapper>*/}
        </div>
    );
};

export default ShippingsEdit;