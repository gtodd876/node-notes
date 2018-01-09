const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const notes = require('./notes');
const argv = yargs.argv;
var command = argv._[0];

switch (command) {
  case 'add':
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
      console.log(`Note added`);
      logNote(note);
    } else {
      console.log('This note title already exists.');
    }
    break;
  case 'list':
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} notes.`);
    allNotes.forEach(note => notes.logNote(note));
    break;
  case 'read':
    var selectedNote = notes.getNote(argv.title);
    var readMessage = selectedNote
      ? `Note retrieved - Title: ${selectedNote.title} Body: ${selectedNote.body}`
      : `Note does not exist`;
    console.log(readMessage);
    break;
  case 'remove':
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note was removed' : 'Note not found';
    console.log(message);
    break;
  default:
    console.log('Command not recognized');
    break;
}
