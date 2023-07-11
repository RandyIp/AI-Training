import React from 'react';
import styled from 'styled-components';

const Projects = ({ setPage }) => {
  return (
    <Container>
      <Header>Projects</Header>
      <Card onClick={() => setPage('project1')}>
        <ProjectTitle>Machine Learning Visualization</ProjectTitle>
        <ProjectDesc>Observe how a neural network works on a MNIST dataset</ProjectDesc>
      </Card>
      <Card onClick={() => setPage('project3')}>
        <ProjectTitle>Flappy Bird AI</ProjectTitle>
        <ProjectDesc>Watch an AI play Flappy Bird. Generational learning.</ProjectDesc>
      </Card>
    </Container>
  )
}

const Container = styled.div`
padding: 0 10vw 0 10vw;
`

const Header = styled.h1`
color:white;
`

const Card = styled.div`
width: 40%
height: max-content;
color: white;
border: 2px solid #00ff7f;
cursor: pointer;
margin: 0 0 1em 0;
&: hover {
  background-color: #006400;
}
`

const ProjectTitle = styled.p`
font-size: 1.5em;
margin: 0;
`

const ProjectDesc = styled.p`
font-size: 1em;
margin: 0;
`

export default Projects