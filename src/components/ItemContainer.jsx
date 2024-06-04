import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const ItemContainer = ({ filter, items, handleAddItem, category }) => {
  return (
    <div>
      {filter === 'All' || filter === category ? (
        <>
        <div className='catDiv'>
        <h1 className='catH1'>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
        </div>
          <div className="itemContainer">
            {Array.isArray(items) && items.map((item, index) => item.category === category && (
              <div className="itemDiv" key={index}>
                <p>{item.title}</p>
                <div className="imageContainer"> 
                  <img className='itemImg' src={item.image} alt={item.title} />
                  <button className="faPlusBtn" onClick={() => handleAddItem(item)}>
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div> 
                <p>{item.price} $</p>
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ItemContainer;