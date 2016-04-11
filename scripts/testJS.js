//testJS.js

console.log('starting');

function renderNumber(n) {
  var char = String.fromCharCode(n);
  var format = "<li>" + n + " : " + char + "</li>";
  // console.log(format);
  $('ul').append(format);
}

function start() {
  for(var i=1001; i<2001; i++){
    renderNumber(i);
  }
}

//$(document).ready(start);



/*
do all nonprintables not register with keypress? looks like only enter?? well i guess that does it.
bind to key down:
  disable defaults if backspace, tab
  treat enter as nonprintable
  handle nonprintables
    remove class
    add proper class
    update text
bind to keypress:
  if enter, do nothing.
  else:
    remove class
    add single char class
    update text:

706 : ˂
707 : ˃
708 : ˄
709 : ˅
U+1F50D
*/