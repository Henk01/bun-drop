import React, { useState, useEffect } from 'react';

const BasketItem = ({ items, onRemove }) => {
  const [quantities, setQuantities] = useState(items.map(() => 1));

  const handleIncrease = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index]++;
    setQuantities(newQuantities);
  };

  const handleDecrease = (index) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] > 1) {
      newQuantities[index]--;
    }
    setQuantities(newQuantities);
  };

  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(items));
  }, [items]);

  const handleRemove = (index) => {
    onRemove(index);
  };

  return (
    <>
      <div className="basketcontainer">
        {items.map((item, index) => (
          <div key={index} className='basketDiv'>
            <p className='nameTxt'>{item.title}</p>
            <img src={item.image} alt={item.title} className='itemImg'/>
            <p className='priceTxt'>{item.price} $</p>
            <div className='amount'>
              <button onClick={() => handleDecrease(index)}>-</button>
              <span>{quantities[index]}</span>
              <button onClick={() => handleIncrease(index)}>+</button>
            </div>
            <button onClick={() => handleRemove(index)}>Remove</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default BasketItem;