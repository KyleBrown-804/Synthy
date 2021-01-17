// const { Tone } = require("tone/build/esm/core/Tone");
console.log("begin app.js");

const allKeys = [
    {
        "number": 81,
        "symbol": 'q',
        "note": ''
    },
    {
        "number": 49,
        "symbol": '1',
        "note": ''
    },
    {
        "number": 87,
        "symbol": 'w',
        "note": ''
    },
    {
        "number": 50,
        "symbol": '2',
        "note": ''
    },
    {
        "number": 69,
        "symbol": 'e',
        "note": ''
    },
    {
        "number": 82,
        "symbol": 'r',
        "note": ''
    },
    {
        "number": 51,
        "symbol": '3',
        "note": ''
    },
    {
        "number": 84,
        "symbol": 't',
        "note": ''
    },
    {
        "number": 52,
        "symbol":  '4',
        "note": ''
    },
    {
        "number": 89,
        "symbol":  'y',
        "note": ''
    },
    {
        "number": 53,
        "symbol":  '5',
        "note": ''
    },
    {
        "number": 85,
        "symbol":  'u',
        "note": ''
    },
    {
        "number": 73,
        "symbol":  'i',
        "note": ''
    },
    {
        "number": 54,
        "symbol":  '6',
        "note": ''
    },
    {
        "number": 79,
        "symbol":  'o',
        "note": ''
    },
    {
        "number": 55,
        "symbol":  '7',
        "note": ''
    },
    {
        "number": 80,
        "symbol":  'p',
        "note": ''
    },
    {
        "number": 65,
        "symbol":  'a',
        "note": ''
    },
    {
        "number": 56,
        "symbol":  '8',
        "note": ''
    },
    {
        "number": 83,
        "symbol":  's',
        "note": ''
    },
    {
        "number": 57,
        "symbol":  '9',
        "note": ''
    },
    {
        "number": 68,
        "symbol":  'd',
        "note": ''
    },
    {
        "number": 48,
        "symbol":  '0',
        "note": ''
    },
    {
        "number": 70,
        "symbol":  'f',
        "note": ''
    },
    {
        "number": 71,
        "symbol":  'g',
        "note": ''
    },
];

//attach a click listener to a play button
document.querySelector('button')?.addEventListener('click', async () => {
    await Tone.start();
    console.log('audio is ready');
});

const polySynth = new Tone.PolySynth();
const reverb = new Tone.Reverb(2);
const chorus = new Tone.Chorus(3, 4, .3);

polySynth.connect(reverb);
polySynth.connect(chorus).toDestination();

// Sets up a default poly synthesizer with notes for each key from C3 to C5
function addPolySynth() {

    const keysList = keyboardDisplay.querySelectorAll("div.whitekey, div.blackkey");
    
    keysList.forEach(
        function(element, index) {

            let note = element.dataset.note;

            element.addEventListener('mousedown', function(event) {
                console.log(note);
                polySynth.triggerAttack(note, Tone.now(), .60);
                event.stopPropagation();
            });

            element.addEventListener('mouseup', function(event) {
                polySynth.triggerRelease(note);
                event.stopPropagation();
            });

            element.addEventListener('mouseleave', function(event) {
                polySynth.triggerRelease(note);
                event.stopPropagation();
            });

            allKeys[index].note = note;
        },
    );
}

addPolySynth();

let keysDown = {};

// Need to fix max polophony error with loud infinite sounds

// addEventListener("keydown", function(e) {
//     keysDown[e.key] = true;
//     let note = allKeys.find(key => key.symbol === e.key).note;
//     console.log(e.key, note);

//     polySynth.triggerAttack(note, Tone.now(), .60);
//     e.stopPropagation();
// }, false);

// addEventListener("keyup", function(e) {
//     delete keysDown[e.key];
//     let note = allKeys.find(key => key.symbol === e.key).note;
    
//     polySynth.triggerRelease(note);
//     e.stopPropagation();
// }, false);