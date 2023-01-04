import * as Tone from 'tone'


const synth = new Tone.PolySynth()
const reverb = new Tone.Reverb(8).toDestination();;
const limiter = new Tone.Volume(-30);
const filter = new Tone.Filter(7000, 'lowpass')
synth.connect(limiter);
limiter.connect(filter).toDestination();;
filter.connect(reverb)

let intervals = [];


export const PlaySongButton = ({ notes, song, maxBeats, mousePos, setMousePos}) => {

    const noteName = [
        'D6', 'C6', 'B5', 'A5', 'G5', 'F5', 'E5', 'D5', 'C5', 'B4', 'A4', 'G4', 'E4', 'D4', 'C4', 'G3'
    ];

    const playSong = () => {
        intervals.forEach(clearInterval);
        intervals = [];

        const beatLength = 25000 / maxBeats;
        for (let i = 0; i <= maxBeats; i++) {
           intervals.push(setTimeout(() => {
                setMousePos([-1, i])
                if (notes[song][0][i]) synth.triggerAttackRelease(noteName[0], "8n");
                if (notes[song][1][i]) synth.triggerAttackRelease(noteName[1], "8n");
                if (notes[song][2][i]) synth.triggerAttackRelease(noteName[2], "8n");
                if (notes[song][3][i]) synth.triggerAttackRelease(noteName[3], "8n");
                if (notes[song][4][i]) synth.triggerAttackRelease(noteName[4], "8n");
                if (notes[song][5][i]) synth.triggerAttackRelease(noteName[5], "8n");
                if (notes[song][6][i]) synth.triggerAttackRelease(noteName[6], "8n");
                if (notes[song][7][i]) synth.triggerAttackRelease(noteName[7], "8n");
                if (notes[song][8][i]) synth.triggerAttackRelease(noteName[8], "8n");
                if (notes[song][9][i]) synth.triggerAttackRelease(noteName[9], "8n");
                if (notes[song][10][i]) synth.triggerAttackRelease(noteName[10], "8n");
                if (notes[song][11][i]) synth.triggerAttackRelease(noteName[11], "8n");
                if (notes[song][12][i]) synth.triggerAttackRelease(noteName[12], "8n");
                if (notes[song][13][i]) synth.triggerAttackRelease(noteName[13], "8n");
                if (notes[song][14][i]) synth.triggerAttackRelease(noteName[14], "8n");
                if (notes[song][15][i]) synth.triggerAttackRelease(noteName[15], "8n");

            }, beatLength * i));
            
        }

    };

    return (
        <button type="button" onClick={playSong}>Play Tune</button>
    )
}