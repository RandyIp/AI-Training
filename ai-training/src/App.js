import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import Homepage from './components/homepage.js'
import Navbar from './components/navbar.js'
import Menu from './components/menu.js'

function App() {
  const [page, setPage] = useState('Home')
  const [scroll, setScroll] = useState()
  const HomeRef = useRef(); const ProjectRef = useRef(); const AboutRef = useRef();

  useEffect(() => {
    if (scroll == 'Home') HomeRef.current.scrollIntoView()
    if (scroll == 'Project') ProjectRef.current.scrollIntoView()
    if (scroll == 'About') AboutRef.current.scrollIntoView()
  }, [scroll])

  return (
    <Container>
      <Navbar page={page} setPage={setPage} setScroll={setScroll} />
      {page == 'Menu' && <Menu
        HomeRef={HomeRef} ProjectRef={ProjectRef} AboutRef={AboutRef}
        setPage={setPage}
        setScroll={setScroll}
      />}
      {page == 'Home' && <Homepage
        HomeRef={HomeRef} ProjectRef={ProjectRef} AboutRef={AboutRef}
      />}
    </Container>
  );
}

const Container = styled.div`
background-color:black;
`
export default App;
