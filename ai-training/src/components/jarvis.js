import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import jarvis from '../images/jarvis.gif'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import CmdModal from './mini-components/CmdModal.js';
// import KeyModal from './modals/KeyModal.js'
// import Header from './components/Header.js'
// import Logs from './components/Logs.js'

const Jarvis = () => {

  // ----------------------------------- States -----------------------------------
  const [log, setLog] = useState(false);
  const [cmds, setCmds] = useState(false);
  const [home, setHome] = useState(true);
  const [totalTranscript, setTotalTranscript] = useState('')
  const [commandHistory, setCommandHistory] = useState([]);

  // ----------------------------------- Commands -----------------------------------
  const commands = [
    {
      command: 'Jarvis *',
      callback: (result) => {

        if (result === 'show logs') {
          setLog(true);
          setCmds(false);
          setHome(false)
          setCommandHistory([...commandHistory, result])
        }

        else if (result === 'reset logs') {
          resetTranscript()
          setTotalTranscript('')
          setCommandHistory([...commandHistory, result])
        }

        else if (result === 'Hyde logs') {
          setLog(false)
          setCmds(false)
          setHome(true)
          setCommandHistory([...commandHistory, result])
        }

        else if (result === 'hide logs') {
          setLog(false)
          setCmds(false)
          setHome(true)
          setCommandHistory([...commandHistory, result])
        }

        else if (result === 'shut down') {
          SpeechRecognition.stopListening()
          setCommandHistory([...commandHistory, result])
        }

        else if (result === 'Play Shoot to Thrill') {
          window.open('https://www.youtube.com/watch?v=AD6wqKo51MU&t=109s', '_blank')
          setCommandHistory([...commandHistory, result])
        }
      }
    },
    {
      command: 'Jarvis Google *',
      callback: (result) => {
        window.open(`https://google.com/search?q=${result}`)
        setCommandHistory([...commandHistory, result])
      }
    },
    {
      command: 'Jarvis open *',
      callback: (result) => {
        window.open(`https://${result}.com`, '_blank')
        setCommandHistory([...commandHistory, result])
      }
    }
  ]

  // ----------------------------------- Voice Recognition -----------------------------------
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({ commands });

  // ----------------------------------- Misc -----------------------------------
  // let totalTranscript = ' ';
  const test = () => resetTranscript()
  // ----------------------------------- Return Div -----------------------------------
  return (
    <Background>
      {/* <CmdModal cmdModal={cmdModal} setCmdModal={setCmdModal} commands={commands} /> */}
      {home && <HomeContainer>
        <p>
          Look through the command list, hit the play button, and tell Jarvis your command! <br></br>
          {"(Make sure your mic is on and allow pop ups!)"}
        </p>
        <JarvisGif src={jarvis} alt='jarvis gif' />
      </HomeContainer>}
      {cmds && <CommandContainer>
        <p>Show logs</p>
        <p>shows transcript and command history</p>
        <p>hide logs</p>
        <p>hides transcript and history</p>
        <p>Reset logs</p>
        <p>clears your history</p>
        <p>Open (insert website)</p>
        <p>opens your desired website</p>
        <p>Google (search query)</p>
        <p>performs a google search for you</p>
        <p>Play Shoot to Thrill</p>
        <p>party time!</p>
      </CommandContainer>}
      {log && <div>
        <h2>Last Command</h2>
        <hr></hr>
        <p>{totalTranscript + transcript}</p>
      </div>
      }
      <LowerContainer>
        <p>Status: {listening ? 'Awake' : 'Asleep'}</p>
        <TranscriptText>Transcript: {transcript}</TranscriptText>
        <ButtonContainer>
          <Button onClick={() => {
            if (!cmds) {
              setCmds(true)
              setHome(false)
              setLog(false)
            }
            else {
              setCmds(false)
              setHome(true)
              setLog(false)
            }
          }}>{cmds ? 'X' : 'Commands'}</Button>
          <Button
            onClick={() => {
              if (listening) {
                SpeechRecognition.stopListening()
                test()
                setTotalTranscript(totalTranscript + transcript)
              }
              else { SpeechRecognition.startListening({ continuous: true }) }
            }}
          >
            {!listening && <PlayArrowIcon />}
            {listening && <StopIcon />}
          </Button>
          <Button
            onClick={() => {
              if (!log) {
                setCmds(false)
                setHome(false)
                setLog(true)
              }
              else {
                setCmds(false)
                setHome(true)
                setLog(false)
              }
            }}
          >{log ? 'X' : 'Logs'}</Button>
        </ButtonContainer>
      </LowerContainer>
    </Background >
  );
}

// ----------------------------------- Styled Components -----------------------------------
const Container = styled.div`
height: 100vh;
width: 100%;
`
const Background = styled.div`
  background-color: #121a23;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  color: white;
  position: relative;
`

const ButtonContainer = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr
`

// basically same as button below but is green by default and turns red on click
const OnOffButon = styled.div`
`

const Button = styled.div`
  background-color: #4CAF50;
  cursor: pointer;
  border: none;
  border-radius: 30px;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 8em;
`

const JarvisGif = styled.img`
margin: 0.5rem 0 0.5rem 0
`
const LowerContainer = styled.div`
position: absolute;
text-align: center;
bottom: 10px;
`

const HomeContainer = styled.div`
text-align: center;
`

const CommandContainer = styled.div`
display: grid;
grid-template-columns: 1fr 1fr
`

const TranscriptText = styled.div`
display: flex;
flex-direction: column-reverse;
width: 600px;
height: 30px;
overflow: scroll;
`

export default Jarvis