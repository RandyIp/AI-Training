import React from 'react';
import styled from 'styled-components';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const Navbar = ({ page, setPage, setScroll }) => {
  return (
    <Container>
      <Header>Randy Ip</Header>
      <Menu>
        {page != 'Menu' && <MenuIcon
          fontSize='large'
          onClick={() => {
            setPage('Menu')
            setScroll()
          }}
        />}
        {page == 'Menu' && <ArrowBackIosNewIcon
          fontSize='large'
          onClick={() => setPage('Home')}
        />
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
background-color: #00ff7f;
display: flex;
`

const Header = styled.h1`
color:black;
width: max-content;
margin: 0 0 0 1vw;
`

const Menu = styled.div`
position: fixed;
right: 1vw;
cursor: pointer;
&:hover{
  background-color:white;
}
`
export default Navbar