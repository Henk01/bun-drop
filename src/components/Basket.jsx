import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './Basket.css'
import Checkout from './Checkout.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket, faCircleLeft } from '@fortawesome/free-solid-svg-icons'
import BasketItem from './BasketItem.jsx'


function Basket() {
    const [totalPrice, setTotalPrice] = useState(0);
    const [items, setItems] = useState(() => {
        const savedItems = localStorage.getItem('basket');
        return savedItems ? JSON.parse(savedItems) : [];
      });

      const [quantities, setQuantities] = useState(() => {
        const savedQuantities = localStorage.getItem('quantities');
        return savedQuantities ? JSON.parse(savedQuantities) : [];
      });

    useEffect(() => {
        const storedItems = localStorage.getItem('basket');
        if (storedItems) {
          const parsedItems = JSON.parse(storedItems);
          setItems(parsedItems);
        }
      }, []);

      const handleRemove = (index) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
        localStorage.setItem('basket', JSON.stringify(newItems));
      
        const newQuantities = [...quantities];
        newQuantities.splice(index, 1);
        setQuantities(newQuantities);
        localStorage.setItem('quantities', JSON.stringify(newQuantities));
      };

      useEffect(() => {
        const newCartTotal = items.reduce(
          (total, item) => total + item.quantity * item.price,
          0
        );
        setTotalPrice(newCartTotal);
      }, [items]);

      const clearLocalStorage = () => {
        localStorage.clear();
    }

    return(
        <>
        <header>
      <nav className="navBar">
        <img className="logo" src="public/images/logo black.png" alt="Logo Black"/>
        <Link to="/">
            <button className="returnBtn">
                <FontAwesomeIcon icon={faCircleLeft} size="2x" />
            </button>
            </Link>
            <h3 className='totalTxt'>Total: $ {totalPrice}</h3>
      </nav>
    </header>
    <BasketItem items={items} onItemChange={setItems} onRemove={handleRemove} setQuantities={setQuantities} />
    <Checkout  totalPrice={totalPrice} onClearLocalStorage={clearLocalStorage}/>
        </>
    )
    
}

export default Basket