import React from 'react';
import styled from 'styled-components';
import Handwritten9 from '../images/Handwritten9.png'
import FlappyBird from '../images/Flappy_Bird_icon.png'

const Projects = ({ setPage }) => {
  return (
    <Container>
      <Header>Projects</Header>
      <Card onClick={() => setPage('project1')}>
        <ImageContainer src={Handwritten9} />
        <DescContainer>
          <ProjectTitle>Machine Learning Visualization</ProjectTitle>
          <ProjectDesc>Observe how a neural network works on a MNIST dataset</ProjectDesc>
        </DescContainer>
      </Card>
      {/* <Card onClick={() => setPage('project3')}> */}
      <Card>
        <ImageContainer src={FlappyBird} />
        <DescContainer>
          <ProjectTitle>Flappy Bird AI</ProjectTitle>
          <ProjectDesc>Coming Soon.</ProjectDesc>
        </DescContainer>
      </Card>
    </Container>
  )
}

const Container = styled.div`
padding: 0 10vw 0 10vw;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

const Header = styled.h1`
color:white;
text-align: center;
text-decoration: underline
`

// const Card = styled.div`
// width: 40%
// height: max-content;
// color: white;
// border: 2px solid #00ff7f;
// cursor: pointer;
// margin: 0 0 1em 0;
// &: hover {
//   background-color: #006400;
// }
// `

const ProjectTitle = styled.p`
font-size: 1.5em;
margin: 0;
`

const ProjectDesc = styled.p`
font-size: 1em;
margin: 0;
`

const Card = styled.div`
display: flex;
background-color: #00ff7f;
width: 50vw;
height: 10vh;
padding: 20px;
margin: 20px;
color: #1b3e59;
border-radius: 15px;
box-shadow: 8px 8px 16px 2px #1b3e59;
cursor: pointer;
&:hover{
  background-color: beige;
}
`
const DescContainer = styled.div`
width: 80%;
`

const ImageContainer = styled.img`
width: 10%;
object-fit: contain;
`

export default Projects