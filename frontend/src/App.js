import Header from "./components/Header";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Countries from "./pages/Countries";
import Airlines from "./pages/Airlines";
import Airports from "./pages/Airports";
// TODO: Here will go the router
function App() {
  return (
    <Router>
      <div>
        <Header/>
        <Routes>
          <Route path='/' element={<Countries/>}></Route>
          <Route path='/countries' element={<Countries/>}></Route>
          <Route path='/airlines'  element={<Airlines/>}></Route>
          <Route path='/airports'  element={<Airports/>}></Route>
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
