import React, { useEffect, useState } from 'react';
import { getStoredCart, deleteFromDb } from '../../New folder/utilities/fakedb';
import fakeData from '../../New folder/fakeData/products.json';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import '../Cart/Cart.css';

const OrderReview = () => {
    const [cart, setCart] = useState([])


    let keys = Object.keys(cart)

    useEffect(() => {
        setCart(getStoredCart())

    }, [])

    let filterProduct = keys.map(key => {
        const product = fakeData.find(pd => pd.key === key)
        product['quantity'] = cart[key]
        return product
    })

    const removeHandeler = (key) => {
        filterProduct = filterProduct.filter(pd => pd.key !== key);
        deleteFromDb(key)
        window.location.reload();
    }


    return (
        <div className='container main-product'>
            <div className='tween-conatiner row'>
                <div className="product-container col-8">
                    {
                        filterProduct.map(pd => <Product product={pd} quantity={true} removeHandeler={removeHandeler} key={pd.key}></Product>)
                    }
                </div>
                <div className='col-4'>
                    <Cart product={filterProduct} buttonHandeler={true} className="cart-container"></Cart>
                </div>
            </div>
        </div>
    );
};

export default OrderReview;