import React from 'react'
import { useState, useRef } from 'react'
import styled from 'styled-components';
import DrawingBoard from './mini-components/DrawingBoard.js'
import Visualization from './mini-components/Visualization.js'

const NeuralNetwork = () => {

  const pixelColumns = 28
  const pixelRows = 28
  // const gridArray = Array.from(Array(pixelColumns * pixelRows).keys())
  const [drawingBoard, setDrawingBoard] = useState(Array(pixelColumns * pixelRows).fill(0))

  const drawing = useRef(false)

  // let test = [[1, 3], [2, 2], [3, 1]]
  // console.log(formulas.covMat(test))

  return (
    <Container onMouseDown={() => drawing.current = true} onMouseUp={() => drawing.current = false}>
      <Filler />
      <UpperContainer>
        <DrawingBoardContainer>
          <DrawingBoard
            pixelColumns={pixelColumns}
            pixelRows={pixelRows}
            drawing={drawing}
            drawingBoard={drawingBoard}
            setDrawingBoard={setDrawingBoard}
          />
        </DrawingBoardContainer>
        <Visualization
          pixelRows={pixelRows}
          drawingBoard={drawingBoard}
        />
      </UpperContainer>
      <Description>
        Use the drawing board on the left to draw a number between 0 and 9. Drag your mouse slowly and hold down the mouse button. <br /> The right side shows how a machine can use linear algebra to predict your number. Darker pixels represent dimensions that contain more information.  <br /> Check out my {<a href="https://medium.com/@randyip9/basic-machine-learning-dimensionality-reduction-f9bbccf367b" target="_blank" rel="noreferrer">medium article</a>} to get a better intuition on how this works.
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

const DrawingBoardContainer = styled.div`
width: 50%;
height: 100%;
`

// border:1px solid black;
// const DrawingPixel = styled.div`
// background-color: ${prop => prop.color ? 'black' : 'white'};
// width: 100%;
// height: 100%;
// object-fit:cover;
// `

const Description = styled.div`
text-align: center;
color: white;
`

export default NeuralNetwork