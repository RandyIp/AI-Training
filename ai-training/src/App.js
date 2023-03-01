import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import { useState } from 'react';
import Homepage from './components/homepage.js'

function App() {
  const [page, setPage] = useState('Home')
  return (
    <div>
      {page == 'Home' && <Homepage />}
    </div>
  );
}

export default App;
