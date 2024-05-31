import React from "react";
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './Menu.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket, faPlus, faCircleLeft } from '@fortawesome/free-solid-svg-icons'
import ItemContainer from './ItemContainer.jsx'

function Menu() {
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
      fetch('/db.json')
        .then(response => response.json())
        .then(data => {
          setItems(data.items);
        });
    }, []);


    const handleFilterClick = (category) => {
      setFilter(category);
    };

    const handleAddItem = (item) => {
      // Get the current basket from localStorage
      let basket = JSON.parse(localStorage.getItem('basket')) || [];
    
      // Add the new item to the basket
      basket.push(item);
    
      // Save the updated basket back to localStorage
      localStorage.setItem('basket', JSON.stringify(basket));
    };
    
    const handleSearch = () => {
        // Handle search logic here
        console.log(searchTerm);
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
            {/* <div className="searchContainer">
                <input 
                    type="text" 
                    className="searchTxt" 
                    placeholder="Search..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="searchBtn" onClick={handleSearch}>
                    Search
                </button>
            </div> */}
            <Link to="/basket">
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
}

export default Menu
