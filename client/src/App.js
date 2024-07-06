import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomeLayout from './layouts/HomeLayout';
import Auth from './components/Auth';



function App() {

  return (
    <div className="App">

      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="" element={<HomeLayout />} >
          <Route path="*" element={<div> no page </div>} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
