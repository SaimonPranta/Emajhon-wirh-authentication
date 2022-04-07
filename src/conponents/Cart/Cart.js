import React, { useEffect, useState } from 'react';
import { clearTheCart, getStoredCart } from '../../New folder/utilities/fakedb';
import fakeData from '../../New folder/fakeData/products.json';
import './Cart.css';
import { NavLink } from 'react-router-dom';

const Cart = (props) => {
    const [carts, setCarts] = useState({});
    const keyss = Object.keys(carts);

    let finalProducts = [];
    let totalPrice = 0;
    let shiping = 0;
    
    useEffect(()=>{
        setCarts(getStoredCart());
        
    },[]);

    function numberHandler(num){
        const pureNumber = num.toFixed(2);
        return pureNumber;
    };

    const products = keyss.map(key => {
        const newProduct = fakeData.find(pd => pd.key === key)
        newProduct['quantity'] = carts[key];
        return newProduct;
    });
    products.map(pd => { 
        for(let i = 1; i <= pd.quantity; i++){
            finalProducts = [...finalProducts, pd];
        }
    });

for(let i = 0; i < finalProducts.length; i++){
    totalPrice = totalPrice + finalProducts[i].price
}

if(200 < totalPrice){
    shiping = 0;
}else if(100 < totalPrice){
    shiping = 3;
}else if(1 < totalPrice){
    shiping = 7;
}

const beforTex = totalPrice + shiping;
const tex = beforTex * .10 ;
const orderHandeler = () =>{
    // clearTheCart();
}
  
    return (
        <div className='cart'>
            <h3>Order Summary</h3>
            <p className='p-control'> Items: {products.length}</p>
            <p>Product Price: ${numberHandler(totalPrice)}</p>
            <p>Shippng & Handling: ${shiping}</p>
            <p>Total before tax: ${numberHandler(beforTex)}</p>
            <p>Estimate Tax: ${numberHandler(tex)}</p>
            <h4>Order Total: ${numberHandler(totalPrice + shiping + beforTex + tex)}</h4>
            {
                props.buttonHandeler || products.length > 0 && <NavLink className="nav-control" to="/review"> <button className="button-control">Order Review</button> </NavLink>
            }
            {
                products.length > 0 && props.buttonHandeler && <NavLink className="nav-control" to="/shipment"> <button onClick={orderHandeler} className="button-control">Place Order</button> </NavLink>
            }
        </div>
    );
};

export default Cart;
