import React from 'react';
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import formulas from '../../fakeServer/formulas.js'

const DrawingBoard = ({ pixelColumns, pixelRows, drawing }) => {
  // --------------------------------------- Admin ---------------------------------------
  // set to true or false to turn on and off, used to add data to data set
  const admin = true
  const numberToAdd = useRef('0')
  const array0to9 = Array.from(Array(10).keys())
  const addData = () => {
    if (numberToAdd.current == 'metadata') {
      axios.get('http://localhost:3000/db')
        .then(result => {
          var metadata = {}
          for (var i in array0to9) {
            metadata[i] = result.data[i].length
          }
          console.log(metadata)
        })
    }
    else {
      axios.post('http://localhost:3000/' + numberToAdd.current,
        { "data": drawingBoard },
        { headers: { 'content-type': 'application/json' } })
    }
    setDrawingBoard(Array(pixelColumns * pixelRows).fill(0))
  }

  const train = () => {

  }

  // --------------------------------------- Admin ---------------------------------------
  const gridArray = Array.from(Array(pixelColumns * pixelRows).keys())
  // const [drawingBoard, setDrawingBoard] = useState(Array(pixelRows).fill(Array(pixelColumns).fill(0)))
  const [drawingBoard, setDrawingBoard] = useState(Array(pixelColumns * pixelRows).fill(0))

  const draw = (coordinate) => {
    var temp = [...drawingBoard]
    temp[coordinate] = 1
    setDrawingBoard(temp)
  }

  return (<DrawingBoardContainer onMouseDown={() => drawing.current = true}>
    <Canvas pixelColumns={pixelColumns} pixelRows={pixelRows}>
      {gridArray.map(coordinate => (
        <DrawingPixel
          onMouseDown={() => draw(coordinate)} color={drawingBoard[coordinate]}
          onMouseEnter={() => {
            if (drawing.current) draw(coordinate)
          }}
        />
      ))}
    </Canvas>
    {admin && <LowerContainer>
      <ButtonContainer>
        <select onChange={(e) => numberToAdd.current = e.target.value}>
          {array0to9.map(number => (
            <option value={number}>{number}</option>
          ))}
          <option value='metadata'>meta data</option>
        </select>
      </ButtonContainer>
      <ButtonContainer>
        <Button onClick={() => addData()}>Add Data</Button>
      </ButtonContainer>
      <ButtonContainer>
        <Button onClick={() => train()}>Train</Button>
      </ButtonContainer>
    </LowerContainer>}
    {!admin && <LowerContainer>
      <ButtonContainer>
      </ButtonContainer>
      <ButtonContainer>
        <Button onClick={() => setDrawingBoard(Array(pixelColumns * pixelRows).fill(0))}>Clear</Button>
      </ButtonContainer>
      <ButtonContainer />
    </LowerContainer>}
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

const LowerContainer = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr;
height: 8vh;
width: 50vw;
`

const ButtonContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
`

const Button = styled.div`
background-color: green;
cursor: pointer;
text-align: center;
border-radius: 25px;
height: 4vh;
width: 12.5vw;
&:hover{
  background-color:#00ff7f;
}
`

const ClearButton = styled.div`
background-color: green;
`
export default DrawingBoard