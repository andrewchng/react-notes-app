import { useState } from "react";
import "./App.css";
import SideBar from "./components/sidebar/sidebar";
import Editor from "./components/editor/editor";
import { nanoid } from "nanoid";
import Split from "react-split";

export type note = {
  body: string;
  title: string;
  id: string;
};

function seedNotes() {
  const notes: note[] = [{ title: "hello", body: "hello", id: nanoid() }];

  return notes;
}

function App() {
  const [notes, setNotes] = useState(seedNotes());
  const [activeNoteId, setActiveNoteId] = useState(
    (notes[0] && notes[0].id) || undefined
  );

  const setActiveNote = (noteId: string) => {
    console.log(`note of id ${noteId} active`);
    setActiveNoteId(noteId);
  };

  const updateNote = (value: string) => {
    const title = value.split("\n")[0];
    setNotes((oldNotes) =>
      oldNotes.map((note) =>
        note.id === activeNoteId ? { ...note, body: value, title: title } : note
      )
    );
  };

  const getActiveNote = (): note | undefined => {
    const note = notes.find((note) => note.id === activeNoteId);
    if (!note) {
      console.warn(`No note of id ${activeNoteId} found`);
      return undefined;
    }

    return note;
  };

  const hasEmptyNote = (): boolean => {
    return notes.some((note) => note.body?.length === 0);
  };

  const addNote = (): void => {
    if (hasEmptyNote()) {
      return;
    }
    const id = nanoid();
    const newNote: note = { body: "", title: "", id: id };
    setNotes((oldNotes) => oldNotes.concat(newNote));
    setActiveNote(id);
    console.log("New Note created");
  };

  const clearEmptyNote = (): void => {
    setNotes((oldNotes) => oldNotes.filter((note) => note.body?.length !== 0));
  };

  const deleteNote = (noteId: string): void => {
    console.log(`Note ${noteId} deleted`);
    setNotes((oldNotes) => oldNotes.filter((note) => note.id !== noteId));
  };

  return (
    <>
      <div className="">
        <Split
          className="flex"
          sizes={[25, 75]}
          gutterSize={5}
          direction="horizontal"
        >
          <div className="sidebar-container">
            <SideBar
              setActiveNote={setActiveNote}
              clearEmptyNote={clearEmptyNote}
              addNote={addNote}
              notes={notes}
              deleteNote={deleteNote}
              activeNoteId={activeNoteId}
            ></SideBar>
          </div>
          <div className="editor-container">
            <Editor
              updateNote={updateNote}
              currentNote={getActiveNote()}
            ></Editor>
          </div>
        </Split>
      </div>
    </>
  );
}

export default App;
