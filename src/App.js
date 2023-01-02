import logo from './logo.svg';
import './App.css';
import { scadGen } from './resources/SCAD-GEN';
import { musicFormatExample } from './resources/noteKey';
import { useRef } from 'react';


function App() {
  const generatedFile = useRef(scadGen(musicFormatExample));

  const blob = new Blob([generatedFile.current.text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  return (
    <div className="App">
      <a href={url} download={`${generatedFile.current.title}.scad`}>Download</a>
    </div>
  );
}

export default App;
