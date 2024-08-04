import "./Sidebar.css";
import { note } from "../../App";

type SideBarProps = {
  notes: note[];
  setActiveNote: Function;
  addNote: Function;
  activeNoteId: string | undefined;
  deleteNote : Function
  clearEmptyNote: Function
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
      <div className="h-10 bg-blue-300">
        <button onClick={() => addNote()}>Add</button>
      </div>
      <div className="notes-list">
        {notes.map((note) => (
          <div
            onClick={() => {
              setActiveNote(note.id)
              clearEmptyNote()
            }}
            key={note.id}
            className={`note flex ${activeNoteId === note.id ? "active" : ""}`}
          >
            <h3 className="title mr-auto">{note.title}</h3>
            <button onClick={() => deleteNote(note.id)} className="delete-btn "> delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
