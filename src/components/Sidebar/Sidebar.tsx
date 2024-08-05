import "./Sidebar.css";
import { note } from "../../App";
import { Button } from "@/components/ui/button";
import { Trash, Pen } from "lucide-react";
import { ModeToggle } from "../mode-toggle";
import { useEffect, useRef } from "react";
import { Separator } from "../ui/separator";

const Timestamp = ({ note }: { note: note }) => {
  const date = new Date(note.updatedAt);
  const day = date.getDate();
  let timestamp = "";
  if (day !== new Date().getDate()) {
    timestamp = day + "/" + date.getMonth() + "/" + date.getFullYear();
  } else {
    const hours = date.getHours();
    const am_pm = hours > 12 ? "PM" : "AM";
    const am_pm_hr = hours > 12 ? hours - 12 : hours;
    const mins = date.getMinutes();
    const min_display = mins < 10 ? "0" + mins.toString() : mins;
    timestamp = `${am_pm_hr}:${min_display} ${am_pm}`;
  }
  return <div className="timestamp text-xs">{timestamp}</div>;
};

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
  const scrollableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollableRef.current?.scrollTo(0, 0);
  }, [notes]);

  return (
    <div className="sidebar overflow-hidden">
      <div className="h-14 flex p-2  ">
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
      <div ref={scrollableRef} className="notes-list">
        {notes.map((note, i) => (
          <div className="note-container">
            <div
              onClick={() => {
                setActiveNote(note.id);
                clearEmptyNote();
              }}
              key={note.id}
              className={`note group ${
                activeNoteId === note.id ? "active" : ""
              }`}
            >
              <div className="mr-auto flex-col overflow-hidden">
                <div className="title">{note.title}</div>
                <Timestamp note={note} />
              </div>
              <Button
                className="hidden group-hover:flex "
                variant="ghost"
                onClick={() => deleteNote(note.id)}
                size="icon"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            {i < notes.length - 1 && <Separator className="my-1" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
