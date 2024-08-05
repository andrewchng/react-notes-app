import "./Sidebar.css";
import { note } from "../../App";
import { Button } from "@/components/ui/button";
import { Trash, Pen } from "lucide-react";
import { ModeToggle } from "../mode-toggle";

type SideBarProps = {
  notes: note[];
  setActiveNote: Function;
  addNote: Function;
  activeNoteId: string | undefined;
  deleteNote: Function;
  clearEmptyNote: Function;
};

const SideBar = ({
  notes,
  setActiveNote,
  clearEmptyNote,
  activeNoteId,
  deleteNote,
  addNote,
}: SideBarProps) => {
  return (
    <div className="sidebar">
      <div className="h-14 flex p-2 ">
        <ModeToggle></ModeToggle>
        <Button
          variant="outline"
          size="icon"
          className="ml-auto"
          onClick={() => addNote()}
        >
          <Pen className="h-4 w-4"></Pen>
        </Button>
      </div>
      <div className="notes-list">
        {notes.map((note) => (
          <div
            onClick={() => {
              setActiveNote(note.id);
              clearEmptyNote();
            }}
            key={note.id}
            className={`note group ${activeNoteId === note.id ? "active" : ""}`}
          >
            <span className="title mr-auto">{note.title}</span>
            <Button
              className="hidden group-hover:flex"
              variant="outline"
              onClick={() => deleteNote(note.id)}
              size="icon"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
