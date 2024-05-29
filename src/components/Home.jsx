import React from 'react'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './Home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket, faPlus } from '@fortawesome/free-solid-svg-icons'

function Home() {
  const [count, setCount] = useState(0)
  const [items, setItems] = useState([])
  // const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    fetch('/db.json')
      .then(response => response.json())
      .then(data => setItems(data.items))
  }, [])

  useEffect(() => {
    console.log(items);
  }, [items]);

  const Home = ({ selectedItems }) => {
    // ...
  };

  const handleAddItem = (item) => {
  let itemsArray = localStorage.getItem('items')
  ? JSON.parse(localStorage.getItem('items'))
  : [];

  itemsArray.push(item);

  
  localStorage.setItem('items', JSON.stringify(itemsArray));
  };

//   useEffect(() => {
//   console.log(selectedItems);
// }, [selectedItems]);

  return (
    <>
    <header>
      <nav className="navBar">
        <img className="logo" src="public/images/logo black.png" alt="Logo Black"/>
        <Link to="/menu">
        <button className="orderButton">Begin order</button>
        </Link>
        <Link to="/basket">
            <button className="shopBasketBtn" >
                <FontAwesomeIcon className="shopBasket" icon={faShoppingBasket} size="2x"/>
            </button>
        </Link>
      </nav>
    </header>
    <h1 className="popH1">Popular Items</h1>
    <div className="popDivContainer">
  {Array.isArray(items) && items.map((item, index) => item.popular && (
    <div className="popDiv" key={index}>
    <p>{item.title}</p>
    <div className="imageContainer"> 
      <img className='popImg' src={item.image} alt={item.title} />
      <button className="faPlusBtn" onClick={() => handleAddItem(item)}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div> 
    <p>{item.price} $</p>
  </div>
  ))}
</div>

    </>
  )
}

export default Home
