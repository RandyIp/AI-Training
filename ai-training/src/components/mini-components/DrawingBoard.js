import React from 'react'
import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components';

const DrawingBoard = ({ pixelColumns, pixelRows }) => {
  const gridArray = Array.from(Array(pixelColumns * pixelRows).keys())
  // const [drawingBoard, setDrawingBoard] = useState(Array(pixelRows).fill(Array(pixelColumns).fill(0)))
  const [drawingBoard, setDrawingBoard] = useState(Array(pixelColumns * pixelRows).fill(0))

  const draw = (coordinate) => {
    var temp = [...drawingBoard]
    temp[coordinate] = 1
    setDrawingBoard(temp)
  }

  return (<DrawingBoardContainer>
    <Canvas
      pixelColumns={pixelColumns}
      pixelRows={pixelRows}
    >
      {gridArray.map(coordinate => (
        <DrawingPixel onMouseDown={() => draw(coordinate)} color={drawingBoard[coordinate]}></DrawingPixel>
      ))}
    </Canvas>
  </DrawingBoardContainer>)
}

const DrawingBoardContainer = styled.div`
width: 50%;
height: 100%;
`

const Canvas = styled.div`
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
export default DrawingBoard