import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomeLayout from './layouts/HomeLayout';
import Auth from './components/Auth';
import Category from './components/Category';
import Inventory from './components/Inventory';
import Orders from './components/Orders';
import Dashboard from './components/Dashboard';
import Home from './components/Home';



function App() {

  return (
    <div className="App">

      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Home />} />
        <Route path="/u" element={<HomeLayout />} >
          <Route path="/u/home" element={<Dashboard />} />
          <Route path="/u/category" element={<Category />} />
          <Route path="/u/inventory" element={<Inventory />} />
          <Route path="/u/orders" element={<Orders />} />
          <Route path="*" element={<div> no page </div>} />
        </Route>
        <Route path="*" element={<div> no page </div>} />
      </Routes>
    </div>
  );
}

export default App;
