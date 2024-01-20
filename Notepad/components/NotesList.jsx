import Note from './Note';
import AddNote from './AddNote';
import { v4 as uuid } from 'uuid';
import { url } from './constants';
import Search from './Search';
import { useState, useEffect } from 'react';

const NotesList = () => {
  const [input, setInput] = useState({ head: '', text: '' });
  const [searchText, setSearchText] = useState("");
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("Notes")) || []);
  const [editToggle, setEditToggle] = useState(null);
  const [addNote, setAddNote] = useState(false);
  const editNote = (id, head, text) => {
    setEditToggle(id);
    setInput({ head, text });
  }

  useEffect(() => {
    localStorage.setItem("Notes", JSON.stringify(notes));
  }, [notes]);

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  const isEmpty = () => {
    if (input.head === '' && input.text === '') {
      return true;
    }
    return false;
  }

  const saveNote = () => {
    setAddNote(false);
    const date = new Date();

    if (editToggle) {
      setNotes(notes.map((note) => (
        note.id === editToggle ?
          { ...note, head: input.head, text: input.text, date: date.toLocaleDateString() }
          : note
      )))
    } else {
      if (isEmpty()) return;
      setNotes((prevNotes) => [
        ...prevNotes, {
          id: uuid(),
          head: input.head,
          text: input.text,
          date: date.toLocaleDateString(),
        }
      ])
    }

    setInput({ head: '', text: '' });
    setEditToggle(null);
  }

  var filteredNotes = notes.filter((note) =>
    note.head?.toLowerCase().includes(searchText)
  );

  return (
    <>
      <Search handleSearchNote={setSearchText} />
      <div className='notes-list'>
        {!addNote ? <img
          className='icons'
          src={url + 'plus.png'}
          alt='Plus'
          onClick={() => setAddNote(true)}
        />
          : <AddNote input={input} setInput={setInput} saveNote={saveNote} />}
        {filteredNotes
          .slice(0)
          .reverse()
          .map((note) => (
            editToggle === note.id ?
              <AddNote key={note.id} input={input} setInput={setInput} saveNote={saveNote} />
              :
              <Note
                key={note.id}
                id={note.id}
                head={note.head}
                text={note.text}
                date={note.date}
                handleDeleteNote={deleteNote}
                handleEditNote={editNote}
              />
          ))}
      </div>
    </>
  );
};

export default NotesList;
