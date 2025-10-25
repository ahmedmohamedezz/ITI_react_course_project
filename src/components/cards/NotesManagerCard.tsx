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
    <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl shadow-lg mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Notes Manager
      </h2>

      <form
        onSubmit={addNote}
        className="flex flex-col sm:flex-row items-center gap-4 mb-8"
      >
        <input
          type="text"
          value={noteContent}
          placeholder="New note..."
          onChange={(e) => setNoteContent(e.target.value)}
          className="w-full sm:flex-1 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        <select
          value={notePriority}
          onChange={(e) => setNotePriority(e.target.value)}
          className="w-full sm:w-48 border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-all shadow"
        >
          Add
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {["important", "normal", "delayed"].map((priority) => (
          <div
            key={priority}
            className={`p-5 rounded-xl border shadow-sm ${
              priority === "important"
                ? "bg-red-50 border-red-200"
                : priority === "delayed"
                ? "bg-yellow-50 border-yellow-200"
                : "bg-green-50 border-green-200"
            }`}
          >
            <h3
              className={`text-xl font-semibold mb-3 capitalize ${
                priority === "important"
                  ? "text-red-700"
                  : priority === "delayed"
                  ? "text-yellow-700"
                  : "text-green-700"
              }`}
            >
              {priority}
            </h3>

            <ul className="space-y-3">
              {notes
                .map((note, i) => ({ ...note, index: i }))
                .filter((n) => n.priority === priority)
                .map((note) => (
                  <li
                    key={note.index}
                    className="bg-white border border-gray-200 p-3 rounded-lg flex justify-between items-center shadow-sm"
                  >
                    <span className="text-gray-800 text-sm sm:text-base">
                      {note.content}
                    </span>
                    <select
                      value={note.priority}
                      onChange={(e) =>
                        updatePriority(note.index, e.target.value)
                      }
                      className="border border-gray-300 rounded-md text-sm px-2 py-1 focus:ring-1 focus:ring-blue-500 bg-gray-50"
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
