import './shiftCol.css';

export const ShiftCol = ({ mousePos,setMousePos, setNotes, song, maxBeats }) => {

    const shiftLeft = () => {
        setNotes(old => {
            if (mousePos[1] === 0) return;
            const updatedSong = old[song].map((row, i) => {
                if (i === 16) return row;
                const curNote = row[mousePos[1]];
                row[mousePos[1]] = 0//row[mousePos[1] - 1];
                row[mousePos[1] - 1] = curNote;
               
                return row
            })

            old[song] = updatedSong
            return [...old]
        });
        setMousePos(old => ([old[0], old[1]-1]))
    }

    const shiftRight = () => {
        setNotes(old => {
            
            const updatedSong = old[song].map((row, i) => {
                if (i === 16) return row;
                const curNote = row[mousePos[1]];
       
                row[mousePos[1]] = 0;
                row[mousePos[1] + 1] = curNote;
               
                return row
            })

            old[song] = updatedSong
            console.log([...old])
            return [...old]
        });
        setMousePos(old => ([old[0], old[1]+1]))
    }

    return (
        <>
            <button className="shift-button shift-left" onClick={shiftLeft} type='button' style={{ gridColumn: `${mousePos[1] + 1}`, gridRow: `${20}` }}>&lArr;</button>
            <button className="shift-button shift-right" onClick={shiftRight} type='button' style={{ gridColumn: `${mousePos[1] + 1}`, gridRow: `${20}` }}>&rArr;</button>
        </>
    )
}