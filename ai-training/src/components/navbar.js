import React from 'react';
import styled from 'styled-components';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const Navbar = ({ page, setPage, setScroll }) => {

  const switchPage = () => {
    if (page != 'Menu') {
      setPage('Menu')
      setScroll()
    }
    else setPage('Home')
  }

  return (
    <Container>
      <Header>Randy Ip</Header>
      <Menu onClick={() => switchPage()}>
        {page != 'Menu' && <MenuIcon fontSize='large' />}
        {page == 'Menu' && <ArrowBackIosNewIcon fontSize='large' />}
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
background-color: transparent;
display: flex;
margin: 0;
`

const Header = styled.h1`
color:beige;
width: max-content;
padding: 1vw 1vw 1vw 1vw;
margin: 0;
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
&:hover{
  background-color:#00ff7f;
}
`
export default Navbar