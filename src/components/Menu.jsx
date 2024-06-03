import React from "react";
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './Menu.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket, faPlus, faCircleLeft } from '@fortawesome/free-solid-svg-icons'
import ItemContainer from './ItemContainer.jsx'

function Menu() {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [basketItems, setBasketItems] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [storedItems, setStoredItems] = useState([]); 


    useEffect(() => {
      fetch('/db.json')
        .then(response => response.json())
        .then(data => {
          setItems(data.items);
        });

        const storedBasketItems = JSON.parse(localStorage.getItem('basket')) || [];
        setBasketItems(storedBasketItems);
    }, []);

    const handleFilterClick = (category) => {
      setFilter(category);
    };


    const handleAddItem = (item) => {
      // Get the current basket from localStorage
      let basket = [...basketItems];
      console.log("basket",basket)
    
      // Check if the item is already in the basket
      const existingItem = basket.find(basketItem => basketItem.id === item.id);
    
      if (existingItem) {
        // If the item is already in the basket, increase its quantity
        existingItem.quantity += 1;
      } else {
        // If the item is not in the basket, add it to the basket with a quantity of 1
        item = { ...item, quantity: 1 };
        basket.push(item);
        
      }
    
      // Save the updated basket back to localStorage and update the state
      localStorage.setItem('basket', JSON.stringify(basket));
      setBasketItems(basket);
      // console.log("basket",basket);
    };

    useEffect(() => {
      const storedItems = JSON.parse(localStorage.getItem('basket')) || [];
      let totalQuantity = 0;
    
      storedItems.forEach((item) => totalQuantity += item.quantity);
  
      setTotalQuantity(totalQuantity);
    }, [basketItems]);

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
            <Link to="/basket" className='basketLink'>
            <p className="basketCount">{totalQuantity}</p>
            <button className="shopBasketBtn" >
                <FontAwesomeIcon className="shopBasket" icon={faShoppingBasket} size="2x"/>
            </button>
        </Link>
          </nav>
        </header>
        <div className="filterBtn">
          <button onClick={() => handleFilterClick('All')}>All</button>
          <button onClick={() => handleFilterClick('burgers')}>Burgers</button>
          <button onClick={() => handleFilterClick('sides')}>Sides</button>
          <button onClick={() => handleFilterClick('drinks')}>Drinks</button>
        </div>
        <ItemContainer filter={filter} items={items} handleAddItem={handleAddItem} category='burgers' />
        <ItemContainer filter={filter} items={items} handleAddItem={handleAddItem} category='sides' />
        <ItemContainer filter={filter} items={items} handleAddItem={handleAddItem} category='drinks' />
        <ItemContainer filter={filter} items={items} handleAddItem={handleAddItem} category='desserts' />
        </>
    );
  };

  export default Menu;
