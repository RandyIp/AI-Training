import React from 'react';
import styled from 'styled-components';
import Intro from './intro.js'
import Projects from './projects.js'

const Homepage = () => {
  return (<Container>
    <Section>
      <Intro />
    </Section>

    <Section>
      <Projects />
    </Section>
  </Container>)
}

const Container = styled.div`
margin-top: 5vh
`
const Section = styled.div`
position:relative;
background-color: black;
height: 100vh;
width: 100vw;
margin:0;
`

const FlexContainer = styled.div`
display: flex;
background-color: black;
height: 100vh;
width: 100vw;
margin:0;
`

const Header = styled.h1`
color:white;
margin:0;
`

const IntroImg = styled.img`
padding-left:10vh;
padding-top:20vh;
height: 40vh;
width: 30vw;
`

export default Homepage