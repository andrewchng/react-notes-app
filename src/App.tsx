import { useEffect, useState } from "react";
import "./App.css";
import SideBar from "./components/sidebar/Sidebar";
import Editor from "./components/editor/Editor";
import { nanoid } from "nanoid";
import Split from "react-split";
import { Button } from "./components/ui/button";
import { Pen } from "lucide-react";

export type note = {
  body: string;
  title: string;
  id: string;
};

const App = () => {
  const getNotes = (): note[] | undefined => {
    const notes = localStorage.getItem("notes");
    return notes ? (JSON.parse(notes) as note[]) : undefined;
  };

  const [notes, setNotes] = useState(getNotes() || []);
  const [activeNoteId, setActiveNoteId] = useState(
    (notes && notes[0]?.id) || undefined
  );

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    resetActiveNote();
  }, [notes]);

  const resetActiveNote = () => {
    const note = notes.find((note) => note.id === activeNoteId);
    if (!note && notes.length > 0) {
      setActiveNoteId(notes[notes.length - 1].id);
    }
  };

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
      {notes.length > 0 ? (
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
      ) : (
        <div>
          <h1>NO NOTES</h1>
          <Button
            variant="outline"
            size="icon"
            className="ml-auto"
            onClick={() => addNote()}
          >
            <Pen className="h-4 w-4"></Pen>
          </Button>
        </div>
      )}
    </>
  );
}

export default App;
