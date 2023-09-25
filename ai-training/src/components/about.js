import React from 'react';
import styled from 'styled-components';
import ProfilePic from '../images/ProfilePic.jpg'
import Resume from '../pdf/Resume.pdf'

const About = () => {
  return (
    <Container>
      <Header>About</Header>
      <FlexContainer>
        <TextContainer>
          <Text1>
            I'm a software/machine learning engineer with a master's in statistics specializing in machine learning and an advanced software engineering certificate from Hack Reactor.
          </Text1>
          <Text2>
            One of my notable projects involved building time series machine learning models for Ethereum to predict and detect fraud within their system. As a software and machine learning engineer, I have successfully implemented several end-to-end machine learning projects.
          </Text2>
          <Text1>
            My dedication to learning and expanding my skillset is evident in my progress over the years. I am happy to share my knowledge with others and always seek new opportunities to grow and develop.
          </Text1>
          <ResumeButton onClick={() => window.open(Resume)}>
            Resume (PDF)
          </ResumeButton>
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
padding: 5vw 0 0 0;
text-align: center;
text-decoration: underline;
`

//set flex-wrap reverse only on mobile
const FlexContainer = styled.div`
display: flex;
color:white;
`

const TextContainer = styled.div`
padding: 5vw 10vw 0 10vw;
margin-right: 10%;
width: 400px;
`

const Text1 = styled.p`
color: #66FF99;
`

const Text2 = styled.p`
color: beige;
`

const ImageContainer = styled.div`
display: flex;
width: 450px;
padding: 5vw 5vw 0 0;
`

const ProfileImg = styled.img`
height: 80%;
width: 100%;
object-fit: contain;
`

const ResumeButton = styled.div`
width: 40%
height: max-content;
color: white;
border: 2px solid #00ff7f;
cursor: pointer;
margin: 5em 0 1em 0;
text-align: center;
&: hover {
  background-color: #006400;
}
`

export default About