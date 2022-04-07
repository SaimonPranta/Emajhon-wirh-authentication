import React from "react";
import { NavLink } from "react-router-dom";
import './Product.css';

const Product = (props) => {
    const { img, name, seller, price, stock, key } = props.product;
    const cartIcon = < svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart4" viewBox="0 2 16 16"><path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" /></svg>;
    const removeIcon = < svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" /><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" /></svg>;


    return (
        <div className="row">
            <div className="porduct-container row">
                <div className="image col-4 ">
                    <img src={img} alt="logo" />
                </div>

                <div className="product-details col-8 ">
                    <div>
                        <NavLink className="product-name" to={"/product/" + key}><h6>{name}</h6></NavLink>
                        <p>by: {seller}</p>
                        <h5>${price}</h5>
                        {
                            stock > 0 && <span>only {stock} left in stock - order soon</span>
                        } <br></br>
                        {
                            props.quantity && <h6>Quantity: {props.product.quantity}</h6>
                        }
                        {
                            props.addCart && <button onClick={() => props.productHandeler(props.product)}>{cartIcon} add to cart</button>
                        }
                        {
                            props.removeHandeler && <button onClick={() => props.removeHandeler(key)}>{removeIcon} Remove</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product;