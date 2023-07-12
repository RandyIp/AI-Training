import React from 'react';
import styled from 'styled-components';
import ProfilePic from '../images/ProfilePic.jpeg'
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import GitHubIcon from '@mui/icons-material/GitHub';
// import EmailIcon from '@mui/icons-material/Email';
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
          {/* <LinksContainer>
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
          </LinksContainer> */}
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
padding: 5vw 5vw 0 0;
color:white;
align-items: center
`

// const LinksContainer = styled.div`
// display: flex;
// color: beige;
// `

const ProfileImg = styled.img`
height: 40vh;
width: 40vw;
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