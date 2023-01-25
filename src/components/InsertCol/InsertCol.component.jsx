import './insertCol.css';

 const InsertCol = ({ mousePos, setNotes, song }) => {


    const clearCol = () => {
        setNotes(old => {
            const column = mousePos[1];
            const newNotes = old[song].map((row, i) => {
                if (typeof row[0] === 'string') return row;
                const newRow = row.filter((_, i) => i !== column);
                newRow.push(0);
                return newRow;
            });
            console.log(old[song].length, newNotes.length)
            old[song] = newNotes



            return [...old]
        })
    };


    const addCol = () => {
        setNotes(old => {
            const column = mousePos[1];
            const newNotes = old[song].map(row => {
                if (typeof row[0] === 'string') return row;
                row.splice(column, 0, 0);
                return row
            })

            old[song] = newNotes;

            return [...old]
        })
    }

    return (
        <>
            <button className="shift-button shift-left" onClick={clearCol} type='button' style={{ gridColumn: `${mousePos[1] + 1}`, gridRow: `${20}` }}>-</button>
            <button className="shift-button shift-right" onClick={addCol} type='button' style={{ gridColumn: `${mousePos[1] + 1}`, gridRow: `${20}` }}>+</button>
        </>
    )
}

export default InsertCol;