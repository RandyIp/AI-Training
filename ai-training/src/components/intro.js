import React from 'react';
import styled from 'styled-components';
import introImg from '../images/introImg3.jpeg'

const Intro = () => {
  return (
    <FlexContainer>
      <Header>
        Hi there, nice to meet you! I'm Randy, an engineer skilled in both software and machine learning techniques.
      </Header>
      <IntroImg src={introImg} />
    </FlexContainer>
  )
}

const FlexContainer = styled.div`
display: flex;
`

const Header = styled.h1`
width: 40vw;
margin-left:10vw;
margin-top: 0vh;
padding-top:30vh;
color: white;
`

const IntroImg = styled.img`
padding-left:10vh;
padding-top:20vh;
height: 40vh;
width: 30vw;
`

export default Intro