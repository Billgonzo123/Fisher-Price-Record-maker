import './noteDisplay.css';

export const NotesDisplay = () => {
    const noteName = [
        'D2', 'C2', 'B1', 'A1', 'G1', 'F1', 'E1', 'D1', 'C1', 'B0', 'A0', 'G0', '', 'E0', 'D0', 'C0', '', '', 'G'
    ]
    return (
        <>
            {
                noteName.map((note, i) => {
                    return <p className={`noteDisplay ${(i % 2 === 0) ? 'evenNote' : 'oddNote'}`} key={note} style={{ gridRow: `${i + 1}`, gridColumn: '-2' }}>{note}</p>
                })

            }
        </>
    )
}