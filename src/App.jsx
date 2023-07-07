import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Select, MenuItem, FormControl, InputLabel, Button, Box, AlertTitle, Alert } from '@mui/material';

function App() {
  const [content, setContent] = useState("Click the button to get a joke")
  const [languages, setLanguages] = useState([])
  const [targetLanguage, setTargetLanguage] = useState("")
  const [translatedText, setTranslatedText] = useState("")
  const [warning, setWarning] = useState(false)

  function handleClickContent() {
    axios.get('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single').then(res => {
      setContent(res.data.joke)
    })
    if (targetLanguage !== ""){
      setWarning(false)
    }
  }

  useEffect(() => {
    axios.get('http://localhost:5000/languages').then(res => {
      var languages = res.data.map(x => ({ name: x.name, code: x.code })).filter(x => x.name !== 'English')
      setLanguages(languages)
    })

  }, [])

  const handleChange = (event) => {
    var lang = languages.filter(x => x.code === event.target.value)
    setTargetLanguage(lang[0].code)
    if (content !== "Click the button to get a joke"){
      setWarning(false)
    }
  }

  function handleTranslate() {
    if (targetLanguage === '' || content === "Click the button to get a joke") {
      setWarning(true)
    }
    else {
      axios.post('http://localhost:5000/translate', { q: content, source: 'en', target: targetLanguage }).then(res => {
        setTranslatedText(res.data.translatedText)
      })
    }
  }

  return (
    <Box sx={{ maxWidth: 'md' }} display='flex' flexDirection='column' alignItems='center' textAlign='center'>
      <Button variant='contained' onClick={handleClickContent}> Get a joke! </Button>
      <h1> {content} </h1>
      <Button variant='contained' onClick={handleTranslate}>Click to translate!</Button>
      <h1>{translatedText}</h1>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Language</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={targetLanguage}
          label="Language"
          onChange={handleChange}
        >
          {languages.map((language, index) => (<MenuItem value={language.code} key={index}>{language.name} </MenuItem>))}
        </Select>
      </FormControl>
      {warning && <Alert sx={{margin:0.5}} severity="warning" onClose={() => setWarning(false)}>
        <AlertTitle>Warning</AlertTitle>
        {targetLanguage === "" && <p>You must choose a language before translating!</p>}
        {content === "Click the button to get a joke" && <p>Click the button to get a joke!</p>}
      </Alert>}
    </Box>
  )
}

export default App