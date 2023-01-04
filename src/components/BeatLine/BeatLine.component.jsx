
import './beatLine.css';
import * as Tone from 'tone'

const synth = new Tone.PolySynth();
const reverb = new Tone.Reverb(8).toDestination();
const limiter = new Tone.Volume(-30);
const filter = new Tone.Filter(7000, 'lowpass');
synth.connect(limiter);
limiter.connect(filter).toDestination();;
filter.connect(reverb);

export const BeatLine = ({ beat, pos, setNotes, song, setMousePos, mousePos }) => {
    const noteName = [
        'D6', 'C6', 'B5', 'A5', 'G5', 'F5', 'E5', 'D5', 'C5', 'B4', 'A4', 'G4', '', 'E4', 'D4', 'C4', '', '', 'G3'
    ];

    const playNote = (note, beat) => {
console.log(noteName[note])
       if (!beat) synth.triggerAttackRelease(noteName[note], "8n");
    };

    let { row, col } = pos;
    switch(true){
        case row === 15: row+=3
        break;
        case row > 11: row++
        break;
        default:
    };

    const handleNoteToggle = () => {
        setNotes(old => {
            switch(true){
                case row === 18: row-=3
                break;
                case row > 12: row--
                break;
                default:
            };
            const val = old[song][row][col];
            console.log(val)
            old[song][row][col] = (val) ? 0 : 1;
            return [...old];
        })
    };

    const updateCurrentRC = () => {
        setMousePos( old => {
            return [row, col]
        });
    }
    return (
        <button onMouseEnter={updateCurrentRC} onMouseDown={e => {handleNoteToggle(); playNote(row, beat);}}  className={`staff-line ${(beat) ? 'staff-line-note' : ''} ${(row % 2 === 0) ? 'evenBlock' : 'oddBlock'  } ${(mousePos[0] === row || mousePos[1] === col) ? 'highlighted' : ''}`} style={{ gridColumn: `${col + 1}`, gridRow: `${row + 1}` }} />
    )
};