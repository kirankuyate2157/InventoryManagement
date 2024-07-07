import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomeLayout from './layouts/HomeLayout';
import Auth from './components/Auth';
import Category from './components/Category';
import Inventory from './components/Inventory';
import Orders from './components/Orders';
import Dashboard from './components/Dashboard';



function App() {

  return (
    <div className="App">

      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<HomeLayout />} >
        <Route path="/home" element={<Dashboard />} />
          <Route path="/category" element={<Category />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="*" element={<div> no page </div>} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
