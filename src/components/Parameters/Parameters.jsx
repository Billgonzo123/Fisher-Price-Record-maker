import { useEffect } from "react";
import './parameters.css'
 const Parameters = ({ setMaxBeats, maxBeats }) => {
    const handleMaxBeatChange = (event) => {
        event.preventDefault();
        setMaxBeats(event.target.children[1].value);
    };

    return (
        <form key={maxBeats} className='beat-input-form' onSubmit={handleMaxBeatChange}>
            <label>Total Number of Beats</label>
            <input className="beat-input" type={"number"} max='360' defaultValue={maxBeats}></input>
            <button type='submit'>Update</button>
        </form>
    );
};

export default Parameters;