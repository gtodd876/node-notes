const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const notes = require('./notes');
const titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't',
};
const bodyOptions = {
  describe: 'The body of the note',
  demand: true,
  alias: 'b',
};
const argv = yargs
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions,
  })
  .command('list', 'List all notes')
  .command('read', 'Read a note', {
    title: titleOptions,
    body: bodyOptions,
  })
  .command('remove', 'Remove a note', {
    title: titleOptions,
  })
  .help().argv;
var command = argv._[0];

switch (command) {
  case 'add':
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
      console.log(`Note added`);
      notes.logNote(note);
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
      ? `Note retrieved - Title: ${selectedNote.title} Body: ${
          selectedNote.body
        }`
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
