import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Menu from './components/Menu';
import Basket from './components/Basket';
import SelectedItemsContext from './SelectedItemsContext';

function App() {
  const [selectedItems, setSelectedItems] = useState([]);

  return (
    <SelectedItemsContext.Provider value={{ selectedItems, setSelectedItems }}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/basket" element={<Basket />} />
      </Routes>
    </Router>
    </SelectedItemsContext.Provider>
  );
}

export default App;