import { useState } from 'react';
import './instructions.css'

const Instructions = () => {

    const [instructionsOpen, setInstructionsOpen] = useState(false);

    return (
        <>
            {
                (instructionsOpen) ? (
                    <div className='absolutePosition'>
                        <div className='instructions-continer'>
                            <button className='infoButton' type='button' onClick={() => setInstructionsOpen(old => !old)}>X</button>
                            <h1>Instructions</h1>
                            <p style={{ whiteSpace: 'pre-wrap', textAlign: 'justify' }}>{`
- Select the number of total beats you need. It takes 25 seconds for the record to spin around once, so the tempo of your song is determined by how many beats you use.
- Use the mouse to turn on or off beats for each note as needed
- Press Play/Stop to listen to what your song sounds like
- The X above each column will clear all notes for that column
- The - or + buttons at the bottom of a selected column to remove the column or insert a new column at that location.
- Click Download SCAD File and open the file in a piece of software like OpenSCAD
- After opening the SCAD file in OpenSCAD, press F6 and wait for your record to render
- The STL file generated is what you can use to 3D print your creation!
- The save buttons will save a .fpr file which can be loaded again with the load button. This file is compatible with Fred's Fisher Price Record Creator
            `}
                            </p>
                        </div>
                    </div>
                ) : (
                    <button className='infoButton' type='button' onClick={() => setInstructionsOpen(old => !old)}>?</button>
                )
            }</>);
};

export default Instructions;