import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './Basket.css'
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
          // console.log(parsedItems);
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

      // const basket = JSON.parse(localStorage.getItem('basket')) || [];
      useEffect(() => {
        const newCartTotal = items.reduce(
          (total, item) => total + item.quantity * item.price,
          0
        );
        setTotalPrice(newCartTotal);
      }, [items]);
      
      // console.log(items);
      // console.log(quantities);
      // console.log(items.length === quantities.length);

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
            <p className='totalTxt'>Total: $ {totalPrice}</p>
      </nav>
    </header>
    <BasketItem items={items} onItemChange={setItems} onRemove={handleRemove} setQuantities={setQuantities} />
        </>
    )
    
}

export default Basket