import { useEffect, useState } from "react";
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

export const PlaySongButton = ({ notes, song, maxBeats, mousePos, setMousePos }) => {
    const [repeat, setRepeat] = useState(false);
    const [hoverPlayState, setHoverPlayState] = useState(false);

    useEffect(() => {
        if (hoverPlayState && mousePos[0] >= 0) hoverPlay();
    }, [mousePos[1]])


    const hoverPlay = () => {
        
        if (notes[song][0][mousePos[1]])
            synth.triggerAttackRelease(noteName[0], "8n");
        if (notes[song][1][mousePos[1]])
            synth.triggerAttackRelease(noteName[1], "8n");
        if (notes[song][2][mousePos[1]])
            synth.triggerAttackRelease(noteName[2], "8n");
        if (notes[song][3][mousePos[1]])
            synth.triggerAttackRelease(noteName[3], "8n");
        if (notes[song][4][mousePos[1]])
            synth.triggerAttackRelease(noteName[4], "8n");
        if (notes[song][5][mousePos[1]])
            synth.triggerAttackRelease(noteName[5], "8n");
        if (notes[song][6][mousePos[1]])
            synth.triggerAttackRelease(noteName[6], "8n");
        if (notes[song][7][mousePos[1]])
            synth.triggerAttackRelease(noteName[7], "8n");
        if (notes[song][8][mousePos[1]])
            synth.triggerAttackRelease(noteName[8], "8n");
        if (notes[song][9][mousePos[1]])
            synth.triggerAttackRelease(noteName[9], "8n");
        if (notes[song][10][mousePos[1]])
            synth.triggerAttackRelease(noteName[10], "8n");
        if (notes[song][11][mousePos[1]])
            synth.triggerAttackRelease(noteName[11], "8n");
        if (notes[song][12][mousePos[1]])
            synth.triggerAttackRelease(noteName[12], "8n");
        if (notes[song][13][mousePos[1]])
            synth.triggerAttackRelease(noteName[13], "8n");
        if (notes[song][14][mousePos[1]])
            synth.triggerAttackRelease(noteName[14], "8n");
        if (notes[song][15][mousePos[1]])
            synth.triggerAttackRelease(noteName[15], "8n");
    }

    const playSong = () => {
        intervals.forEach(clearInterval);

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
            <label htmlFor="repeatBox" className="repeat-label"> Repeat </label>
            <input
                className="repeate-checkbox"
                type='checkbox'
                name='repeatBox'
                onChange={handleCheck}
                checked={repeat}>

            </input>

            <label htmlFor="repeatBox" className="repeat-label"> Hover Play </label>
            <input
                className="repeate-checkbox"
                type='checkbox'
                name='repeatBox'
                onChange={() => { setHoverPlayState(old => (!old)) }}
                checked={hoverPlayState}>
            </input>

            <button type='button' onClick={playSong}>
                Play/Stop
            </button>
        </>
    );
};
