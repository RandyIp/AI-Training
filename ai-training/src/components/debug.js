import styled from 'styled-components';
import { useState } from 'react';
//
const Debug = () => {
  const [userCode, setUserCode] = useState('')
  const [answer, setAnswer] = useState('Answers will appear here')

  const systemMessage = {
    'debug': { "role": "system", "content": "Debug this code" },
    'test': { "role": "system", "content": "Generate test cases for this code" }
  }

  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT"
    }
  ]);

  const handleSend = async (message, type) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    setAnswer('Loading...')
    await processMessageToChatGPT(newMessages, type);
  };

  async function processMessageToChatGPT(chatMessages, type) { // messages is an array of messages
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
        systemMessage[type],  // The system message DEFINES the logic of our chatGPT
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
      });
  }

  const useTab = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault()
    }
  }
  return (
    <Container>
      <Input onKeyDown={useTab} value={userCode} onChange={(e) => setUserCode(e.target.value)} placeholder='Put your code here' rows='10' cols='50' />
      <ButtonContainer>
        <Button onClick={() => handleSend(userCode, 'debug')}>Debug</Button>
        <Button onClick={() => handleSend(userCode, 'test')}>Generate Test Cases</Button>
      </ButtonContainer>
      <Answer>{answer}</Answer>
    </Container>
  )
}

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
height: 100vh;
width: 100vw;
`

const Input = styled.textarea`
height: 20%;
width: 50%;
margin-top: 5%;
`

const Button = styled.div`
display: flex;
text-align:center;
background-color: #00ff7f;
width: 50%;
height: max-content;
color: #1b3e59;
border-radius: 15px;
cursor: pointer;
&:hover{
  background-color: beige;
}
`

const ButtonContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 10%;
width: 50%;
`

const Answer = styled.div`
background-color: white;
overflow: auto;
margin-top: 1%;
height: 40%;
width: 50%;
`

export default Debug