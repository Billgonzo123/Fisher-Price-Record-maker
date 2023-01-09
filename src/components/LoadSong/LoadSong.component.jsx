import { useRef } from "react";

export const LoadFile = ({ setNotes, song, setMaxBeats }) => {
  const inputFile = useRef(null);

  const loadFile = () => {
    inputFile.current.click();
  };

  const readFile = (element) => {
    const file = element.target.files[0];
    const reader = new FileReader();
    reader.onload = function () {
      const text = reader.result;
      formatFile(JSON.stringify(text));
    };
    reader.readAsText(file);
  };

  const formatFile = (text) => {
    let newNotes = [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
    ];
    let row = 0;
    let skip = false;
    let title = "";

    for (let i = 0; i < text.length; i++) {
      const char = text.charAt(i);
      if (skip) {
        skip = false;
      }

      if (row === 16) {
        if (char.match(/\\/)) {
          skip = true;
        } else {
          title += char;
        }
      }

      if (char.match(/\\/)) {
        //this if stament is a bug fix. My file type only used \n where fredns used \r\n. This makes sure it doesnt skip 2 rows
        if (text.charAt(i + 1) === "n") row++;
        skip = true;
      }

      if (char === "-" || char === "+") {
        newNotes[row].push(char === "-" ? 0 : 1);
      }
    }
    newNotes = newNotes.reverse();
    newNotes.push(title.slice(1, title.length - 1));
    setMaxBeats(newNotes[0].length);
    setNotes((old) => {
      old[song] = newNotes;
      return [...old];
    });
  };

  return (
    <>
      <button type="button" onClick={loadFile}>
        Load Song
      </button>
      <input
        type="file"
        id="file"
        onChange={async (element) => readFile(element)}
        accept=".fpr"
        ref={inputFile}
        style={{ display: "none" }}
      />
    </>
  );
};
