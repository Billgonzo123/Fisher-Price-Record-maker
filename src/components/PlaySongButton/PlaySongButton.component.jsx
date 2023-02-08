import { useState } from "react";
import { noteName } from "../../util/noteKey";
import * as Tone from "tone";

import './playSongButton.css';

const synth = new Tone.PolySynth();
const reverb = new Tone.Reverb(8).toDestination();
const limiter = new Tone.Volume(-13);
const filter = new Tone.Filter(7000, "lowpass");
synth.connect(limiter);
limiter.connect(filter).toDestination();
filter.connect(reverb);

synth.set({
    envelope: {
        attack: 0.003,
        release: 4
    }
});

let intervals = [];

const PlaySongButton = ({ notes, song, maxBeats, mousePos, setMousePos }) => {
    const [repeat, setRepeat] = useState(false);

    const playSong = () => {
        intervals.forEach(clearInterval);

        setMousePos([0, 0]);
        if (mousePos[0] === -1) return;

        const beatLength = 25000 / maxBeats;

        for (let i = 0; i <= maxBeats; i++) {
            intervals.push(
                setTimeout(() => {
                    i !== maxBeats ? setMousePos([-1, i]) : setMousePos([0, 0]);

                    //trigger each note of the column
                    for (let row = 0; row <= 15; row++) {
                        if (notes[song][row][i])
                            synth.triggerAttackRelease(noteName[row], "8n");
                    };

                    if (repeat && i === maxBeats) {
                        playSong();
                    };
                }, beatLength * i)
            );
        }
    };

    const handleCheck = (element) => {
        const newVal = element.target.checked;
        setRepeat(newVal);
    };

    return (
        <>
            <label htmlFor="repeatBox" className="repeat-label"> Repeat </label>
            <input
                className="repeate-checkbox"
                type='checkbox'
                name='repeatBox'
                onChange={handleCheck}
                checked={repeat}></input>

            <button type='button' onClick={playSong}>
                Play/Stop
            </button>
        </>
    );
};

export default PlaySongButton;