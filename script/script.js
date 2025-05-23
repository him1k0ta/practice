import { TEXTS } from './constants.js';

function encode() {
    let abc = TEXTS.LOWERCASE_ABC;
    let ABC = TEXTS.UPPERCASE_ABC;
    let text = document.getElementById('input-area').value;
    let output = '';
 
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        let found = false;

        for (let j = 0; j < abc.length; j++) {
            if (char === abc[j] || char === ABC[j]) {
                let newPos = (j + 13) % 26;
                
                if (char === abc[j]) {
                    output += abc[newPos];
                } else {
                    output += ABC[newPos];
                }
                found = true;
                break;
            }
        }

        if (!found) {
            output += char;
        }
    }

    document.getElementById('output-area').value = output;
}

document.addEventListener('DOMContentLoaded', function() {
    document.title = TEXTS.TITLE;

    document.getElementById('input-area').addEventListener('input', encode);
});