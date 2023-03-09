import "./App.css";
import "./fonts/fonts.css";

import { useEffect, useState } from "react";

import { emptySongs } from "./util/noteKey";
import { updateNotesToMaxBeatsValue } from "./util/updateNotesToMaxBeatsValue";

import Staff from "./components/Staff/Staff.component";
import Parameters from "./components/Parameters/Parameters";
import RecordPreview from "./components/RecordPreview/RecordPreview.component";
import SongTitle from "./components/SongTitle/SongTitle.component";
import ButtonContainer from "./components/ButtonContainer/ButtonContainer.componet";
import Instructions from "./components/Instructions/Instructions.component";

function App() {
    const [notes, setNotes] = useState(emptySongs());
    const [song, setSong] = useState(0);
    const [maxBeats, setMaxBeats] = useState(64);
    const [mousePos, setMousePos] = useState([0, 0]);
    const [staffViewOn, setStaffViewOn] = useState(true);

    //load notes from local storage if they are there on initial mount
    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem("savedNotes"));

        if (localStorage.getItem("savedNotes")) {
            setNotes(savedNotes);
            setMaxBeats(savedNotes[song][0].length);
        } else {
            localStorage.setItem("savedNotes", JSON.stringify(notes));
        }
    }, []);

    //this adds or subtracts beats to the end of the song based off an updated maxBeats state
    useEffect(() => {
        setNotes((old) => updateNotesToMaxBeatsValue(old, song, maxBeats));
    }, [maxBeats]);

    //if the song changes, make sure that maxBeats is the same as the length of the song.
    //this makes sure when a the user switches betwen sideA and sideB that the maxNotes changes to match the song
    useEffect(() => {
        setMaxBeats(notes[song][0].length);
    }, [song]);

    //save notes to local storage on change
    useEffect(() => {
        if (notes[song][0].length !== maxBeats) setMaxBeats(notes[song][0].length);
        localStorage.setItem("savedNotes", JSON.stringify(notes));
    }, [notes]);

    return (
        <div className='App'>
            <Instructions/>
            <div className='header-container'>
                <h1 className='title'>Fisher-Price Record Maker</h1>
                <SongTitle notes={notes} setNotes={setNotes} song={song} setSong={setSong} />
                <Parameters setMaxBeats={setMaxBeats} maxBeats={maxBeats} />
            </div>

            <ButtonContainer
                notes={notes}
                song={song}
                setNotes={setNotes}
                mousePos={mousePos}
                setMousePos={setMousePos}
                setMaxBeats={setMaxBeats}
                maxBeats={maxBeats}
                staffViewOn={staffViewOn}
                setStaffViewOn={setStaffViewOn}
            />

            <Staff
                style={{ display: staffViewOn ? "" : "none" }}
                notes={notes}
                song={song}
                setNotes={setNotes}
                mousePos={mousePos}
                setMousePos={setMousePos}
                setMaxBeats={setMaxBeats}
            />

            <RecordPreview
                style={{ height: staffViewOn ? "0px" : "" }}
                notes={notes}
                maxBeats={maxBeats}
                song={song}
                mousePos={mousePos}
            />
        </div>
    );
}

export default App;
