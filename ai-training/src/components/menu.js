import React from 'react'
import styled from 'styled-components'

const Menu = ({ setPage, HomeRef, setScroll }) => {
  return (
    <MenuContainer>
      <p>I am menu</p>
      <List>
        <Options
          onClick={() => {
            setPage('Home')
            setScroll('Home')
          }
          }>
          Home
        </Options>
        <Options
          onClick={() => {
            setPage('Home')
            setScroll('Project')
          }
          }>Project</Options>
        <Options
          onClick={() => {
            setPage('Home')
            setScroll('About')
          }
          }>About</Options>
      </List>
    </MenuContainer>
  )
}

const MenuContainer = styled.div`
margin-top: 5vh;
background-color: black;
height:100vh;
`

const List = styled.div`
display:flex;
flex-direction: column;
justify-content: space-evenly;
color: white;
padding: 10vw;
`
const Options = styled.h1`
color: white;
cursor: pointer;
&:hover {
  background-color: #00ff7f;
}
`

export default Menu