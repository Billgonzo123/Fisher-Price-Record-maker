import { useRef } from "react"

export const LoadFile = ({ setNotes, song }) => {
    const inputFile = useRef(null);

    const loadFile = () => {
        inputFile.current.click();
    };

    const readFile = (element) => {
        const file = element.target.files[0];
        const reader = new FileReader();
        reader.onload = function () {
            const text = reader.result;
            formatFile(JSON.stringify(text))
        };
        reader.readAsText(file);
    }

    const formatFile = (text) => {
        let newNotes = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
        let row = 0;
        let skip =false;
        let title = '';
        for (let i = 0; i < text.length ; i++) {
            const char = text.charAt(i);
            if (skip) {
                skip = false;
            };

            if (row === 16) {
                title += char
            }
          
         
            if (char.match(/\\/)) {
                row++;
                skip = true;
            };
             
            if (char=== "-" || char=== "+") {
                newNotes[row].push((char === '-') ? 0 : 1);
            }
     

        }
        newNotes = newNotes.reverse();
        newNotes.push(title.slice(1, title.length-1));
        setNotes(old => {
            old[song]=newNotes;
            return [...old]
        })
    }

    return (
        <>
            <button type="button" onClick={loadFile}>Load Song</button>
            <input type='file' id='file' onChange={async element => readFile(element)} accept=".fpr" ref={inputFile} style={{ display: 'none' }} />
        </>
    )
}