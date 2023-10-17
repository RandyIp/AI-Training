import React from 'react';
import styled from 'styled-components';
import Handwritten9 from '../images/Handwritten9.png'
// import FlappyBird from '../images/Flappy_Bird_icon.png'
import Jarvis from '../images/jarvis.jpeg'
import apple from '../images/apple.webp'
import debug from '../images/debug.png'

const Projects = ({ setPage }) => {
  return (
    <Container>
      <Header>Projects</Header>
      <Card onClick={() => setPage('project1')}>
        <ImageContainer src={Handwritten9} />
        <DescContainer>
          <ProjectTitle>Computer Vision Demonstration</ProjectTitle>
          <ProjectDesc>Observe how a neural network works on a MNIST dataset</ProjectDesc>
        </DescContainer>
      </Card>
      <Card onClick={() => setPage('project2')}>
        <ImageContainer src={Jarvis} />
        <DescContainer>
          <ProjectTitle>Jarvis</ProjectTitle>
          <ProjectDesc>Just a Rather Very Intelligent System</ProjectDesc>
        </DescContainer>
      </Card>
      <Card onClick={() => setPage('project3')}>
        <ImageContainer src={apple} />
        <DescContainer>
          <ProjectTitle>Apple Generator</ProjectTitle>
          <ProjectDesc>Generate your own apples</ProjectDesc>
        </DescContainer>
      </Card>
      <Card onClick={() => setPage('project4')}>
        <ImageContainer src={debug} />
        <DescContainer>
          <ProjectTitle>AI Debugger</ProjectTitle>
          <ProjectDesc>Is your code bugging you? Let me fix that for you</ProjectDesc>
        </DescContainer>
      </Card>
    </Container>
  )
}

const Container = styled.div`
padding-bottom: 10%;
padding-top:10%;
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
padding: 5px;
margin: 5px;
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