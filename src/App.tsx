import { useEffect, useState } from "react";
import "./App.css";
import SideBar from "./components/sidebar/Sidebar";
import Editor from "./components/editor/Editor";
import { nanoid } from "nanoid";
import Split from "react-split";
import { Button } from "./components/ui/button";
import { Pen } from "lucide-react";
import { ThemeProvider } from "./components/theme.provider";
import { Toaster } from "./components/ui/toaster";
import { useToast } from "./components/ui/use-toast";
import { ToastAction } from "./components/ui/toast";

export type note = {
  body: string;
  title: string;
  id: string;
  createdAt: number;
  updatedAt: number;
};

const App = () => {
  const { toast } = useToast();

  const getNotes = (): note[] | undefined => {
    const notes = localStorage.getItem("notes");
    return notes ? (JSON.parse(notes) as note[]) : undefined;
  };

  const [notes, setNotes] = useState(getNotes() || []);
  const [activeNoteId, setActiveNoteId] = useState(
    (notes && notes[0]?.id) || undefined
  );

  const sortedNotes = notes.sort((a, b) => b.updatedAt - a.updatedAt);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    resetActiveNote();
  }, [notes]);

  const resetActiveNote = (): void => {
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

    let strippedTitle = title.split("");
    for (let char of title.split("")) {
      if (char.match(/^[0-9a-zA-Z]+$/)) break;
      strippedTitle.shift();
    }

    setNotes((oldNotes) =>
      oldNotes.map((note) =>
        note.id === activeNoteId
          ? {
              ...note,
              body: value,
              title: strippedTitle.join(""),
              updatedAt: Date.now(),
            }
          : note
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
    const newNote: note = {
      body: "",
      title: "",
      id: id,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setNotes((oldNotes) => oldNotes.concat(newNote));
    setActiveNote(id);
    console.log("New Note created");
  };

  const clearEmptyNote = (): void => {
    setNotes((oldNotes) => oldNotes.filter((note) => note.body?.length !== 0));
  };

  const deleteNote = (noteId: string): void => {
    console.log(`Note ${noteId} deleted`);
    const toDelete = notes.find((note) => note.id === noteId);
    if (!toDelete) return;
    setNotes((oldNotes) => oldNotes.filter((note) => note.id !== noteId));

    toast({
      description: "Note Deleted",
      action: (
        <ToastAction
          onClick={() => {
            setNotes((oldNotes) => oldNotes.concat(toDelete));
          }}
          altText="Undo deletion"
        >
          Undo
        </ToastAction>
      ),
    });
  };

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {notes.length > 0 ? (
          <div>
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
                  notes={sortedNotes}
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
          <LandingPage addNote={addNote} />
        )}
        <Toaster />
      </ThemeProvider>
    </>
  );
};

const LandingPage = ({ addNote }: { addNote: () => void }) => {
  return (
    <div className="h-dvh flex gap-3 items-center justify-center">
      <div>Start</div>
      <Button
        variant="outline"
        size="icon"
        className=""
        onClick={() => addNote()}
      >
        <Pen className="h-4 w-4"></Pen>
      </Button>
    </div>
  );
};

export default App;
