import React from 'react';
import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components';

const FlappybirdAI = () => {
  const [gameState, setGameState] = useState('stop')

  const gameHeight = 500
  const gameWidth = 500
  const gravity = gameHeight / 100

  const [birdPosition, setBirdPosition] = useState(gameHeight * 24 / 50)
  const birdPositionCounter = useRef(birdPosition)

  const startGame = () => {
    setGameState('start')
    let timeID = setInterval(() => {
      setBirdPosition(birdPosition => birdPosition + gravity)
      birdPositionCounter.current += gravity
      if (birdPositionCounter.current > gameHeight || birdPositionCounter.current < 0) {
        clearInterval(timeID)
        setGameState('stop')
        setBirdPosition(gameHeight * 24 / 50)
        birdPositionCounter.current = gameHeight * 24 / 50
      }
    }, 24)
  }

  const flap = () => {
    if (gameState == 'start') {
      setBirdPosition(birdPosition => birdPosition - (10 * gravity))
      birdPositionCounter.current -= (10 * gravity)
    }
  }

  return (
    <Container>
      <GameContainer onClick={flap} gameHeight={gameHeight} gameWidth={gameWidth}>
        {gameState == 'start' && <Bird birdPosition={birdPosition} gameHeight={gameHeight} gameWidth={gameWidth} />}
        {gameState == 'stop' && <ButtonContainer>
          <StartButton onClick={startGame} gameHeight={gameHeight} gameWidth={gameWidth}>Start</StartButton>
          <StartButton onClick={() => setGameState('start')} gameHeight={gameHeight} gameWidth={gameWidth}>
            Train AI
          </StartButton>
        </ButtonContainer>}
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
background-color: #87CEFA;
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
top: ${props => props.birdPosition + 'px'};
`

// height: ${props => props.gameHeight / 50 + 'px'};
const ButtonContainer = styled.div`
height: 100%;
width: 100%;
display: flex;
align-items: center;
justify-content: center;
`

const StartButton = styled.div`
background-color:#00ff7f ;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
margin: ${props => props.gameWidth / 50 + 'px'};
height: ${props => props.gameHeight / 10 + 'px'};
width: ${props => props.gameWidth / 10 + 'px'};
&: hover {
  border-style: solid
}
`

const Description = styled.p`
color: white;
`

export default FlappybirdAI