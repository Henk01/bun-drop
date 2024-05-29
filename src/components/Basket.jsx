import React from "react";
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './Basket.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket, faCircleLeft } from '@fortawesome/free-solid-svg-icons'


function Basket() {
    const [items, setItems] = useState([]);

  useEffect(() => {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

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
        </>
    )
    
}

export default Basket