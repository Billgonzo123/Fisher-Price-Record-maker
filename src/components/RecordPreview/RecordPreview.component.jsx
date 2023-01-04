import React from "react";
import PropTypes from "prop-types";

export const RecordPreview = ({ notes, maxBeats, song }) => {
    const canvas = React.useRef();


    function drawPin(ctx, beat, i, space, angle) {
        //rotate from the center
        console.log(beat, i)
        const deg = (angle * beat)-90
        ctx.translate(250, 250)
        ctx.rotate(-deg * Math.PI / 180);
        ctx.translate(-250, -250);
        // move along y axis to reach the inner radius

        // draw the bar
        ctx.fillStyle = "red";
        ctx.fillRect(
            250 - 20, // centered on x
            195-(space*i), // from the inner radius
            5,
            8); // until its own height
        ctx.translate(250, 250)
        ctx.rotate(deg * Math.PI / 180);
        ctx.translate(-250, -250);
    };



    React.useEffect(() => {
        const ctx = canvas.current.getContext("2d");

        //draw here
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
        //draw_rectangle(ctx)
        //   draw_rectangle(ctx)
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.arc(250, 250, 250, 0, 2 * Math.PI);
        ctx.fill()

        ctx.arc(250, 250, 50, 0, 2 * Math.PI);
        ctx.arc(250, 250, 68, 0, 2 * Math.PI);
        ctx.arc(250, 250, 81, 0, 2 * Math.PI);
        ctx.arc(250, 250, 94, 0, 2 * Math.PI);
        ctx.arc(250, 250, 107, 0, 2 * Math.PI);
        ctx.arc(250, 250, 120, 0, 2 * Math.PI);
        ctx.arc(250, 250, 133, 0, 2 * Math.PI);
        ctx.arc(250, 250, 146, 0, 2 * Math.PI);
        ctx.arc(250, 250, 159, 0, 2 * Math.PI);
        ctx.arc(250, 250, 172, 0, 2 * Math.PI);
        ctx.arc(250, 250, 185, 0, 2 * Math.PI);
        ctx.arc(250, 250, 198, 0, 2 * Math.PI);
        ctx.arc(250, 250, 211, 0, 2 * Math.PI);
        ctx.arc(250, 250, 224, 0, 2 * Math.PI);
        ctx.arc(250, 250, 237, 0, 2 * Math.PI);
        ctx.lineWidth = 4;
        ctx.strokeStyle = "rgb(00,00,180)";

        ctx.stroke();

        //Draw all pins

        const space = 200 / 15;
        const angle = 360 / maxBeats;


        notes[song].forEach((row, i) => {
            if (i === 16) return; //dont calculate the title data
            console.log('Row...', i)
            for (let beat = 0; beat < maxBeats; beat++) {
                
                if (row[beat] ) {
                    console.log('Note...')
                    //draw pin if note exists
                    drawPin(ctx, beat, i, space, angle)
                }
            }

        })



    }, [notes]);



    return <canvas ref={canvas} height={500} width={500} />;
};



