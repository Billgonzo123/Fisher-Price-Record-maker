import "./beatLine.css";
import * as Tone from "tone";
import { noteNameSpaces } from "../../util/noteKey";

const synth = new Tone.PolySynth();
const reverb = new Tone.Reverb(8).toDestination();
const limiter = new Tone.Volume(-13);
const filter = new Tone.Filter(7000, "lowpass");
synth.connect(limiter);
limiter.connect(filter).toDestination();
filter.connect(reverb);

export const BeatLine = ({ beat, pos, setNotes, song, setMousePos, mousePos }) => {

    const playNote = (note, beat) => {
        if (!beat) synth.triggerAttackRelease(noteNameSpaces[note], "8n");
    };

    let { row, col } = pos;
    switch (true) {
        case row === 15:
            row += 3;
            break;
        case row > 11:
            row++;
            break;
        default:
    }

    const handleNoteToggle = () => {
        setNotes((old) => {
            switch (true) {
                case row === 18:
                    row -= 3;
                    break;
                case row > 12:
                    row--;
                    break;
                default:
            }
            const val = old[song][row][col];
            old[song][row][col] = val ? 0 : 1;
            return [...old];
        });
    };

    const updateCurrentRC = () => {
        if (mousePos[0] >= 0) {
            setMousePos((old) => {
                return [row, col];
            });
        }
    };
    return (
        <button
            onMouseEnter={updateCurrentRC}
            onMouseDown={(e) => {
                handleNoteToggle();
                playNote(row, beat);
            }}
            className={`staff-line ${beat ? "staff-line-note" : ""} ${row % 2 === 0 ? "evenBlock" : "oddBlock"
                } ${mousePos[0] === row || mousePos[1] === col ? "highlighted" : ""
                }`}
            style={{ gridColumn: `${col + 1}`, gridRow: `${row + 1}` }}
        />
    );
};
