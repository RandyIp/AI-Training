import React from 'react';
import styled from 'styled-components';
import ProfilePic from '../images/ProfilePic.jpeg'

const About = () => {
  return (
    <Container>
      <Header>About</Header>
      <FlexContainer>
        <TextContainer>
          <Text1>
            I'm a software engineer with an interest in machine learning as well. I have a master's in statistics with a specilization in machine learning. Shortly after, I attended a software engineering bootcamp to further reinforce my skills as a machine learning engineer. Now, I am equipped with both skills as a software engineer and machine learning engineer.
          </Text1>
          <Text2>
            As an advent learner, I'm always reading learning about new technologies that show up over the years. If you think we'd work well together, feel free to contact me.
          </Text2>
        </TextContainer>
        <ImageContainer>
          <ProfileImg src={ProfilePic} />
        </ImageContainer>
      </FlexContainer>
    </Container>
  )
}

const Container = styled.div`
`

const Header = styled.h1`
color:white;
`

const FlexContainer = styled.div`
display: flex;
color:white;
`

const TextContainer = styled.div`
padding: 10vw;
`

const Text1 = styled.p`
color: #66FF99;
`

const Text2 = styled.p`
color: beige;
`

const ImageContainer = styled.div`
padding: 10vw;
color:white;
`

const LinksContainer = styled.div`
display: flex;

`

const ProfileImg = styled.img`
height: 40vh;
width: 40vw;
object-fit: contain;
`


export default About