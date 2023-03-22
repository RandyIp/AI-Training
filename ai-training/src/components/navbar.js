import React from 'react';
import styled from 'styled-components';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  return (
    <Container>
      <Header>Randy Ip</Header>
      <Menu>
        <MenuIcon fontSize='large' />
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
margin: 0;
`

const Menu = styled.div`
position: relative;
float: right;
fontSize: large;
`
export default Navbar