import React, {PropsWithRef, SyntheticEvent, useEffect, useState} from 'react';
import { Redirect } from 'react-router-dom';
// import Wrapper from "./Wrapper";

const ProductsEdit = (props: PropsWithRef<any>) => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');

    // To set redirecting. For example, after adding product, go to listing products
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        (
            async () => {
                // params.id corresponds to App.tsx id in ProductsEdit
                const response = await fetch(`http://localhost:8000/api/products/${props.match.params.id}`)

                const product = await response.json()

                setTitle(product.title)
                setImage(product.image)
        }
        )();
    }, []);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        // console.log(title,image);
        await fetch(`http://localhost:8000/api/products/${props.match.params.id}`, {
            method: 'PUT',
            // Since HTTP request, we need to work with json
            headers: {'Content-Type': 'application/json'},
            // to convert a JavaScript object or value to a JSON string
            // to update in backend
            body: JSON.stringify({
                title,
                image
            })
        });

        // if success, redirect to products listing table
        setRedirect(true);
    }

    if(redirect) {
        return <Redirect to='/orders/products'/>
    }

    return (
        <div>
        {/*<Wrapper>*/}
            <form onSubmit={submit}>
                <div className="form-group">
                    <label> Title</label>
                    {/* Every time this input changes, we will set the title */}
                    <input type="text" className="form-control" name="title"
                           defaultValue={title}
                    onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label> Image</label>
                    <input type="text" className="form-control" name="image"
                            // default makes value from the backend to show in the field
                           defaultValue={image}
                    onChange={e => setImage(e.target.value)}
                    />
                </div>
                <button className="btn btn-outline-secondary">Save</button>
            </form>
            
        {/*</Wrapper>*/}
        </div>
    );
};

export default ProductsEdit;