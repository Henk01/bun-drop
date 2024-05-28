import React from "react";
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import viteLogo from '/vite.svg'
import './Menu.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket, faPlus, faCircleLeft } from '@fortawesome/free-solid-svg-icons'

function Menu() {
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/db.json')
          .then(response => response.json())
          .then(data => {
            setItems(data.items);
            setIsLoading(false);
          });
      }, []);
    
    const handleSearch = () => {
        // Handle search logic here
        console.log(searchTerm);
    }

    const burgerItems = items ? items.filter(item => item.category === 'burgers') : [];

    if (isLoading) {
        return <div>Loading...</div>;
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
            <div className="searchContainer">
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
            </div>
            <Link to="/basket">
                <button className="shopBasketBtn" >
                    <FontAwesomeIcon className="shopBasket" icon={faShoppingBasket} size="2x"/>
                </button>
            </Link>
          </nav>
        </header>
        <h1 className="burgerH1">Burgers</h1>
        <div>
        {burgerItems.map(item => (
          <div key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.price}</p>
            <img className='burgerImg' src={item.image} alt={item.title} />
          </div>
        ))}
      </div>
        </>
    )
}

export default Menu
