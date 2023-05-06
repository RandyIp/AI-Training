import React from 'react'
import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components';

const NeuralNetwork = () => {
  return (
    <Container>
      <UpperContainer></UpperContainer>
      <Description>
        Use the right drawing board to draw a number between 0 and 9 to see how an AI would use neural networks to predict your number. <br /> Alternatively, draw something random and see what number the AI thinks it is.
      </Description>
    </Container>
  )
}

const Container = styled.div`
background-color: black;
height: 100vh;
width: 100vw;
margin: 0;
display: flex;
flex-direction: column;
`

const UpperContainer = styled.div`
display: flex;
height: 90vh;
width: 100vw;
`

const Description = styled.div`
text-align: center;
color: white;
`

export default NeuralNetwork