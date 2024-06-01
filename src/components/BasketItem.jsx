import React, { useState, useEffect } from 'react';

const BasketItem = ({ items, onRemove, onItemChange }) => {
  const [quantities, setQuantities] = useState(items.map(() => 1));

  const handleIncrease = (item) => {
    item.quantity++;
    localStorage.setItem('basket', JSON.stringify(items));
    onItemChange([...items]);
    // onRemove(index);

};

const handleDecrease = (item, index) => {
  if(item.quantity === 1) 
    {
      onRemove(index);
      
    }
    else{
    item.quantity--;
    localStorage.setItem('basket', JSON.stringify(items));
    onItemChange([...items]);
  }
  
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
            <p className='priceTxt'>$ {item.price * item.quantity}</p>
            <div className='amount'>
              <button onClick={() => handleDecrease(item, index)}>-</button>
              <span className='amountSpan'>{item.quantity}</span>
              <button onClick={() => handleIncrease(item, index)}>+</button>
            </div>
            <button onClick={() => handleRemove(index)}>Remove</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default BasketItem;