import React from 'react'
import styled from 'styled-components'

const Menu = ({ setPage, HomeRef, setScroll }) => {
  return (
    <MenuContainer>
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
background-color: black;
height:100vh;
margin: 0;
padding: 0
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