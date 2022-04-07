import { Routes, Route, Link } from "react-router-dom";
import Header from './conponents/Header/Header';
import Shop from './conponents/Shop/Shop.js';
import Inventory from './conponents/Inventory/Inventory';
import NotFound from './conponents/NotFound/NotFound.js';
import './App.css';
import ProductDetails from "./conponents/ProductDetails/ProductDetails";
import OrderReview from "./conponents/OrderReview/OrderReview";
import { createContext, useEffect, useState } from "react";
import { getStoredCart } from "./New folder/utilities/fakedb";
import EmptyReview from "./conponents/EmptyReview/EmptyReview";
import Footer from "./conponents/Footer/Footer";
import LogIn from "./conponents/Log In/LogIn";
import Shipment from "./conponents/Shipment/Shipment";
import PrivetRoute from "./conponents/PrivetRoute/PrivetRoute";
import UserProfile from "./conponents/UserProfile/UserProfile";

export const userContext = createContext();
function App() {
  const [userContainer, setUserContainer] = useState({});
  const [cart, setCart] = useState({});
  const keys = Object.keys(cart);

  useEffect(() => {
    setCart(getStoredCart())
  }, [])

  return (
    <userContext.Provider value={[userContainer, setUserContainer]}>
      <div>
        <Header></Header>
        <Routes>
          <Route path="/shop" element={<Shop></Shop>}></Route>
          {
            keys.length > 0 && <Route path="/review" element={<OrderReview></OrderReview>}></Route>
          }
          {
            keys.length === 0 && <Route path="/review" element={<EmptyReview></EmptyReview>}></Route>
          }
          <Route path="/" element={<Shop></Shop>}></Route>
          <Route path="/inventory" element={<Inventory></Inventory>}></Route>
          <Route path="/product/:productKey" element={<ProductDetails></ProductDetails>}></Route>
          <Route path="/login" element={<LogIn></LogIn>}></Route>
          <Route path="/profile" element={<UserProfile></UserProfile>}></Route>
          <Route path="/shipment" element={
            <PrivetRoute>
              <Shipment></Shipment>
            </PrivetRoute>
          }></Route>
          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Routes>
        <Footer></Footer>
      </div>
    </userContext.Provider>

  );
}

export default App;
