import { noteNameSpaces } from "../../util/noteKey";
import "./noteDisplay.css";

 const NotesDisplay = () => {
    return (
        <>
            {noteNameSpaces.map((note, i) => {
                return (
                    <span
                        className={`noteDisplay ${i % 2 === 0 ? "evenNote" : "oddNote"
                            }`}
                        key={`${note}${i}`}
                        style={{ gridRow: `${i + 1}`, gridColumn: "-2" }}>
                        {note}
                    </span>
                );
            })}
        </>
    );
};

export default NotesDisplay;