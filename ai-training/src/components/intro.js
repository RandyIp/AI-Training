import React from 'react';
import styled from 'styled-components';
import introImg from '../images/introImg2.jpeg'

const Intro = () => {
  return (
    <FlexContainer>
      <Header>
        Hi, I'm Randy. A software engineer who also has a passion for machine learning.
      </Header>
      <IntroImg src={introImg} />
    </FlexContainer>
  )
}

const FlexContainer = styled.div`
display: flex;
background-color: black;
height: 100vh;
width: 100vw;
margin:0;
`

const Header = styled.h1`
width: 40vw;
margin-left:10vw;
margin-top: 0vh;
padding-top:30vh;
color: white;
z-index: 1;
`

const IntroImg = styled.img`
padding-left:10vh;
padding-top:20vh;
height: 40vh;
width: 30vw;
`

export default Intro