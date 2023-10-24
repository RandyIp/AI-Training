import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import MainPage from './components/mainPage.js'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/proj1' element={<MainPage initialPage='project1' />} />
        <Route path='/proj2' element={<MainPage initialPage='project2' />} />
        <Route path='/proj3' element={<MainPage initialPage='project3' />} />
        <Route path='/proj4' element={<MainPage initialPage='project4' />} />
        <Route path="/" element={<MainPage initialPage='Home' />} />
      </Routes>
    </Router >
  );
}

export default App;
