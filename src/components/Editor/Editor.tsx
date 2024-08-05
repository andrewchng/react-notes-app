import { useState } from "react";
import { note } from "../../App";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import "./Editor.css"

type EditorProps = {
  currentNote: note | undefined;
  updateNote : Function
};

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

export default function Editor({ currentNote, updateNote }: EditorProps) {
  const [selectedTab, setSelectedTab] = useState("write");
  return (
    <div>
      {currentNote && (
        <div className="content">
          <ReactMde
            minEditorHeight={95.5}
            minPreviewHeight={85.5}
            heightUnits="vh"
            classes={ {"textArea" : "editor", "toolbar" : "editor"}}
            value={currentNote.body}
            onChange={(value =>{
                updateNote(value);
            })}
            selectedTab={selectedTab as "write" | "preview"}
            onTabChange={setSelectedTab}
            generateMarkdownPreview={(markdown) =>
              Promise.resolve(converter.makeHtml(markdown))
            }
          />
        </div>
      )}
    </div>
  );
}
