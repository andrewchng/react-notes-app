import "./Sidebar.css"
import { note } from "../../App";

type SideBarProps = {
    notes: note[];
    setActiveNote: Function
}

const SideBar = ({ notes, setActiveNote } : SideBarProps) => {
  return (
    <div className="sidebar">
      <div className="h-10 bg-blue-300">
        <h1>icons for add</h1>
      </div>
      <div className="notes-list">
        {notes.map(note => (
          <div onClick={()=>setActiveNote(note.id)} key={note.id} className="note">
            <h3 className="title">{note.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideBar