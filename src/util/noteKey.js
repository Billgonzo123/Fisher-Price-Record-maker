// //-----------Notes------------//

// -D2 = (56.9,58.1)
// -C2 =(55.7,56.9)
// -B1 = (54.11,55.31)
// -A1 = (51.315,52.515)
// -G1 = (48.555,49.755)
// -F1 = (45.825,47.025)
// -E1 = (43,44.2)
// -D1 = (40.225,41.425)
// -C1 = (37.425,38.625)
// -B0 = (36.225,37.425)
// -A0 = (34.71,35.91)
// -G0 = (33.51,34.71)

// -E0 = (31.89,33.09)
// -D0 = (30.69,31.89)
// -C0 = (29.15,30.35)

// -G = (27.95,29.15)
export const noteName = [
    "D6",
    "C6",
    "B5",
    "A5",
    "G5",
    "F5",
    "E5",
    "D5",
    "C5",
    "B4",
    "A4",
    "G4",
    "E4",
    "D4",
    "C4",
    "G3",
];

export const noteNameSpaces = [
    "D6",
    "C6",
    "B5",
    "A5",
    "G5",
    "F5",
    "E5",
    "D5",
    "C5",
    "B4",
    "A4",
    "G4",
    "",
    "E4",
    "D4",
    "C4",
    "",
    "",
    "G3",
];

export const notePinKey = [
    [56.9, 58.1],
    [55.7, 56.9],
    [54.11, 55.31],
    [51.315, 52.515],
    [48.555, 49.755],
    [45.825, 47.025],
    [43, 44.2],
    [40.225, 41.425],
    [37.425, 38.625],
    [36.225, 37.425],
    [34.71, 35.91],
    [33.51, 34.71],
    [31.89, 33.09],
    [30.69, 31.89],
    [29.15, 30.35],
    [27.95, 29.15],
];

export const musicFormatExample = () => {
    const numberOfBeats = 64;
    const emptySong = Array.from({length: 16}, _ => new Array(numberOfBeats).fill(0));

    return [
        [...emptySong, ["Side A"]],
        [...emptySong, ["Side B"]],
    ];
};