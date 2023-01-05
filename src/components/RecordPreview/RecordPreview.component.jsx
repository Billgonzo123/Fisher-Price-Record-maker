import React from "react";
import './recordPreview.css';

export const RecordPreview = ({ notes, maxBeats, song, mousePos }) => {
    const canvas = React.useRef();


    function drawPin(ctx, beat, i, angle) {
        //rotate from the center
        console.log(beat, i)
        const deg = (angle * beat)-90
        ctx.translate(250, 250)
        ctx.rotate(-deg * Math.PI / 180);
        ctx.translate(-250, -250);
        // move along y axis to reach the inner radius

        let space = (i < 9 && i >2 ) ? (150/11)*i-10 : (150/11/2)*i+2 ;
        if (i>=9) space = (150/11/2)*i+42;

        // draw the bar
        ctx.fillStyle = "rgb(10,10,180)";
        ctx.fillRect(
            250, // centered on x
            (space), // from the inner radius
           4,
            6); // until its own height
        ctx.translate(250, 250)
        ctx.rotate(deg * Math.PI / 180);
        ctx.translate(-250, -250);
    };

    ////////////////////////////////


    React.useEffect(() => {
        const ctx = canvas.current.getContext("2d");

        //draw here
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
        //draw_rectangle(ctx)
        //   draw_rectangle(ctx)
        ctx.beginPath();
        ctx.fillStyle = "lightgrey";
        ctx.arc(250, 250, 250, 0, 2 * Math.PI);
        ctx.fill()
        //draw inner circles
        ctx.moveTo(350,250);
         ctx.arc(250, 250, 100, 0, 2 * Math.PI);
         for (let line = 1; line <= 11; line++) {
            ctx.moveTo(350+13.3636*line,250);
            ctx.arc(250, 250, 100+13.3636*line, 0, 2 * Math.PI);
            
         }

        ctx.lineWidth = 4;
        ctx.strokeStyle = "rgb(00,00,180)";

        ctx.stroke();

        //Draw all pins

        
        const angle = 360 / maxBeats;


        notes[song].forEach((row, i) => {
            if (i === 16) return; //dont calculate the title data
            console.log('Row...', i)
            for (let beat = 0; beat < maxBeats; beat++) {
                
                if (row[beat] ) {
                    console.log('Note...')
                    //draw pin if note exists
                    drawPin(ctx, beat, i, angle)
                }
            }

        })



    }, [notes]);



    return (
 <canvas className={(mousePos[0] === -1) ? "record-preview-animate" : ""} ref={canvas} height={500} width={500} />
   
    );
};



