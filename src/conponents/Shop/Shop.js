import React, { useContext, useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import './Shop.css';
import fakeProduct from '../../New folder/fakeData/products.json';
import { addToDb, getStoredCart } from '../../New folder/utilities/fakedb';
import { NavLink } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseConfig from '../Log In/firebaseConfig';
import { userContext } from '../../App';


const Shop = () => {
    // const firstTen = fakeProduct.slice(0, 10);
    const [userContainer, setUserContainer] = useContext(userContext)
    const [product, setProduct] = useState([]);
    const cartIcon = < svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-cart4" viewBox="0 2 16 16"><path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" /></svg>;
    const keys = Object.keys(getStoredCart());
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const shuffleAarray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    };

    const shuffleProduct = shuffleAarray(fakeProduct);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            const newUser = {
                email: '',
                name: '',
                gender: '',
                dateOfBirth: '',
                photo: ''
            }
            if (user) {
                const uid = user.uid;
                newUser.email = user.email
                newUser.name = user.displayName
                newUser.gender = user.gender
                newUser.dateOfBirth = user.dateOfBirth
                newUser.photo = user.photoURL
                setUserContainer(newUser)
                console.log(newUser)
            } else {
            }
        });
    }, [])

    useEffect(() => {
        setProduct(shuffleProduct);
    }, [])

    const productHandeler = (addProduct) => {
        addToDb(addProduct.key);
        window.location.reload()
    }
    // Search Handeler Function

    const searchHndeler = (event) => {
        const input = event.target.value.toUpperCase();
        const filProduct = fakeProduct.filter(pd => pd.name.toUpperCase().includes(input));
        setProduct(filProduct);
    }

    return (
        <div className='row '>
            <div className='search-control col-12'>
                <input type="text" placeholder='Search here...' className='search-bar' onKeyUp={searchHndeler} />
                <NavLink to='/review'>
                    <p className='cart-icon'>
                        {cartIcon}
                        <div className='cart-icon-after'>{keys.length}</div>
                    </p>
                </NavLink>
            </div>
            <div className='tween-conatiner row  m-auto'>

                <div className="product-container col-8">
                    {
                        product.slice(0, 10).map(product => <Product product={product} productHandeler={productHandeler} addCart={true} key={product.key}></Product>)
                    }
                </div>
                <div className="cart-container col-4">
                    <Cart></Cart>
                </div>

            </div>
        </div>

    );
};

export default Shop;