import React, { useState } from 'react'
import './App.css';

const App = () => {
  const [txtBlob, setTxtBlob] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    const files = e.target.elements.jsFile.files
    const fData = new FormData()
    fData.append('jsonFile', files[0])

    fetch('https://json-api-tfoxcollis.vercel.app/converter', {
      method: "POST",
      mode: "cors",
      body: files[0]
    })
    .then(response => response.json())
    .then((data) => {
      const file = new Blob([data?.file], { type: 'text/plain' })
      let downloadTxt = document.getElementById('downloadTxt')
      downloadTxt.download = data.jobName.split(' ').join('') + '.doc'
      downloadTxt.href = window.URL.createObjectURL(file)
      downloadTxt.style.display = 'block'
    })
  }

  return (
    <div className="main-box">
    <h1>Chandelle's Handy Dandy JSON converter <br/> v2.0</h1>
      <form onSubmit={handleSubmit}>
        <label>
          file:
          <input type="file" id="jsFile"/>
        </label>
        <input type="submit" value="Submit"/>
      </form>
        <a id="downloadTxt" style={{display: 'none'}}>
          Download Document
        </a>
    </div>
  )
}

export default App