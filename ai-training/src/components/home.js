import styled from 'styled-components';
import { useState, useRef } from 'react';
import Homepage from './homepage.js'
import Navbar from './navbar.js'
import Menu from './menu.js'
// import FlappybirdAI from './FlappybirdAI.js';
import NeuralNetworkVisual from './NeuralNetworkVisual.js'
import Jarvis from './jarvis.js'
import AppleGenerator from './AppleGenerator.js'
import Debug from './debug.js'

const Home = ({ initialPage }) => {
  const [page, setPage] = useState(initialPage)
  const [scroll, setScroll] = useState()
  const HomeRef = useRef(); const ProjectRef = useRef(); const AboutRef = useRef();

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
      {page === 'project2' && <Jarvis />}
      {page === 'project3' && <AppleGenerator />}
      {page === 'project4' && <Debug />}

    </Container>
  );
}

const Container = styled.div`
background-color:black;
`
export default Home