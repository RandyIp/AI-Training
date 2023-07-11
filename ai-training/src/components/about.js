import React from 'react';
import styled from 'styled-components';
import ProfilePic from '../images/ProfilePic.jpeg'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

const About = () => {
  return (
    <Container>
      <Header>About</Header>
      <FlexContainer>
        <TextContainer>
          <Text1>
            I'm a software/machine learning engineer and have both a master's in statistics specializing in machine learning and an advanced software engineering certificate from Hack Reactor. I have worked hard over the years to build up my skills in the fields and will be happy to share them with you if you're interested.
          </Text1>
          <Text2>
            I have built time series machine learning models for Ethereum which helped predict and detect fraud within their system. Since I also understand databases as a software engineer, I was able to pull the data and build the models for them. With skills as both a software and machine learning engineer, I've been able to build end to end machine learning projects.
          </Text2>
          <Text1>
            Although I have a good breadth of knowledge, I keep looking for new ways to learn and improve my skillset. I'm always looking for the next big project to work on passionately.
          </Text1>
        </TextContainer>
        <ImageContainer>
          <LinksContainer>
            <LinkedInIcon
              fontSize='large'
              style={{
                margin: '1vw',
                cursor: 'pointer'
              }}
              onClick={() => window.open('https://www.linkedin.com/in/randy-ip/')}
            />
            <GitHubIcon
              fontSize='large'
              style={{
                margin: '1vw',
                cursor: 'pointer'
              }}
              onClick={() => window.open('https://github.com/RandyIp')}
            />
            <EmailIcon
              fontSize='large'
              style={{
                margin: '1vw',
                cursor: 'pointer'
              }}
              onClick={(e) => {
                window.location.href = "mailto:randyip9@gmail.com";
                e.preventDefault()
              }
              }
            />
          </LinksContainer>
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
padding: 5vw 0 0 10vw;
`

const FlexContainer = styled.div`
display: flex;
color:white;
`

const TextContainer = styled.div`
padding: 5vw 10vw 0 10vw;
`

const Text1 = styled.p`
color: #66FF99;
`

const Text2 = styled.p`
color: beige;
`

const ImageContainer = styled.div`
display: flex;
flex-direction: column;
padding: 0vw 5vw 0 0;
color:white;
align-items: center
`

const LinksContainer = styled.div`
display: flex;
color: beige;
`

const ProfileImg = styled.img`
height: 40vh;
width: 40vw;
object-fit: contain;
`


export default About