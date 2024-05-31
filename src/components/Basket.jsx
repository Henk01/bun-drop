import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './Basket.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket, faCircleLeft } from '@fortawesome/free-solid-svg-icons'
import BasketItem from './BasketItem.jsx'


function Basket() {
    const [items, setItems] = useState(() => {
        const savedItems = localStorage.getItem('basket');
        return savedItems ? JSON.parse(savedItems) : [];
      });

    useEffect(() => {
        const storedItems = localStorage.getItem('basket');
        if (storedItems) {
          const parsedItems = JSON.parse(storedItems);
          setItems(parsedItems);
          console.log(parsedItems);
        }
      }, []);

      const handleRemove = (index) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
      };


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
        <Link to="/basket">
            <button className="shopBasketBtn" >
                <FontAwesomeIcon className="shopBasket" icon={faShoppingBasket} size="2x"/>
            </button>
        </Link>
      </nav>
    </header>
    <BasketItem items={items} onRemove={handleRemove}/>
        </>
    )
    
}

export default Basket