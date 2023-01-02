import logo from './logo.svg';
import './App.css';
import { scadGen } from './resources/SCAD-GEN';
import { musicFormatExample } from './resources/noteKey';
import { useRef } from 'react';


function App() {
const generatedFile = useRef(scadGen(musicFormatExample));
console.log(generatedFile.current)
  return (
    <div className="App">
<p>
{`${generatedFile.current}`}
</p>
    </div>
  );
}

export default App;
