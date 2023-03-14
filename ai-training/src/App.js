import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import { useState } from 'react';
import Homepage from './components/homepage.js'
import Navbar from './components/navbar.js'

function App() {
  const [page, setPage] = useState('Home')
  return (
    <Container>
      <Navbar></Navbar>
      {page == 'Home' && <Homepage />}
    </Container>
  );
}

const Container = styled.div`
background-color:black;
overflow: none;
`
export default App;
