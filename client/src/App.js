import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomeLayout from './layouts/HomeLayout';
import Auth from './components/Auth';
import Category from './components/Category';
import Inventory from './components/Inventory';
import Orders from './components/Orders';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import AdminLayout from './layouts/AdminLayout';
import axios from 'axios';

// import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  axios.defaults.baseURL = "http://localhost:8080/api/v1";
  axios.defaults.params = {};

  return (
    <div className="App">
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<HomeLayout />} >
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/u" element={<AdminLayout />} >
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
