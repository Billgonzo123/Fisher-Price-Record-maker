import { useState } from 'react';
import './beatLine.css';

export const BeatLine = ({ beat, pos, setNotes, song }) => {
    const { row, col } = pos;
    const handleNoteToggle = () => {

        setNotes(old => {
            const val = old[song][row][col];
            old[song][row][col] = (val) ? 0 : 1;
            return [...old];
        })
    }
    return (
        <button onMouseDown={handleNoteToggle} className={`staff-line ${(beat) ? 'staff-line-note' : ''}`} style={{ gridColumn: `${col + 1}`, gridRow: `${row + 1}` }} />
    )
};