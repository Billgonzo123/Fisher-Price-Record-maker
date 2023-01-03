
import './beatLine.css';

export const BeatLine = ({ beat, pos, setNotes, song }) => {
    let { row, col } = pos;
    switch(true){
        case row === 15: row+=3
        break;
        case row > 11: row++
        break;
        default:
    }
    const handleNoteToggle = () => {

        setNotes(old => {
            const val = old[song][row][col];
            old[song][row][col] = (val) ? 0 : 1;
            return [...old];
        })
    }
    return (
        <button onMouseDown={handleNoteToggle} className={`staff-line ${(beat) ? 'staff-line-note' : ''} ${(row % 2 === 0) ? 'evenBlock' : 'oddBlock'  }`} style={{ gridColumn: `${col + 1}`, gridRow: `${row + 1}` }} />
    )
};