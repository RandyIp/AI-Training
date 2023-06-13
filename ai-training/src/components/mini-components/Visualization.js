import React from 'react'
import { useState } from 'react'
import formulas from '../../fakeServer/formulas.js'
import styled from 'styled-components';
import ShadeGenerator from 'shade-generator'
import data from '../../fakeServer/db.json'

const Visualization = ({ pixelRows, drawingBoard }) => {

  // set up
  const gridSVDArray = Array.from(Array(pixelRows ** 2).keys())
  var SVDarray = formulas.truncatedSVD(drawingBoard, pixelRows).flat()
  for (let i = 0; i < SVDarray.length; i++) {
    if (isNaN(SVDarray[i])) SVDarray[i] = 0
  }

  const PCAdimension = Math.floor(Math.sqrt(data.projectionMatrix.matrix.length))
  const PCAArray = formulas.projectVector(data.projectionMatrix.matrix, SVDarray)
  for (let i = 0; i < PCAArray.length; i++) {
    if (isNaN(PCAArray[i])) PCAArray[i] = 0
  }
  const gridPCAArray = Array.from(Array(PCAdimension ** 2).keys())

  const analyze = () => {
    let i = 0
    let j = 1
    while (j < 10) {
      let temp = data.SVM['' + i + j]
      Object.setPrototypeOf(temp, formulas.svmPrototype)
      if (temp.predict([SVDarray])[0] === 1) i = j
      j += 1
    }
    return i
  }
  let prediction = analyze()
  const gridSVMArray = Array.from(Array(10).keys())

  // color shade
  const map = {
    "0": 10,
    "1": 20,
    "2": 30,
    "3": 40,
    "4": 50,
    "5": 60,
    "6": 100,
    "7": 400,
    "8": 500,
    "9": 1000,
  }
  const colormap = ShadeGenerator.hue("#808080").shadesMap("hex")
  const greaterThanOne = (n) => {
    if (isNaN(n)) return 0
    if (n >= 10) return 9
    else return n
  }

  return (
    <VisualizationContainer>
      <SVDcontainer>
        <TextDiv>
        </TextDiv>
        <GridSVD pixelColumns={pixelRows} pixelRows={pixelRows}>
          {gridSVDArray.map(coordinate => (<DrawingPixel
            colormap={colormap}
            value={SVDarray[coordinate]}
            map={map}
            greaterThanOne={greaterThanOne}
          />))}
        </GridSVD>
        <TextDiv>
          <TextBox>SVD</TextBox>
        </TextDiv>
      </SVDcontainer>
      <PCAcontainer>
        <TextDiv></TextDiv>
        <GridPCA PCAdimension={PCAdimension}>
          {gridPCAArray.map(coordinate => (<DrawingPixel
            colormap={colormap}
            value={PCAArray[coordinate]}
            map={map}
            greaterThanOne={greaterThanOne}
          />))}
        </GridPCA>
        <TextDiv>
          <TextBox>
            PCA
          </TextBox>
        </TextDiv>
      </PCAcontainer>
      <SVMcontainer>
        <TextDiv></TextDiv>
        <SVMGridContainer>
          <TextDiv></TextDiv>
          <GridSVM>
            {gridSVMArray.map(coordinate => (<PredictionPixel
              value={coordinate}
              prediction={prediction}
            >{coordinate}</PredictionPixel>))}
          </GridSVM>
        </SVMGridContainer>
        <TextDiv>
          <TextBox>SVM </TextBox>
        </TextDiv>
      </SVMcontainer>
    </VisualizationContainer>
  )
}

const VisualizationContainer = styled.div`
display: flex;
flex-direction: column;
`

const SVDcontainer = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr;
height: 50%;
width: 100%;
`

const PCAcontainer = styled.div`
display: grid;
grid-template-columns: 2fr 1fr 2fr;
height: 25%;
width: 100%;
`

const SVMcontainer = styled.div`
display:grid;
height: 25%;
width: 100%;
grid-template-columns: 1fr 1fr 1fr;
`

const GridSVD = styled.div`
display: grid;
grid-template-columns: ${props => 'repeat(' + props.pixelColumns + ',' + 50 / 3 / props.pixelColumns + 'vw)'};
grid-template-rows: ${props => 'repeat(' + props.pixelRows + ',' + 36 / props.pixelRows + 'vh)'};
width: 100%;
height: 100%;
`

const GridPCA = styled.div`
display: grid;
grid-template-columns: ${props => 'repeat(' + props.PCAdimension + ',' + 50 / 5 / props.PCAdimension + 'vw)'};
grid-template-rows: ${props => 'repeat(' + props.PCAdimension + ',' + 18 / props.PCAdimension + 'vh)'};
width: 100%;
height: 100%;
`

const SVMGridContainer = styled.div`
display: grid;
grid-template-rows: 1fr 1fr 1fr
`

const GridSVM = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
height: 10%
`
const DrawingPixel = styled.div`
background-color: ${props => props.colormap[props.map[props.greaterThanOne(Math.floor(Math.abs(props.value) * 10))]]};
object-fit:cover;
`

const PredictionPixel = styled.div`
text-align: center;
background-color: ${props => props.value === props.prediction ? 'black' : 'white'};
color: ${props => props.value === props.prediction ? 'green' : 'black'};
object-fit:cover;
`

const TextDiv = styled.div`
display: flex;
align-items: center;
`

const TextBox = styled.div`
background-color: green;
text-align: center;
position: absolute;
right: 5vw;
`

export default Visualization