import { useState } from "react";
import Input from "./components/Input";
import Note from "./components/Note";
import "./App.css";

function App() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );
  const [hashtags, setHashtags] = useState(
    Array.from(
      new Set(notes.flatMap((note) => note.hashtags.map((item) => item)))
    )
  );
  const refreshHashtags = (arr) => {
    return Array.from(
      new Set(arr.flatMap((note) => note.hashtags.map((item) => item)))
    );
  };

  const filterNotes = (text) => {
    const notes = JSON.parse(localStorage.getItem("notes")).filter((item) =>
      item.hashtags.includes(text)
    );
    setNotes(notes);
  };

  return (
    <div className="App">
      <div className="container">
        <Input
          setNotes={setNotes}
          notes={notes}
          setHashtags={setHashtags}
          refreshHashtags={refreshHashtags}
        />
        <div className="hashtags">
          {!!hashtags.length && (
            <span
              className="hashtag"
              onClick={() =>
                setNotes(JSON.parse(localStorage.getItem("notes")))
              }
            >
              Показать все заметки
            </span>
          )}

          {hashtags.map((item) => (
            <span
              onClick={() => filterNotes(item)}
              className="hashtag"
              key={item}
            >
              {item}
            </span>
          ))}
        </div>
        {!notes.length && <h1 style={{ textAlign: "center" }}>Нет заметок</h1>}
        {notes.map((note) => (
          <Note
            key={note.id}
            setNotes={setNotes}
            notes={notes}
            setHashtags={setHashtags}
            refreshHashtags={refreshHashtags}
            {...note}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
