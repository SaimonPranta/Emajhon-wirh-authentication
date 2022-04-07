import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../New folder/fakeData/products.json';

const ProductDetails = () => {
    const {productKey} = useParams();
    const product = fakeData.find( pd => pd.key === productKey );
    const {img, name, price, category, seller, wholePrice} = product;

    return (
        <div className='text-center'>
            <img src={img} alt="image" />
            <h5>{name}</h5>
            <h6>Price: ${price}</h6>
            <h6>Category: {category}</h6>
            <h6>by: {seller}</h6>
            <h6>WholeSell price: {wholePrice}</h6>


        </div>
    );
};

export default ProductDetails;