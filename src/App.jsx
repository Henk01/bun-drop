import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Menu from './components/Menu';
import Basket from './components/Basket';
import Confirm from './components/Confirm';
import SelectedItemsContext from './SelectedItemsContext';

function App() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  

  return (
    <SelectedItemsContext.Provider value={{ selectedItems, setSelectedItems }}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/basket" element={<Basket />} />
        <Route path='/confirm' element={<Confirm />} />
      </Routes>
    </Router>
    </SelectedItemsContext.Provider>
  );
}

export default App;