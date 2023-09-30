import React, { useState } from 'react'
import styled from 'styled-components';
import normal from '../../images/RandyAI_Normal.png'
import base from '../../images/RandyAI_Base.png'
import stress from '../../images/RandyAI_Stress.png'
import negative from '../../images/RandyAI_Negative.png'
import security from '../../images/RandyAI_Security.png'
import summary from '../../images/RandyAI_Summary.png'

const ModalRandyAI = ({ modal, setModal }) => {
  const images = {
    'Base': base,
    'Normal': normal,
    'Stress': stress,
    'Negative': negative,
    'Security': security,
    'Summary': summary
  }
  const [buttonState, setButtonState] = useState('Base')
  const buttonNames = ['Base', 'Normal', 'Stress', 'Negative', 'Security', 'Summary']
  return (
    <Container modal={modal} >
      <Overlay onClick={() => setModal(false)} />
      <Content>
        <ButtonGrid>
          {buttonNames.map(name => (
            <ButtonContainer>
              <Button
                buttonState={buttonState}
                name={name}
                onClick={() => setButtonState(name)}>
                {name}
              </Button>
            </ButtonContainer>
          ))}
          <Xcontainer>
            <button onClick={() => setModal(false)}>X</button>
          </Xcontainer>
        </ButtonGrid>
        <ImageContainer>
          <ImageDisplay buttonState={buttonState} src={images[buttonState]}></ImageDisplay>
        </ImageContainer>
      </Content>
    </Container>
  )
}

const Container = styled.div`
display: ${props => props.modal ? "flex" : "none"};
align-items: center;
justify-content: center;
height: 100vh;
width: 100vw;
position: fixed;
top: 0;
z-index: 9002;
`

const Overlay = styled.div`
position: fixed;
top: 0;
z-index: 9003;
background-color: grey;
opacity: 0.5;
height: 100%;
width: 100%
`

const Content = styled.div`
z-index: 9004;
position: fixed:
top: 20%;
left: 20%;
height: 80%;
width: 80%;
background-color: white;
`

const ButtonGrid = styled.div`
display: grid;
grid-template-columns: 3fr 3fr 3fr 3fr 3fr 3fr 3fr 1fr
`

const ButtonContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
`
const Button = styled.div`
display: flex;
align-items: center;
justify-content:center;
background-color: ${props => props.buttonState === props.name ? '#1CAC78' : 'beige'};
width: max-width;
height: max-content;
color: #1b3e59;
border-style: solid;
margin-top: 10%;
cursor: pointer;
&:hover{
  background-color: #1CAC78;
}
`

const Xcontainer = styled.div`
display: flex;
justify-content: flex-end
`

const ImageContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100%;
width: 100%;
`

const ImageDisplay = styled.img`
height: ${props => props.buttonState === 'Summary' ? '80%' : '100%'};
width: ${props => props.buttonState === 'Summary' ? '80%' : '100%'};
object-fit: contain;
`
export default ModalRandyAI