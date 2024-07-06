import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Button } from './components/ui/button';



function App() {

  return (
    <div className="App">

      <Routes>
        <Route path="" element={<div> <Button variant="outline">Button</Button>
          </div>} />
       
      </Routes>
    </div>
  );
}

export default App;
