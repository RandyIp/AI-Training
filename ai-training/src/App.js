import './App.css';
import styled from 'styled-components';
import { useState, useRef } from 'react';
import Homepage from './components/homepage.js'
import Navbar from './components/navbar.js'
import Menu from './components/menu.js'
import FlappybirdAI from './components/FlappybirdAI.js';
import NeuralNetworkVisual from './components/NeuralNetworkVisual.js'

function App() {
  const [page, setPage] = useState('Home')
  const [scroll, setScroll] = useState()
  const HomeRef = useRef(); const ProjectRef = useRef(); const AboutRef = useRef();

  // useEffect(() => {
  if (scroll === 'Home') {
    HomeRef.current.scrollIntoView()
    setScroll()
  }
  if (scroll === 'Project') {
    ProjectRef.current.scrollIntoView()
    setScroll()
  }
  if (scroll === 'About') {
    AboutRef.current.scrollIntoView()
    setScroll()
  }
  // }, [scroll])

  return (
    <Container>
      <Navbar page={page} setPage={setPage} setScroll={setScroll} />
      {page === 'Menu' && <Menu
        HomeRef={HomeRef} ProjectRef={ProjectRef} AboutRef={AboutRef}
        setPage={setPage}
        setScroll={setScroll}
      />}
      {page === 'Home' && <Homepage
        HomeRef={HomeRef} ProjectRef={ProjectRef} AboutRef={AboutRef} setPage={setPage}
      />}
      {page === 'project1' && <NeuralNetworkVisual />}
      {page === 'project3' && <FlappybirdAI />}
    </Container>
  );
}

const Container = styled.div`
background-color:black;
`
export default App;
