import './noteDisplay.css';


export const NotesDisplay = () => {
    const noteName = [
        'D3', 'C3', 'B2', 'A2', 'G2', 'F2', 'E2', 'D2', 'C2', 'B1', 'A1', 'G1', '', 'E1', 'D1', 'C1', '', '', 'G0'
    ];


    return (
        <>
            {
                noteName.map((note, i) => {
                    return <span className={`noteDisplay ${(i % 2 === 0) ? 'evenNote' : 'oddNote'}`} key={`${note}${i}`} style={{ gridRow: `${i + 1}`, gridColumn: '-2' }}>{note}</span>
                })

            }
        </>
    )
}