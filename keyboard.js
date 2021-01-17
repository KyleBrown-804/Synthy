const hotKeysWhite = [
    {
        "number": 81,
        "symbol": 'Q'
    },
    {
        "number": 87,
        "symbol": 'W'
    },
    {
        "number": 69,
        "symbol": 'E'
    },
    {
        "number": 82,
        "symbol": 'R'
    },
    {
        "number": 84,
        "symbol": 'T'
    },
    {
        "number": 89,
        "symbol":  'Y'
    },
    {
        "number": 85,
        "symbol":  'U'
    },
    {
        "number": 73,
        "symbol":  'I'
    },
    {
        "number": 79,
        "symbol":  'O'
    },
    {
        "number": 80,
        "symbol":  'P'
    },
    {
        "number": 65,
        "symbol":  'A'
    },
    {
        "number": 83,
        "symbol":  'S'
    },
    {
        "number": 68,
        "symbol":  'D'
    },
    {
        "number": 70,
        "symbol":  'F'
    },
    {
        "number": 71,
        "symbol":  'G'
    },
];

const hotKeysBlack = [
    {
        "number": 49,
        "symbol": '1'
    },
    {
        "number": 50,
        "symbol": '2'
    },
    {
        "number": 51,
        "symbol": '3'
    },
    {
        "number": 52,
        "symbol":  '4'
    },
    {
        "number": 53,
        "symbol":  '5'
    },
    {
        "number": 54,
        "symbol":  '6'
    },
    {
        "number": 55,
        "symbol":  '7'
    },
    {
        "number": 56,
        "symbol":  '8'
    },
    {
        "number": 57,
        "symbol":  '9'
    },
    {
        "number": 48,
        "symbol":  '0'
    },
];

const keyboardDisplay = document.getElementById('key-container');
const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

// Creates 2 Octave Keyboard starting at 4th octave going up, ends with C6
function populateKeyboard() {
    let html = "";    
    let octave = 0;
    let refKey = 3;

    // Populates keyboard for the given number of octaves
    for(; octave < 2; octave++) {

        for(let i = 0; i < notes.length; i++) {
            let hasSharp = true;
            let note = notes[i];

            if(note == 'E' || note == 'B') {
                hasSharp = false;
            }

            html += `<div class='whitekey' data-note='${note + (octave+refKey)}'>
            <div id="bottom">${note + (octave + refKey)}</div>`;

            if(hasSharp) {
                html += `<div class='blackkey' data-note='${note + '#' + (octave + refKey)}'>
                <div id="bottom">${note + "#" + (octave + refKey)}</div>
                </div>`;
            }
            html += '</div>'
        }    
    }

    html += `<div class='whitekey' data-note='${'C' + (octave+refKey)}'>
    <div id="bottom">${'C' + (octave + refKey)}</div>
    </div>`;

    keyboardDisplay.innerHTML = html;

    // Adds Symbol representations for hotkeys    
    const whiteKeys = keyboardDisplay.querySelectorAll("div.whitekey");
    const blackKeys = keyboardDisplay.querySelectorAll("div.blackkey");

    blackKeys.forEach(
        function(element, index) {
            element.innerHTML += `<div id='hotkey-black'>${'( ' + hotKeysBlack[index].symbol + ' )'}</div>`;
        },
    );
    whiteKeys.forEach(
        function(element, index) {
            element.innerHTML += `<div id='hotkey-white'>${'( ' + hotKeysWhite[index].symbol + ' )'}</div>`;
        },
    );
}

populateKeyboard();

// Everything below is taken from w3Schools How to Create a Draggable Element
dragElement(document.getElementById("keyboard"));

function dragElement(elmnt) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  
  // if present, the header is where you move the DIV from:
  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } 
  // otherwise, move the DIV from anywhere inside the DIV:
  else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;

    document.onmouseup = closeDragElement;

    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();

    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  // stop moving when mouse button is released:
  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}