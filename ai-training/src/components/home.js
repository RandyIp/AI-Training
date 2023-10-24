import React from 'react';
import styled from 'styled-components';
import introImg from '../images/WaveRobot.jpeg'
import { useState } from 'react'
import ModalRandyAI from './mini-components/ModalRandyAI.js'
// import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

const Home = ({ setPage }) => {
  const [modal, setModal] = useState(false)
  const [query, setQuery] = useState('')
  const [answer, setAnswer] = useState('')

  const systemMessage = {
    "role": "system", "content": "Explain things like you know that Randy has a master's degree in statistics, Randy currently works at Sirch as a machine learning engineer, Randy has had an internship at Ethereum as a machine learning engineer and has worked as quality assurance at Googain, Randy is also a software engineer, you are Randy's AI assistant. Randy loves the comapny Apple."
  }

  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT"
    }
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    setQuery('')
    if (query.length > 0) { setAnswer('Hm...Let me think about that...') }
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) { // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message }
    });

    // console.log(apiMessages)
    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act.
    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,  // The system message DEFINES the logic of our chatGPT
        ...apiMessages // The messages from our chat with ChatGPT
      ]
    }

    await fetch("https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(apiRequestBody)
      }).then((data) => {
        return data.json();
      }).then((data) => {
        // console.log(data);
        setMessages([...chatMessages, {
          message: data.choices[0].message.content,
          sender: "ChatGPT"
        }]);
        setAnswer(data.choices[0].message.content)
        // setIsTyping(false);
      });
  }

  return (
    <FlexContainer>
      <LeftContainer>
        <Header>
          Welcome, it's nice to meet you. Randy is a software engineer specializing in machine learning based in the Bay Area.
        </Header>
        <SmallerHeader>If there's anything else you want to know about him, feel free to ask me or browse around.
        </SmallerHeader>
        <Questions type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        <Button style={{ backgroundColor: '#006400', hover: { backgroundColor: '#00ff7f' } }} radius='full' onClick={() => handleSend(query)}>Ask Me!</Button>
        <Answers>{answer}</Answers>
      </LeftContainer>
      <RightContainer>
        <IntroImg src={introImg} />
        <RandyAIText>Randy takes good care of me, but if you want to check up on me click the button below!</RandyAIText>
        <HealthButton onClick={() => setModal(!modal)}>Check my Health</HealthButton>
      </RightContainer>
      <ModalRandyAI modal={modal} setModal={setModal}></ModalRandyAI>
    </FlexContainer >
  )
}

const FlexContainer = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
align-items:center;
height: 100vh;
`

const Header = styled.h3`
font-size: x-large;
color: white;
margin-bottom: 5px;
`

const SmallerHeader = styled.p`
font - size: large;
color: beige;
margin-bottom: 5px;
`

const IntroImg = styled.img`
height: 70%;
width: 100%;
`

const LeftContainer = styled.div`
margin-top: 3%;
width: 450px;
`

const RightContainer = styled.div`
padding-left:10%;
margin-top: 3%;
width: 450px;
@media (max-width: 820px){
  padding-left: 0%;
}
`

const Questions = styled.input`
width: 100%;
margin-bottom: 5px;
`

const Answers = styled.div`
color:white;
display: flex;
flex-direction: column-reverse;
overflow: auto;
height: 200px;
padding-top:10vh;
`

// const Button = styled.div`
// display: flex;
// background-color: #00ff7f;
// width: max-content;
// height: max-content;
// padding: 1%;
// margin: 1%;
// color: #1b3e59;
// border-radius: 15px;
// cursor: pointer;
// &:hover{
//   background-color: beige;
// }
// `

const RandyAIText = styled.p`
color: white;
`
const HealthButton = styled.div`
width: 100%
height: 5%;
color: white;
border: 2px solid #00ff7f;
cursor: pointer;
text-align: center;
&: hover {
  background-color: #006400;
}
`

export default Home