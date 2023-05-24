import React from 'react'
import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components';
import DrawingBoard from './mini-components/DrawingBoard.js'
import * as tf from '@tensorflow/tfjs';
import formulas from '../fakeServer/formulas.js'

const NeuralNetwork = () => {

  const pixelColumns = 28
  const pixelRows = 28
  const gridArray = Array.from(Array(pixelColumns * pixelRows).keys())
  const [drawingBoard, setDrawingBoard] = useState(Array(pixelColumns * pixelRows).fill(0))

  const drawing = useRef(false)

  // let test = [[1, 3], [2, 2], [3, 1]]
  // console.log(formulas.covMat(test))

  return (
    <Container onMouseDown={() => drawing.current = true} onMouseUp={() => drawing.current = false}>
      <Filler />
      <UpperContainer>
        <Visualization></Visualization>
        <DrawingBoardContainer>
          <DrawingBoard
            pixelColumns={pixelColumns}
            pixelRows={pixelRows}
            drawing={drawing}
          />
        </DrawingBoardContainer>
      </UpperContainer>
      <Description>
        Use the right drawing board to draw a number between 0 and 9 to see how an AI would use neural networks to predict your  number. (drag mouse slowly and hold down the mouse button) <br /> Alternatively, draw something random and see what number the AI thinks it is.
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

const Filler = styled.div`
height: 10vh;
`

const UpperContainer = styled.div`
display: flex;
height: 80vh;
width: 100vw;
`

const Visualization = styled.div`
background-color: green;
width: 50%;
height: 100%;
`

const DrawingBoardContainer = styled.div`
width: 50%;
height: 100%;
`

const blah = styled.div`
display: grid;
grid-template-columns: ${props => 'repeat(' + props.pixelColumns + ',' + 50 / props.pixelColumns + 'vw)'};
grid-template-rows: ${props => 'repeat(' + props.pixelRows + ',' + 72 / props.pixelRows + 'vh)'};
width: 100%;
height: 72vh;
`

// border:1px solid black;
const DrawingPixel = styled.div`
background-color: ${prop => prop.color ? 'black' : 'white'};
width: 100%;
height: 100%;
object-fit:cover;
`

const Description = styled.div`
text-align: center;
color: white;
`

export default NeuralNetwork