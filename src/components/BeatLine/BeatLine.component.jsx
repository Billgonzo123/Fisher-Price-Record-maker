import './beatLine.css';

export const BeatLine = ({ beat, pos }) => {
const {row, col} = pos;
    return (
        <span className={`staff-line ${(beat) ? 'staff-line-note' : ''}`} style={{gridColumn: `${col+1}`, gridRow: `${row+1}`}} />
    )
};