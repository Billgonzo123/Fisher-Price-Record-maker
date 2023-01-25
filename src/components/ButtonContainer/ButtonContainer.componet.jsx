import { downloadSave, downloadScad } from "../../util/saving";
import { scadGen } from "../../util/SCAD-GEN";
import { emptySongs } from "../../util/noteKey";

import PlaySongButton from "../PlaySongButton/PlaySongButton.component";
import LoadFile from "../LoadSong/LoadSong.component";

import "./buttonContainer.css"


const ButtonContainer = ({ style, notes, song, setNotes, mousePos, setMousePos, setMaxBeats, maxBeats, staffViewOn, setStaffViewOn }) => {

    const clearSong = () => {
        const userConfirm = window.confirm("Are you sure you would like to clear the entire song?");
        if (userConfirm) {
            const save = window.confirm("Would you like to save first?");
            if (save) downloadSave(notes[song]);
            setNotes((old) => {
                const emptyNotes = emptySongs();
                old[song] = emptyNotes[song];
                setMaxBeats(emptyNotes[song][0].length);
                return [...old];
            });
        } else {
            return;
        }
    };

    return (
        <div style={style} className='button-container'>
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
            <button onMouseDown={() => setStaffViewOn((old) => !old)}>
                {staffViewOn ? "Switch To Record View" : "Switch To Staff View"}
            </button>
        </div>
    )
}

export default ButtonContainer;