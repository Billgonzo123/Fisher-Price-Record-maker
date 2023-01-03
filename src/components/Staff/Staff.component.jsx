import { BeatLine } from "../BeatLine/BeatLine.component"
import './staff.css'

export const Staff = ({ notes, song }) => {

    return (
        <div className="staff-container">
            <div className={'staff-component'}>

                {notes[song].map((note, i) => {
                    //we dont want to render a staff line for the last value in the note array as it is the songs title, not a note
                    if (i === 16) return ('');

                    //render each beat
                    return note.map((beat, j) => {
                        return <BeatLine key={`beat${i}-${j}`} beat={beat} pos={{ row: i, col: j }} />
                    });
                })}

            </div>
        </div>

    )



}