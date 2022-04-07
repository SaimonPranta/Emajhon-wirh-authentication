import React from 'react';
import orderImage from '../../images/giphy.gif';
import './OrderImage.css';
const OrderImage = () => {
    return (
        <div className='imgae-control main-product'>
            <img src={orderImage} alt="" />
        </div>
    );
};

export default OrderImage;