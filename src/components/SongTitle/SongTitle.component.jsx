import './songTitle.css';

export const SongTitle = ({ notes, setNotes, song, setSong }) => {


    const updateTitle = (element) => {
        const newTitle = element.target.value;
        setNotes(old => {
            old[song][16] = newTitle;
            return [...old];
        })
    }

    const submitHandler = (element) => {
        const newTitle = element.target.value;
        setNotes(old => {
            old[song][16] = (newTitle) ? newTitle : `Side ${(song) ? 'B' : 'A'}`;
            return [...old];
        })
    }

    return (
        <div className="song-title-container">
            <input type={'text'} onChange={updateTitle} onBlur={submitHandler} value={notes[song][16]}></input>
            <br />
            <button type='button' onClick={() => setSong(0)}>Side A</button>
            <button type='button' onClick={() => setSong(1)}>Side B</button>
        </div>
    )
}