import React from 'react';
import styled from 'styled-components';
import introImg from '../images/WaveRobot.jpeg'
import { useState } from 'react'

const Intro = () => {
  const [query, setQuery] = useState('')
  const [answer, setAnswer] = useState('')

  const systemMessage = { //  Explain things like you're talking to a software professional with 5 years of experience.
    "role": "system", "content": "Explain things like you know that Randy has a master's degree in statistics, Randy currently works at Sirch as a machine learning engineer, Randy has had an internship at Ethereum as a machine learning engineer and has worked as quality assurance at Googain, Randy is also a software engineer, you are Randy's AI assistant. Randy loves the comapny Apple. Randy thinks Brent is a cool guy."
  }

  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT"
    }
  ]);
  // const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    setAnswer('Hm...Let me think about that...')
    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    // setIsTyping(true);
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

    console.log(apiMessages)
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
        console.log(data);
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
          Hi there, I'm Randy's AI assistant. Randy is my creator and a machine learning engineer. If there's anything else you want to know about him, just ask me!
        </Header>
        <Questions type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        <Button onClick={() => handleSend(query)}>Ask Me!</Button>
        <Answers>{answer}</Answers>
      </LeftContainer>
      <IntroImg src={introImg} />
    </FlexContainer>
  )
}

const FlexContainer = styled.div`
display: flex;
`

const Header = styled.h3`

color: white;
`

const IntroImg = styled.img`
padding-left:10vh;
padding-top:20vh;
height: 400px;
width: 400px;
`

const LeftContainer = styled.div`
margin-left:10vw;
margin-top: 0vh;
padding-top:20vh;
width: 40vw;
`

const Questions = styled.input`
width: 100%
`

const Answers = styled.div`
color:white;
display: flex;
flex-direction: column-reverse;
overflow: auto;
height: 70px;
padding-top:10vh;
`

const Button = styled.div`
display: flex;
background-color: #00ff7f;
width: 5vw;
height: 3vh;
padding: 5px;
margin: 5px;
color: #1b3e59;
border-radius: 15px;
box-shadow: 8px 8px 16px 2px #1b3e59;
cursor: pointer;
&:hover{
  background-color: beige;
}
`

export default Intro