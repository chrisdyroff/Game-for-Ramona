var soundLocations = [
  {id: "chime", src: "sounds/chime.mp3"},
  {id: "woosh", src: "sounds/woosh.mp3"},
  {id: "snap2", src: "sounds/Snap test (1).m4a"},
  {id: "snap", src: "sounds/Snap test.m4a"}
];

var letterSounds = [ //cap because that's how my phone saves them.
  {id: "a", src: "sounds/alphabet/A.m4a"},
  {id: "b", src: "sounds/alphabet/B.m4a"},
  {id: "c", src: "sounds/alphabet/C.m4a"},
  {id: "d", src: "sounds/alphabet/D.m4a"},
  // {id: "e", src: "sounds/alphabet/E.m4a"},
  // {id: "f", src: "sounds/alphabet/F.m4a"},
  // {id: "g", src: "sounds/alphabet/G.m4a"},
  // {id: "h", src: "sounds/alphabet/H.m4a"},
  // {id: "i", src: "sounds/alphabet/I.m4a"},
  // {id: "j", src: "sounds/alphabet/J.m4a"},
  // {id: "k", src: "sounds/alphabet/K.m4a"},
  // {id: "l", src: "sounds/alphabet/L.m4a"},
  // {id: "m", src: "sounds/alphabet/M.m4a"},
  // {id: "n", src: "sounds/alphabet/N.m4a"},
  // {id: "o", src: "sounds/alphabet/O.m4a"},
  // {id: "p", src: "sounds/alphabet/P.m4a"},
  // {id: "q", src: "sounds/alphabet/Q.m4a"},
  // {id: "r", src: "sounds/alphabet/R.m4a"},
  // {id: "s", src: "sounds/alphabet/S.m4a"},
  // {id: "t", src: "sounds/alphabet/T.m4a"},
  // {id: "u", src: "sounds/alphabet/U.m4a"},
  // {id: "v", src: "sounds/alphabet/V.m4a"},
  // {id: "w", src: "sounds/alphabet/W.m4a"},
  // {id: "x", src: "sounds/alphabet/X.m4a"},
  // {id: "y", src: "sounds/alphabet/Y.m4a"},
  {id: "z", src: "sounds/alphabet/Z.m4a"}
];

var numberMap = [
  {number: 1, symbol: "!"},
  {number: 2, symbol: "@"},
  {number: 3, symbol: "#"},
  {number: 4, symbol: "$"},
  {number: 5, symbol: "%"},
  {number: 6, symbol: "^"},
  {number: 7, symbol: "&"},
  {number: 8, symbol: "*"},
  {number: 9, symbol: "("},
  {number: 0, symbol: ")"},
];

var nonPrintable = [
  {keyCode:8,   keyName:"backspace",  keyClass: "backspace", keyText:"backspace"},
  {keyCode:9,   keyName:"tab",        keyClass: "three-letter", keyText:"tab"},
  {keyCode:13,  keyName:"enter",      keyClass: "five-letter", keyText:"enter"},
  {keyCode:16,  keyName:"shift",      keyClass: "five-letter", keyText:"shift"}, // change color to prompt another key
  {keyCode:17,  keyName:"control",    keyClass: "four-letter", keyText:"ctrl"},
  {keyCode:18,  keyName:"alt",        keyClass: "three-letter", keyText:"alt"},
  {keyCode:32,  keyName:"space",      keyClass: "space", keyText:"space"},// may want to expand this
  {keyCode:27,  keyName:"escape",     keyClass: "three-letter", keyText:"esc"},
  {keyCode:37,  keyName:"left",       keyClass: "single-letter", keyText:"", keyTextCharCode: 706},
  {keyCode:38,  keyName:"up",         keyClass: "single-letter", keyText:"", keyTextCharCode: 708},
  {keyCode:39,  keyName:"right",      keyClass: "single-letter", keyText:"", keyTextCharCode: 707},
  {keyCode:40,  keyName:"down",       keyClass: "single-letter", keyText:"", keyTextCharCode: 709}
  // leaving these out for now, as I can't disable their native functionality.
  // {keyCode:166, KeyName:"back",       keyClass: "", keyText:""},
  // {keyCode:167, KeyName:"foward",     keyClass: "", keyText:""},
  // {keyCode:91,  keyName:"chromebook search", KeyText:""},// maybe therer's a magnifying glass i can use?
];

function setupSounds() {
  for (var i = 0; i < soundLocations.length; i++) {
    createjs.Sound.registerSound(soundLocations[i]);
  }
  for (var j = 0; j < letterSounds.length; j++) {
    createjs.Sound.registerSound(letterSounds[j]);
  }
}

function UpdateKeyText(t) {
  $("p").text(t);
}

function UpdateKeyClass(c) {
  $("p").removeClass().addClass(c);
  // $("p").addClass(c);
}

function HandleNonPrintables(event) {
  nonPrintable.forEach(function(el) {
    if (event.which == el.keyCode) {
      event.preventDefault();
      console.log("KeyCode",el.keyCode, "caught in keydown event,", el.keyName, "was pressed.");
      
      UpdateKeyClass(el.keyClass);
      if (el.keyText !== "") {
        UpdateKeyText(el.keyText);
      } else {
        var display = String.fromCharCode(el.keyTextCharCode);
        UpdateKeyText(display);
      }
      
      createjs.Sound.play("woosh");
    }
  });
}

function HandleText(event) {
    var pressed = String.fromCharCode(event.which).toLowerCase(); // don't think toLowerCase is necessary
    console.log("keypress event fired. ", event.which, "was pressed.");
    UpdateKeyClass("single-letter");
    UpdateKeyText(pressed);
    // createjs.Sound.play(pressed);
    createjs.Sound.play("chime");

}

$(document).keydown(HandleNonPrintables); // disable defaults, and handle non-printables
$(document).keypress(HandleText); // handle all other keys. admit that I'm not sure about enter or platform-specific
$(document).ready(setupSounds);

/*
looks like i'm getting different numbers from keydown/up than from keypress. noticable with comma, period, brace, etc.
i can't catch the backspace unless I use keydown, because i guess keypress waits too long.
i might try only for certain keys to use keydown and prevent their default behavior.
Did this, so I'm using keypress for all the letter keys, and keydown for all the non-printables.

i really need git commits to stop losing work. guess i could just use another file for production code in the mean time.
ignoring the rapid events called on holding the keys for now. not noticable without sound. maybe with sound it'll highlight the fact that a key is being held.

2/22
going to try using the built in voice memo recordin app on my iphone. i can save m4a audio files to my google drive and pull them down.
2/23
got the sounds working as long as i use the web server. all i need to do is:
record voice memos on my phone.
name each file the letter.m4a
save them all to my google drive in a folder called alphabet
drop that folder into the project.
*/





