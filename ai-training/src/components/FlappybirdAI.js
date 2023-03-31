import React from 'react';
import { useState, useEffect } from 'react'
import styled from 'styled-components';

const FlappybirdAI = () => {
  const [gameState, setGameState] = useState('stop')

  const gameHeight = 500
  const gameWidth = 500
  return (
    <Container>
      <GameContainer gameHeight={gameHeight} gameWidth={gameWidth}>
        {gameState == 'start' && <Bird gameHeight={gameHeight} gameWidth={gameWidth} />}
      </GameContainer>
      <Description>rando text</Description>
    </Container>
  )
}

const Container = styled.div`
background-color: black;
height: 100vh;
width: 100vw;
margin: 0;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`

const GameContainer = styled.div`
background-color: #00008B;
height: ${props => props.gameHeight + 'px'};
width: ${props => props.gameWidth + 'px'};
`

const Bird = styled.div`
height: ${props => props.gameHeight / 25 + 'px'};
width: ${props => props.gameWidth / 25 + 'px'};
background-color: #FFFFE0;
border-radius: 50%;
position: relative;
left: ${props => props.gameWidth / 25 + 'px'};
top: ${props => props.gameHeight * 24 / 50 + 'px'};
`

const Description = styled.p`
color: white;
`

export default FlappybirdAI