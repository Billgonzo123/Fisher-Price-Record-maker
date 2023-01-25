export const updateNotesToMaxBeatsValue = (old, song, maxBeats ) => {
    const title = old[song].pop();
    const length = old[song][0].length;
    if (maxBeats > length) {
        const numToAdd = maxBeats - length;
        for (let i = 0; i < 16; i++) {
            const addition = Array(numToAdd).fill(0);
            old[song][i] = old[song][i].concat(addition);
        }
    } else if (maxBeats < length) {
        const numToSub = length - maxBeats;
        for (let i = 0; i < 16; i++) {
            old[song][i] = old[song][i].slice(0, length - numToSub);
        }
    }
    old[song].push(title);

    return [...old];
}