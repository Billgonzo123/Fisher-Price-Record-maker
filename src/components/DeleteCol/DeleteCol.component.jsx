import './deleteCol.css'

 const DeleteCol = ({ setMousePos, column, setNotes, song }) => {

    const clearCol = () => {

        setNotes(old => {


            const newCol = old[song].map((row, i) => {

                if (i >= 16) return row;
                return row.map((col, i) => {
                    if (i !== column - 1) { return col } else {
                        return 0;
                    }
                })
            })

            old[song] = newCol;

            return [...old];
        });

    };

    const handleHover = () => {
        setMousePos(old => {
            if (old[0] === -1) return [...old];
            return ([old[0], column - 1])
        })

    }

    return (
        <button type='button' className="clear-button" onMouseEnter={handleHover} onClick={clearCol} style={{ gridColumn: `${column}`, gridRow: '-2', fontSize: '8px' }}>X</button>
    )
}

export default DeleteCol;