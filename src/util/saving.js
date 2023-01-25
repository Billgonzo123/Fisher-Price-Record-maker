export const downloadSave = (notes) => {
    
    let generatedFile = '';
    for(let i = 15 ; i >=0 ; i--){
        if (i !== 15) generatedFile += '\n';
        // eslint-disable-next-line no-loop-func
        notes[i].forEach((beat) => {
          
            if (beat) {
                generatedFile += '+';
            } else{
                generatedFile += '-';
            }
        });
    };

    generatedFile += `\n${notes[16]}`

    let blob = new Blob([generatedFile], { type: "text/plain" });
    const url = URL.createObjectURL(blob);


    var element = document.createElement('a');
    element.setAttribute('href', url);
    element.setAttribute('download', `${notes[16]}.fpr`);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);


};

export function downloadScad(textData) {
    const generatedFile = textData;
    let blob = new Blob([generatedFile.text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);


    var element = document.createElement('a');
    element.setAttribute('href', url);
    element.setAttribute('download', `${generatedFile.title}.scad`);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };
