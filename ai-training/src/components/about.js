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
            I'm a software engineer who specializes in machine learning. I have both a master's in statistics and an advanced software engineering certificate from Hack Reactor.
          </Text1>
          <Text2>
            I have worked on several machine learning projects for companies such as Ethereum and start up companies. I also have experience working on quality assuarance at a mortgage company which has helped me be more mindful about the quality of my code.
          </Text2>
          <Text1>
            I believe in continous learning and it is the main reason I wanted to work with technology. New and difficult things aren't to be avoided but rather approached with excitment and passion. This is what I live by, I find improvement by seeking the next challenge and tackling it with a smile.
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
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100vh;
`

const Header = styled.h1`
color:white;
padding: 5vw 0 0 0;
text-align: center;
text-decoration: underline;
font-size: large;
`

const FlexContainer = styled.div`
display: flex;
color:white;
justify-content: center;
align-items: center;
@media (max-width: 820px){
  flex-wrap: wrap-reverse;
}
`

const TextContainer = styled.div`
width: 450px;
`

const Text1 = styled.p`
color: #66FF99;
`

const Text2 = styled.p`
color: beige;
`

const ImageContainer = styled.div`
margin-left: 10%;
display: flex;
width: 450px;

`

const ProfileImg = styled.img`
height: 70%;
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