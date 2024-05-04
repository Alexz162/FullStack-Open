import { useEffect, useState } from "react";
import noteService from './services/notes'
import axios from "axios";
import Note from "./components/Note";

const Notification =({message})=>{
  if(message===null){
    return null
  }
  return(
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState(null);
  const [newNotes, setNewNotes] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null)

  //useEffect
  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNotes,
      important: Math.random() < 0.5,
    };
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNotes("");
    });
  };
  const handleNoteChange = (event) => {
    setNewNotes(event.target.value);
  };
  if(!notes){
    return null
  }
  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changeNote = { ...note, important: !note.important };

    noteService.update(id,changeNote).then(returnedNote => {
      setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    }).catch(error =>{
      setErrorMessage(
        `'${note.content}' was alredy deleted`
      )
      setTimeout(()=>{
        setErrorMessage(null)
      },5000)
      setNotes(notes.filter(n=> n.id !== id))
    })
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form action="" onSubmit={addNote}>
        <input type="text" onChange={handleNoteChange} value={newNotes} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
