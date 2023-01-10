import React, { useEffect, useState } from "react";
import "./recordPreview.css";

export const RecordPreview = ({ notes, maxBeats, song, mousePos }) => {
    const canvas = React.useRef();

    const [scaleSize, setScaleSize] = useState(window.innerWidth);

    function drawPin(ctx, beat, i, angle) {
        //rotate from the center
        const deg = angle * beat - 90;
        ctx.translate(250, 250);
        ctx.rotate((-deg * Math.PI) / 180);
        ctx.translate(-250, -250);
        // move along y axis to reach the inner radius

        /*the layout of the pins needs to be in a special order. This makes sure that the ins are drwn o fthe correct lines. */
        let space =
            i < 9 && i > 2 ? (150 / 11) * i - 10 : (150 / 11 / 2) * i + 2; //if its a pin for the first 2 outset patters its ether 2 pins or one  pin per line
        if (i >= 9) space = (150 / 11 / 2) * i + 42; //if its a pin on the inner 9 pins it shuld be two pins per line

        // draw the bar
        ctx.fillStyle = "rgb(50,50,180)";
        ctx.fillRect(
            250, // centered on x
            space, // from the inner radius
            4,
            6
        ); // until its own height
        ctx.translate(250, 250);
        ctx.rotate((deg * Math.PI) / 180);
        ctx.translate(-250, -250);
    }

    ////////////////////////////////
    useEffect(() => {
        window.addEventListener("resize", () => {
            const width = window.innerWidth;
            setScaleSize(width);
        });
    }, []);

    useEffect(() => {
        const ctx = canvas.current.getContext("2d");

        //draw here
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        //draw_rectangle(ctx)
        //   draw_rectangle(ctx)
        ctx.beginPath();
        ctx.fillStyle = "lightgrey";
        ctx.arc(250, 250, 248, 0, 2 * Math.PI);
        ctx.fill();
        //draw inner circles
        ctx.moveTo(350, 250);
        ctx.arc(250, 250, 100, 0, 2 * Math.PI);
        //draw the lines of the record
        for (let line = 1; line <= 11; line++) {
            ctx.moveTo(350 + 13.3636 * line, 250);
            ctx.arc(250, 250, 100 + 13.3636 * line, 0, 2 * Math.PI);
        }

        ctx.lineWidth = 4;
        ctx.strokeStyle = "rgb(50,50,180)";

        ctx.stroke();

        //determine the space between each beat
        const angle = 360 / maxBeats;

        //draw the pins
        notes[song].forEach((row, i) => {
            if (i === 16) return; //dont calculate the title data, which is stored at the end of the array
            for (let beat = 0; beat < maxBeats; beat++) {
                //if htere is a note, draw a pin
                if (row[beat]) {
                    //draw pin if note exists
                    drawPin(ctx, beat, i, angle);
                }
            }
        });
    }, [notes, song]);

    return (
        <div className='record-preview-container'>
            <div
                className='record-preview-inner'
                style={{
                    transform: `scale(${scaleSize > 1000 ? 1 : scaleSize / 1000
                        })`
                }}>
                <canvas
                    id='record-preview'
                    className={`${mousePos[0] === -1 ? "record-preview-animate" : ""
                        }`}
                    ref={canvas}
                    height={500}
                    width={500}
                />
                <img
                    src={require(`${mousePos[0] === -1 ? "./FPRP.png" : "./FPRP-Open.png"
                        }`)}
                    alt='recordPlayer'
                    className='record-player'
                />
            </div>
        </div>
    );
};
