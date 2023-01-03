import logo from './logo.svg';
import './App.css';
import { scadGen } from './resources/SCAD-GEN';
import { musicFormatExample } from './resources/noteKey';
import { Staff } from './components/Staff/Staff.component';
import { useEffect, useRef, useState } from 'react';


function App() {

  const [notes, setNotes] = useState(musicFormatExample);


  function download() {
    const generatedFile = scadGen(notes);
    let blob = new Blob([generatedFile.text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    
    var element = document.createElement('a');
    element.setAttribute('href', url);
    element.setAttribute('download', `${generatedFile.title}.scad`);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }

  return (
    <div className="App">

      <Staff notes={notes} song={0} setNotes={setNotes} />

      <button onMouseDown={download} >Download</button>
    </div>
  );
}

export default App;
