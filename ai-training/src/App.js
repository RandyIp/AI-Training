import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/home.js'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/mlvis' element={<Home initialPage='project1' />} />
        <Route path='/jarvis' element={<Home initialPage='project2' />} />
        <Route path="/" element={<Home initialPage='Home' />} />
      </Routes>
    </Router >
  );
}

export default App;
