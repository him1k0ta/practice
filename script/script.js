function encode() {
    let abc = 'abcdefghijklmnopqrstuvwxyz';
    let ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let text = document.getElementById('inputArea').value;
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

    document.getElementById('outputArea').value = output;
}
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('inputArea').addEventListener('input', encode);
});