import './deleteCol.css'

export const DeleteCol = ({setMousePos, column, setNotes, song}) => {

    const clearCol = () => {

        setNotes(old => {
            const newCol = old[song].map((row,i) => {
              
                if (i >=16) return row;
                return row.map((col, i) => {
                    if (i !== column-1) { return col } else {
                        return 0;
                    }
                })
            })
      
            old[song] = newCol;
            
            return [...old];
        });

    };

    return (
        <button type='button' className="clear-button" onMouseEnter={() => {setMousePos(old => ([old[0], column-1]))}} onClick={clearCol} style={{ gridColumn: `${column}`, gridRow: '-2', fontSize: '8px' }}>X</button>
    )
}