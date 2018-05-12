goog.require("tutorial.notepad");

var noteData = [
  {'title': 'Note 1', 'content': 'Content of Note 1'},
  {'title': 'Note 2', 'content': 'Content of Note 2'}];

function main() {
  var noteListElement = document.getElementById('notes');
  var notes = tutorial.notepad.makeNotes(noteData, noteListElement);
}

main();
