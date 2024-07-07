import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomeLayout from './layouts/HomeLayout';
import Auth from './components/Auth';
import Category from './components/Category';
import Inventory from './components/Inventory';



function App() {

  return (
    <div className="App">

      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<HomeLayout />} >
          <Route path="/category" element={<Category />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="*" element={<div> no page </div>} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
