import logo from "./logo.svg";
import "./App.css";
import { scadGen } from "./util/SCAD-GEN";
import { musicFormatExample } from "./util/noteKey";
import { Staff } from "./components/Staff/Staff.component";
import { Parameters } from "./components/Parameters/Parameters";

import { useEffect, useRef, useState } from "react";
import { PlaySongButton } from "./components/PlaySongButton/PlaySongButton.component";
import { RecordPreview } from "./components/RecordPreview/RecordPreview.component";
import { SongTitle } from "./components/SongTitle/SongTitle.component";

import { downloadSave, downloadScad } from "./util/saving";
import { LoadFile } from "./components/LoadSong/LoadSong.component";

function App() {
    const [notes, setNotes] = useState(musicFormatExample);
    const [song, setSong] = useState(0);
    const [maxBeats, setMaxBeats] = useState(80);
    const [mousePos, setMousePos] = useState([0, 0]);

    useEffect(() => {
        console.log("ReRender matrix: ", maxBeats);
        setNotes((old) => {
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
            }
            old[song].push(title);

            return [...old];
        });
    }, [maxBeats]);

    useEffect(() => {
        setMaxBeats(notes[song][0].length);
    }, [song]);

    //load notes from local storage if they are there
    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem("savedNotes"));

        if (localStorage.getItem("savedNotes")) {
            setNotes(savedNotes);
            setMaxBeats(savedNotes[song][0].length);
        } else {
            localStorage.setItem("savedNotes", JSON.stringify(notes));
        }
    }, []);
    //save notes to local storage on change
    useEffect(() => {
        localStorage.setItem("savedNotes", JSON.stringify(notes));
    }, [notes]);

    const clearSong = () => {
        const userConfirm = window.confirm("Are you sure you would like to clear the entire song?");
        if (userConfirm) {
            const save = window.confirm("Would you like to save first?");
            if (save) downloadSave(notes[song]);
            setNotes((old) => {
              old[song] = musicFormatExample[song];
                return [...old];
            });
        } else {
            return;
        }
    };

    return (
        <div className='App'>
            <h1 className='title'>Fisher Price Record Maker</h1>
            <SongTitle notes={notes} setNotes={setNotes} song={song} setSong={setSong} />
            <Parameters setMaxBeats={setMaxBeats} maxBeats={maxBeats} />
            <Staff
                notes={notes}
                song={song}
                setNotes={setNotes}
                mousePos={mousePos}
                setMousePos={setMousePos}
            />
            <PlaySongButton
                notes={notes}
                song={song}
                maxBeats={maxBeats}
                mousePos={mousePos}
                setMousePos={setMousePos}
            />
            <button onMouseDown={() => downloadScad(scadGen(notes))}>Download SCAD File</button>
            <button onMouseDown={() => downloadSave(notes[song])}>Save This Song</button>
            <button onMouseDown={clearSong}>Clear This Song</button>
            <LoadFile setNotes={setNotes} song={song} setMaxBeats={setMaxBeats} />
            <RecordPreview notes={notes} maxBeats={maxBeats} song={song} mousePos={mousePos} />
        </div>
    );
}

export default App;
