import logo from './logo.svg';
import './App.css';
import { scadGen } from './resources/SCAD-GEN';
import { musicFormatExample } from './resources/noteKey';
import { Staff } from './components/Staff/Staff.component';
import { Parameters } from './components/Parameters/Parameters';

import { useEffect, useRef, useState } from 'react';
import { PlaySongButton } from './components/PlaySongButton/PlaySongButton.component';
import { RecordPreview } from './components/RecordPreview/RecordPreview.component';


function App() {

  const [notes, setNotes] = useState(musicFormatExample);
  const [maxBeats, setMaxBeats] = useState(80);
  const [song, setSong] = useState(0);
  const [mousePos, setMousePos] = useState([0,0])

  useEffect(() => {
    console.log('ReRender matrix: ', maxBeats)

    setNotes(old => {
      const title = old[song].pop();
      const length = old[song][0].length;

      if (maxBeats > length) {
        const numToAdd = maxBeats - length;
        for (let i = 0; i < 16; i++) {
          const addition = Array(numToAdd).fill(0);
          old[song][i] = old[song][i].concat(addition);
        }


      } else if (maxBeats < length) {
        const numToSub = length - maxBeats;
        for (let i = 0; i < 16; i++) {
          old[song][i] = old[song][i].slice(0, length - numToSub);
        }

      };
      old[song].push(title);



      return [...old];
    });
  }, [maxBeats])


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
  };

  return (
    <div className="App">
      <Parameters setMaxBeats={setMaxBeats} maxBeats={maxBeats} />
      <Staff notes={notes} song={song} setNotes={setNotes} mousePos={mousePos} setMousePos = {setMousePos} />
      <PlaySongButton notes = {notes} song={song} maxBeats={maxBeats} mousePos={mousePos} setMousePos = {setMousePos}/>
      <RecordPreview notes = {notes} maxBeats={maxBeats} song={song}/>
      <button onMouseDown={download} >Download SCAD File</button>
    </div>
  );
}

export default App;
