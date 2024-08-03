import { useState } from "react";
import "./App.css";
import SideBar from "./components/Sidebar/Sidebar";
import Editor from "./components/Editor/Editor";
import { nanoid } from 'nanoid'

export type Note = {
  body?: string;
  title: string;
  id: string;
  // isActive : boolean;
};

function seedNotes() {
  const notes: Note[] = [
    { title: "hello", body: "body", id: nanoid()},
    { title: "hello2", body: "body", id: nanoid()},
    { title: "hello3", body: "body", id: nanoid()},
    { title: "hello4", body: "body", id: nanoid()},
    { title: "hello", body: "body", id: nanoid()},
    { title: "hello2", body: "body", id: nanoid()},
    { title: "hello3", body: "body", id: nanoid()},
    { title: "hello4", body: "body", id: nanoid()},
    { title: "hello", body: "body", id: nanoid()},
    { title: "hello2", body: "body", id: nanoid()},
    { title: "hello3", body: "body", id: nanoid()},
    { title: "hello4", body: "body", id: nanoid()},
    { title: "hello", body: "body", id: nanoid()},
    { title: "hello2", body: "body", id: nanoid()},
    { title: "hello3", body: "body", id: nanoid()},
    { title: "hello4", body: "body", id: nanoid()},
    { title: "hello", body: "body", id: nanoid()},
    { title: "hello2", body: "body", id: nanoid()},
    { title: "hello3", body: "body", id: nanoid()},
    { title: "hello4", body: "body", id: nanoid()},
    { title: "hello", body: "body", id: nanoid()},
    { title: "hello2", body: "body", id: nanoid()},
    { title: "hello3", body: "body", id: nanoid()},
    { title: "hello4", body: "body", id: nanoid()},
    { title: "hello", body: "body", id: nanoid()},
    { title: "hello2", body: "body", id: nanoid()},
    { title: "hello3", body: "body", id: nanoid()},
    { title: "hello4", body: "body", id: nanoid()},
    { title: "hello", body: "body", id: nanoid()},
    { title: "hello2", body: "body", id: nanoid()},
    { title: "hello3", body: "body", id: nanoid()},
    { title: "hello4", body: "body", id: nanoid()},
  ];

  return notes;
}


function App() {
  const [notes, setNotes] = useState(seedNotes());
  const [activeNote, setActiveNote] = useState(notes[0]);

  return (
    <>
      <div className="grid grid-cols-3 h-dvh">
        <div className="sidebar-container col-span-1">
          <SideBar setActiveNote={setActiveNote} notes={notes}></SideBar>
        </div>
        <div className="editor-container col-span-2">
          <Editor></Editor>
        </div>
      </div>
    </>
  );
}

export default App;


