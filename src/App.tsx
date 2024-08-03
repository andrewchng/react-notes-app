import { useState } from "react";
import "./App.css";
import SideBar from "./components/Sidebar/Sidebar";
import Editor from "./components/Editor/Editor";
import { nanoid } from "nanoid";
import Split from "react-split";

export type note = {
  body?: string;
  title: string;
  id: string;
  // isActive : boolean;
};

function seedNotes() {
  const notes: note[] = [
    { title: "hello", body: "body", id: nanoid() },
    { title: "hello2", body: "123123", id: nanoid() },
    { title: "hello3", body: "body", id: nanoid() },
    { title: "hello4", body: "body", id: nanoid() },
    { title: "hello", body: "body", id: nanoid() },
    { title: "hello2", body: "body", id: nanoid() },
    { title: "hello3", body: "body", id: nanoid() },
    { title: "hello4", body: "body", id: nanoid() },
    { title: "hello", body: "body", id: nanoid() },
    { title: "hello2", body: "body", id: nanoid() },
    { title: "hello3", body: "body", id: nanoid() },
    { title: "hello4", body: "body", id: nanoid() },
    { title: "hello", body: "body", id: nanoid() },
    { title: "hello2", body: "body", id: nanoid() },
    { title: "hello3", body: "body", id: nanoid() },
    { title: "hello4", body: "body", id: nanoid() },
    { title: "hello", body: "body", id: nanoid() },
    { title: "hello2", body: "body", id: nanoid() },
    { title: "hello3", body: "body", id: nanoid() },
    { title: "hello4", body: "body", id: nanoid() },
    { title: "hello", body: "body", id: nanoid() },
    { title: "hello2", body: "body", id: nanoid() },
    { title: "hello3", body: "body", id: nanoid() },
    { title: "hello4", body: "body", id: nanoid() },
    { title: "hello", body: "body", id: nanoid() },
    { title: "hello2", body: "body", id: nanoid() },
    { title: "hello3", body: "body", id: nanoid() },
    { title: "hello4", body: "body", id: nanoid() },
    { title: "hello", body: "body", id: nanoid() },
    { title: "hello2", body: "body", id: nanoid() },
    { title: "hello3", body: "body", id: nanoid() },
    { title: "hello4", body: "body", id: nanoid() },
  ];

  return notes;
}

function App() {
  const [notes, setNotes] = useState(seedNotes());
  const [activeNoteId, setActiveNoteId] = useState(notes[0].id);

  function setActiveNote(noteId: string) {
    const note = notes.find((note) => note.id === noteId);
    if (!note) {
      console.error(`No note of id ${noteId} found`);
    }
    console.log(`node of id ${noteId} set`);
    setActiveNoteId(noteId);
  }

  const updateNote = (value: string) => {
    setNotes((oldNotes) =>
      oldNotes.map((note) =>
        note.id === activeNoteId ? { ...note, body: value } : note
      )
    );
  };

  function getActiveNote(): note | undefined {
    const note = notes.find((note) => note.id === activeNoteId);
    if (!note) {
      console.error(`No note of id ${activeNoteId} found`);
    }
    return note;
  }

  return (
    <>
      <div className="">
        <Split className="flex" sizes={[25, 75]} direction="horizontal">
          <div className="sidebar-container">
            <SideBar setActiveNote={setActiveNote} notes={notes}></SideBar>
          </div>
          <div className="editor-container">
            <Editor updateNote={updateNote} currentNote={getActiveNote()}></Editor>
          </div>
        </Split>
      </div>
    </>
  );
}

export default App;
