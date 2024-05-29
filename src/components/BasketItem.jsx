import React from 'react';

const BasketItem = ({ item, handleRemoveItem }) => {
    return (
        <>
        <div className="basketItem">
        {items.map((item, index) => (
          <div key={index}>
            <p>{item.title}</p>
            <img src={item.image} alt={item.title} />
            <p>{item.price} $</p>
          </div>
        ))}
      </div>
        </>
    )
};

export default BasketItem;