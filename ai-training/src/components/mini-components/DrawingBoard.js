import React from 'react';
import { useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import formulas from '../../fakeServer/formulas.js'
import data from '../../fakeServer/db.json'

const DrawingBoard = ({ pixelColumns, pixelRows, drawing, drawingBoard, setDrawingBoard }) => {
  // --------------------------------------- Admin ---------------------------------------
  // set to true or false to turn on and off, used to add data to data set
  const admin = false
  const numberToAdd = useRef('0')
  const array0to9 = Array.from(Array(10).keys())

  // adds data in truncatedSVD format
  const addData = () => {
    axios.post('http://localhost:3000/' + numberToAdd.current,
      { "data": formulas.truncatedSVD(drawingBoard, pixelRows) },
      { headers: { 'content-type': 'application/json' } })
    setDrawingBoard(Array(pixelColumns * pixelRows).fill(0))
  }

  const train = () => {
    // set dataSet in correct format
    // let dataSet = []
    // for (let i = 0; i < 10; i++) {
    //   for (let j = 0; j < data[i].length; j++) {
    //     dataSet.push(formulas.standardize(data[i][j].data.flat()))
    //   }
    // }

    // // Create PCA dataset and the projection matrix onto PCA plane
    // let PCADataSet = formulas.PCA(dataSet)
    // let projectionMatrix = formulas.projection(PCADataSet, true)
    // let labeledData = {}
    // let pointer = 0
    // for (let i = 0; i < 10; i++) {
    //   labeledData[i] = []
    //   for (let j = 0; j < data[i].length; j++) {
    //     labeledData[i].push(PCADataSet[pointer++])
    //   }
    // }

    // Create binary SVMs
    var result = {}
    for (let i = 0; i < 10; i++) {
      for (let j = i + 1; j < 10; j++) {
        let dataPoints = []
        for (let k of data[i]) dataPoints.push(k.data.flat())
        for (let k of data[j]) dataPoints.push(k.data.flat())
        let labels = Array(data[i].length).fill(-1).concat(Array(data[j].length).fill(1))
        let SVM = formulas.svm(dataPoints, labels)
        result['' + i + j] = {
          'N': SVM.N,
          'D': SVM.D,
          'b': SVM.b,
          'kernelType': SVM.kernelType,
          'w': SVM.w,
          "alpha": SVM.alpha,
          // "data": SVM.data,
          "usew_": SVM.usew_,
          "labels": SVM.labels
        }
      }
    }

    // Save training into server
    // axios.patch('http://localhost:3000/projectionMatrix/',
    //   { matrix: projectionMatrix },
    //   { headers: { 'content-type': 'application/json' } }).then
    (axios.patch('http://localhost:3000/SVM/',
      result,
      { headers: { 'content-type': 'application/json' } }))
      .then(alert('Training complete'))
  }

  // const analyze = () => {
  //   let i = 0
  //   let j = 1
  //   // let tempArray = formulas.projectVector(data.projectionMatrix.matrix, formulas.standardize(formulas.truncatedSVD(drawingBoard, pixelRows).flat()))
  //   let tempArray = formulas.truncatedSVD(drawingBoard, pixelRows).flat()
  //   while (j < 10) {
  //     let temp = data.SVM['' + i + j]
  //     Object.setPrototypeOf(temp, formulas.svmPrototype)
  //     if (temp.predict([tempArray])[0] === 1) i = j
  //     j += 1
  //   }
  //   alert('prediction is ' + i)
  // }

  // --------------------------------------- End Admin ---------------------------------------

  const gridArray = Array.from(Array(pixelColumns * pixelRows).keys())
  // const [drawingBoard, setDrawingBoard] = useState(Array(pixelRows).fill(Array(pixelColumns).fill(0)))

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
export default DrawingBoard