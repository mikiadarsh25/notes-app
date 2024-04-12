const fs = require("fs");
const chalk = require("chalk");
const { title } = require("process");

const addNotes = (title, body) => {
  const notes = loadNotes();
  // const duplicateNotes = notes.filter((note) => note.title == title);
  const duplicateNote = notes.find((note) => note.title == title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse.bold("New notes added!"));
  } else {
    console.log(chalk.red.inverse.bold("Note title taken!"));
  }
};

// Writing data into notes.js
const saveNotes = (arr) => {
  const dataJSON = JSON.stringify(arr); // Array to JSON convert
  return fs.writeFileSync("notes.json", dataJSON); // Pushing JSON into notes.json file
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json"); //Reading JSON data from notes.json
    const dataJSON = dataBuffer.toString(); // Changing JSON to string
    return JSON.parse(dataJSON); // String to object
  } catch (error) {
    return [];
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);

  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse("Note removed!"));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.red.inverse("No note found!"));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.green.inverse("Your Notes.."));
  notes.forEach((note) => {
    console.log(note.title);
  });
};

const readNote = (title) => {
  const notes = loadNotes();
  notes.forEach((note) => {
    if (note.title === title) {
      console.log(chalk.green.inverse.bold(note.title));
      console.log(note.body);
    } else {
      console.log(chalk.red("Note not found!"));
    }
  });
};

module.exports = {
  addNotes: addNotes,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
