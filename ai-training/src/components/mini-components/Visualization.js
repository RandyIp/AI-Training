import React from 'react'
import { useState } from 'react'
import formulas from '../../fakeServer/formulas.js'
import styled from 'styled-components';
import ShadeGenerator from 'shade-generator'

const Visualization = ({ pixelRows, drawingBoard }) => {

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
    if (n >= 10) return 9
    else return n
  }

  console.log(greaterThanOne(20))
  const gridSVDArray = Array.from(Array(pixelRows ** 2).keys())

  const SVDarray = formulas.truncatedSVD(drawingBoard, pixelRows).flat()
  console.log(SVDarray)

  return (
    <VisualizationContainer>
      <SVDcontainer>
        <TestDiv></TestDiv>
        <div>
          <GridSVD pixelColumns={pixelRows} pixelRows={pixelRows}>
            {gridSVDArray.map(coordinate => (<DrawingPixel
              colormap={colormap}
              value={SVDarray[coordinate]}
              map={map}
              greaterThanOne={greaterThanOne}
            />))}
          </GridSVD>
        </div>
        <TestDiv>hi</TestDiv>
      </SVDcontainer>
      <PCAcontainer>
        bye
      </PCAcontainer>
      <SVMcontainer>
        why
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
height: 25%;
width: 100%;
background-color: blue;
`

const SVMcontainer = styled.div`
height: 25%;
width: 100%;
background-color:green;
`

const GridSVD = styled.div`
display: grid;
grid-template-columns: ${props => 'repeat(' + props.pixelColumns + ',' + 50 / 3 / props.pixelColumns + 'vw)'};
grid-template-rows: ${props => 'repeat(' + props.pixelRows + ',' + 36 / props.pixelRows + 'vh)'};
width: 33%;
height: 36vh;
`

const GridPCA = styled.div`
display: grid;
grid-template-columns: ${props => 'repeat(' + props.pixelColumns + ',' + 50 / props.pixelColumns + 'vw)'};
grid-template-rows: ${props => 'repeat(' + props.pixelRows + ',' + 18 / props.pixelRows + 'vh)'};
width: 100%;
height: 18vh;
`

const DrawingPixel = styled.div`
background-color: ${props => props.colormap[props.map[props.greaterThanOne(Math.floor(Math.abs(props.value) * 10))]]};
object-fit:cover;
`

// const DrawingPixel = styled.div`
// background-color: ${props => props.colormap[props.map[-0]]};
// object-fit:cover;
// `

const TestDiv = styled.div`
width: 33%;
`

export default Visualization