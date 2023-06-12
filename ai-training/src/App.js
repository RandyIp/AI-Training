import './App.css';
import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import Homepage from './components/homepage.js'
import Navbar from './components/navbar.js'
import Menu from './components/menu.js'
import FlappybirdAI from './components/FlappybirdAI.js';
import NeuralNetworkVisual from './components/NeuralNetworkVisual.js'

function App() {
  const [page, setPage] = useState('Home')
  const [scroll, setScroll] = useState()
  const HomeRef = useRef(); const ProjectRef = useRef(); const AboutRef = useRef();

  useEffect(() => {
    if (scroll === 'Home') HomeRef.current.scrollIntoView()
    if (scroll === 'Project') ProjectRef.current.scrollIntoView()
    if (scroll === 'About') AboutRef.current.scrollIntoView()
  }, [scroll])

  // function usePrevious(value) {
  //   const ref = useRef();
  //   useEffect(() => {
  //     ref.current = value;
  //   });
  //   return ref.current;
  // }

  // const prevPage = usePrevious(page)

  // test useEffect, see if it pulls up previous values, but I don't think so. If not then just put the previous value in each change, shouldn't be that many
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
