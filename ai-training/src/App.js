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
        <Route path='/proj1' element={<Home initialPage='project1' />} />
        <Route path='/proj2' element={<Home initialPage='project2' />} />
        <Route path='/proj3' element={<Home initialPage='project3' />} />
        <Route path='/proj4' element={<Home initialPage='project4' />} />
        <Route path="/" element={<Home initialPage='Home' />} />
      </Routes>
    </Router >
  );
}

export default App;
