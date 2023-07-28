import React from 'react';
import styled from 'styled-components';
import Intro from './intro.js'
import Projects from './projects.js'
import About from './about.js'

const Homepage = ({ HomeRef, ProjectRef, AboutRef, setPage }) => {
  return (<Container>
    <Section ref={HomeRef}>
      <Intro />
    </Section>

    <Section ref={AboutRef}>
      <About />
    </Section>

    <Section ref={ProjectRef} >
      <Projects setPage={setPage} />
    </Section>
  </Container>
  )
}

const Container = styled.div`
width: 100vw;
max-width: 100%;
background-color: black;
`
const Section = styled.div`
position:relative;
background-color: black;
height: 100vh;
width: 100vw;
max-width: 100%;
margin:0;
`

// const FlexContainer = styled.div`
// display: flex;
// background-color: black;
// height: 100vh;
// width: 100vw;
// margin:0;
// `

// const Header = styled.h1`
// color:white;
// margin:0;
// `

// const IntroImg = styled.img`
// padding-left:10vh;
// padding-top:20vh;
// height: 40vh;
// width: 30vw;
// `

export default Homepage