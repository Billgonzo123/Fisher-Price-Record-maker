import { useState } from "react";
import { noteName } from "../../util/noteKey";
import * as Tone from "tone";

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

export const PlaySongButton = ({ notes, song, maxBeats, mousePos, setMousePos }) => {
    const [repeat, setRepeat] = useState(false);

    const playSong = () => {
        intervals.forEach(clearInterval);
        intervals = [];
        setMousePos([0, 0]);
        if (mousePos[0] === -1) return;

        const beatLength = 25000 / maxBeats;

        for (let i = 0; i <= maxBeats; i++) {
            intervals.push(
                setTimeout(() => {
                    i !== maxBeats ? setMousePos([-1, i]) : setMousePos([0, 0]);
                    if (notes[song][0][i])
                        synth.triggerAttackRelease(noteName[0], "8n");
                    if (notes[song][1][i])
                        synth.triggerAttackRelease(noteName[1], "8n");
                    if (notes[song][2][i])
                        synth.triggerAttackRelease(noteName[2], "8n");
                    if (notes[song][3][i])
                        synth.triggerAttackRelease(noteName[3], "8n");
                    if (notes[song][4][i])
                        synth.triggerAttackRelease(noteName[4], "8n");
                    if (notes[song][5][i])
                        synth.triggerAttackRelease(noteName[5], "8n");
                    if (notes[song][6][i])
                        synth.triggerAttackRelease(noteName[6], "8n");
                    if (notes[song][7][i])
                        synth.triggerAttackRelease(noteName[7], "8n");
                    if (notes[song][8][i])
                        synth.triggerAttackRelease(noteName[8], "8n");
                    if (notes[song][9][i])
                        synth.triggerAttackRelease(noteName[9], "8n");
                    if (notes[song][10][i])
                        synth.triggerAttackRelease(noteName[10], "8n");
                    if (notes[song][11][i])
                        synth.triggerAttackRelease(noteName[11], "8n");
                    if (notes[song][12][i])
                        synth.triggerAttackRelease(noteName[12], "8n");
                    if (notes[song][13][i])
                        synth.triggerAttackRelease(noteName[13], "8n");
                    if (notes[song][14][i])
                        synth.triggerAttackRelease(noteName[14], "8n");
                    if (notes[song][15][i])
                        synth.triggerAttackRelease(noteName[15], "8n");

                    if (repeat && i === maxBeats) {
                        playSong();
                    }
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
            <label> Repeat </label>
            <input
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
