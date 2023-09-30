import React from 'react';
import styled from 'styled-components';
// import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

const Navbar = ({ page, setPage, setScroll }) => {

  return (
    <Container>
      <Left>
        <Header
          onClick={() => {
            if (page === 'Home') setScroll('Home')
            else setPage('Home')
          }}
        >
          Randy Ip</Header>

        <LinksContainer>
          <LinkedInIcon
            fontSize='large'
            style={{
              margin: '0.5vw',
              cursor: 'pointer'
            }}
            onClick={() => window.open('https://www.linkedin.com/in/randy-ip/')}
          />
          <GitHubIcon
            fontSize='large'
            style={{
              margin: '0.5vw',
              cursor: 'pointer'
            }}
            onClick={() => window.open('https://github.com/RandyIp')}
          />
          <EmailIcon
            fontSize='large'
            style={{
              margin: '0.5vw',
              cursor: 'pointer'
            }}
            onClick={(e) => {
              window.location.href = "mailto:randyip9@gmail.com";
              e.preventDefault()
            }
            }
          />
        </LinksContainer>
      </Left>
      <Menu>

        {page === 'Home' && <Options
          onClick={() => {
            setPage('Home')
            setScroll('About')
          }}>
          About</Options>}

        {page === 'Home' && <Options
          onClick={() => {
            setPage('Home')
            setScroll('Project')
          }}>
          Projects</Options>}

        {page !== 'Home' &&
          <ArrowContainer onClick={() => setPage('Home')}>
            <ArrowBackIosNewIcon fontSize='large' />
          </ArrowContainer>
        }

      </Menu>
    </Container>
  )
}

const Container = styled.div`
position: fixed;
top: 0;
z-index: 9001;
height: max-content;
width: 100vw;
background-color: black;
display: flex;
margin: 0;
`

const Header = styled.h1`
color: beige;
width: max-content;
min-width: fit-content;
padding: 1% 1% 1% 1%;
margin: 1%;
cursor: pointer;
`

const Menu = styled.div`
display: flex;
justify-content: center;
align-items: center;
position: fixed;
right: 0;
padding: 1vw 1vw 1vw 1vw;
margin: 0;
cursor: pointer;
color: beige;
`

const Options = styled.div`
height: 100%;
width: 100%;
padding: 1vw 1vw 1vw 1vw;
justify-content: center;
align-items: center;
&:hover{
  background-color:#00ff7f;
}
`

const Left = styled.div`
display: flex;
align-items: center;
`

const LinksContainer = styled.div`
display: flex;
color: beige;
`

const ArrowContainer = styled.div`
cursor: pointer;
&:hover{
  background-color:#00ff7f;
}
`
export default Navbar