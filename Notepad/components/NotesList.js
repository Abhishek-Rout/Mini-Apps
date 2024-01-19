import Note from './Note';
import AddNote from './AddNote';
import { v4 as uuid } from 'uuid';

import Search from './Search';
import { useState, useEffect } from 'react';

const NotesList = () => {
  const [inputText, setInputText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("Notes")) || []);
  const [editToggle, setEditToggle] = useState(null);

  const editNote = (id, text) => {
    setEditToggle(id);
    setInputText(text);
  }

  useEffect(() => {
    localStorage.setItem("Notes", JSON.stringify(notes));
  }, [notes]);

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  const saveNote = () => {
    const date = new Date();

    if (editToggle) {
      setNotes(notes.map((note) => (
        note.id === editToggle ?
          { ...note, text: inputText, date: date.toLocaleDateString() }
          : note
      )))
    } else {
      setNotes((prevNotes) => [
        ...prevNotes, {
          id: uuid(),
          text: inputText,
          date: date.toLocaleDateString(),
        }
      ])
    }

    setInputText("")
    setEditToggle(null);
  }
  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchText)
  );
  return (
    <>
      <Search handleSearchNote={setSearchText} />
      <div className='notes-list'>
        {filteredNotes.map((note) => (
          editToggle === note.id ?
            <AddNote key={note.id} inputText={inputText} setInputText={setInputText} saveHandler={saveNote} />
            :
            <Note
              key={note.id}
              id={note.id}
              text={note.text}
              date={note.date}
              handleDeleteNote={deleteNote}
              handleEditNote={editNote}
            />
        ))}
        <AddNote inputText={editToggle === null ? inputText : ''} setInputText={editToggle === null ? setInputText : null} saveHandler={saveNote} />
      </div>
    </>
  );
};

export default NotesList;