import React from 'react';
import styled from 'styled-components';

const Navbar = () => {
  return (
    <Container>
      <Header>Randy Ip</Header>
    </Container>
  )
}

const Container = styled.div`
position: fixed;
top: 0;
z-index: 9001;
height: max-content;
width: 100vw;
background-color: green;
`

const Header = styled.h1`
color:black;
background-color:green;
width: max-content;
margin: 0;
`
export default Navbar