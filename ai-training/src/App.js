import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import { useState } from 'react';

function App() {
  const [page, setPage] = useState('Home')
  return (
    <Container>
      {page == 'Home' && <Header>Welcome!</Header>}
    </Container>
  );
}

const Container = styled.div`
background-color: black;
height: 100vh;
width: 100vw;
margin:0;
`

const Header = styled.h1`
color: green;
margin: 0;
text-align: center
`

const GameGrid = styled.div`
`

export default App;
