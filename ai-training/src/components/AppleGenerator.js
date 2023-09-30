import React, { useState } from 'react';
import styled from 'styled-components';
import apple from '../images/apple.webp'
import fourOhFour from '../images/404.avif'
import loading from '../images/loading.gif'
import axios from 'axios'
// import OpenAI from "openai";



const AppleGenerator = () => {
  const [userPrompt, setUserPrompt] = useState('')
  const [image, setImage] = useState(apple)

  async function generateImage() {
    setImage(loading);

    try {
      const requestData = {
        prompt: userPrompt + 'Apple',
        n: 1,
        size: '256x256', // Set the desired image size here
      };

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      };

      const response = await axios.post('https://api.openai.com/v1/images/generations', requestData, {
        headers: headers,
      });
      setImage(response.data.data[0].url);
    } catch (error) {
      console.error('Error generating images:', error);
      setImage(fourOhFour)
    } finally {
      // setIsLoading(false);
      // console.log('Image created')
    }
  }

  return (
    <Container>
      <Title>Apple Generator</Title>
      <Logo src={image} />
      <UserPrompt placeholder='Describe your apple' value={userPrompt} onChange={(e) => setUserPrompt(e.target.value)} />
      <ButtonContainer>
        <Button onClick={() => generateImage()}>Generate</Button>
        <Button>Random</Button>
      </ButtonContainer>
    </Container>
  )
}

const Container = styled.div`
color: black;
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

const Title = styled.h1`
color: white;
`

const Logo = styled.img`
height: 256px;
width: 256px;
object-fit: contain;
`

const UserPrompt = styled.input`
width: 256px;
`

const ButtonContainer = styled.div`
display: flex
`

const Button = styled.div`
display: flex;
background-color: #00ff7f;
width: 128px;
height: max-content;
padding: 1%;
margin: 1%;
color: #1b3e59;
border-radius: 15px;
cursor: pointer;
&:hover{
  background-color: beige;
}
`

export default AppleGenerator