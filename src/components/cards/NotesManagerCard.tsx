import { useState } from "react";

interface NoteType {
  priority: "normal" | "delayed" | "important";
  content: string;
}

function NotesManagerCard() {
  const [noteContent, setNoteContent] = useState<string>("");
  const [notePriority, setNotePriority] = useState<string>("");
  const [notes, setNotes] = useState<NoteType[]>([
    { priority: "normal", content: "work on react project" },
    { priority: "delayed", content: "learn about redux" },
    { priority: "important", content: "prepare for interviews" },
  ]);

  function addNote(e: React.FormEvent): void {
    e.preventDefault();
    if (!noteContent || !notePriority) return;

    setNotes((prev) => [
      ...prev,
      { priority: notePriority as NoteType["priority"], content: noteContent },
    ]);

    setNoteContent("");
    setNotePriority("");
  }

  function updatePriority(index: number, newPriority: string) {
    setNotes((prev) =>
      prev.map((note, i) =>
        i === index
          ? { ...note, priority: newPriority as NoteType["priority"] }
          : note
      )
    );
  }

  return (
    <div className="max-w-7xl mx-auto bg-white p-6 rounded-2xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Notes Manager
      </h2>

      <form
        onSubmit={addNote}
        className="flex flex-col sm:flex-row items-center gap-3 mb-6"
      >
        <input
          type="text"
          value={noteContent}
          placeholder="New note..."
          onChange={(e) => setNoteContent(e.target.value)}
          className="w-full sm:flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={notePriority}
          onChange={(e) => setNotePriority(e.target.value)}
          className="w-full sm:w-40 border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            Select priority
          </option>
          <option value="normal">Normal</option>
          <option value="important">Important</option>
          <option value="delayed">Delayed</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-all w-full sm:w-auto"
        >
          Add
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {["important", "normal", "delayed"].map((priority) => (
          <div key={priority} className="p-4 rounded-lg border bg-gray-100">
            <h3 className="text-lg font-semibold mb-2">{priority}</h3>

            <ul className="my-2">
              {notes
                .map((note, i) => ({ ...note, index: i }))
                .filter((n) => n.priority === priority)
                .map((note) => (
                  <li
                    key={note.index}
                    className="bg-white border border-gray-200 p-2 rounded-md flex justify-between items-center"
                  >
                    <span className="text-gray-700">{note.content}</span>
                    <select
                      value={note.priority}
                      onChange={(e) =>
                        updatePriority(note.index, e.target.value)
                      }
                      className="border border-gray-300 rounded-md text-sm px-2 py-1 focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="normal">Normal</option>
                      <option value="important">Important</option>
                      <option value="delayed">Delayed</option>
                    </select>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotesManagerCard;
