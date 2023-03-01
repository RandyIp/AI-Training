import React from 'react';
import styled from 'styled-components';

const Homepage = () => {
  return (<div>
    <Container>
      <Header>Welcome!</Header>
    </Container>
    <Container>
      <Header>Test</Header>
    </Container>
  </div>)
}

const Container = styled.div`
background-color: black;
height: 100vh;
width: 100vw;
margin:0;
`

const Container2 = styled.div`
background-color: black;
height: 100vh;
width: 100vw;
margin:0;
`

const Header = styled.h1`
color: green;
margin: 0;
text-align: center
`

export default Homepage