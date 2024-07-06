import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomeLayout from './layouts/HomeLayout';



function App() {

  return (
    <div className="App">

      <Routes>
        <Route path="" element={<HomeLayout />} >
          <Route path="*" element={<div> no page </div>} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
