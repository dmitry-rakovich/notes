import { useState } from "react";

const Note = ({ text, id, notes, setNotes, setHashtags, refreshHashtags }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(text);

  const regexp = "\\#[a-zA-Z0-9]+";

  const handleSave = (id) => {
    const arr = Array.from(value.matchAll(regexp));
    const newArr = Array.from(new Set(arr.map((item) => item[0])));
    const newNotes = notes.map((note) => {
      if (note.id === id) {
        note.text = value;
        note.hashtags = newArr;
        return note;
      }
      return note;
    });
    localStorage.setItem("notes", JSON.stringify(newNotes));
    setNotes(newNotes);
    setIsEdit(false);
    setHashtags(refreshHashtags(newNotes));
  };

  const handleDelete = (id) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    localStorage.setItem("notes", JSON.stringify(filteredNotes));
    setNotes(filteredNotes);
    setHashtags(refreshHashtags(filteredNotes));
  };

  return (
    <div className="note">
      {isEdit ? (
        <>
          <input
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="buttons">
            <button onClick={() => setIsEdit(false)}>Отмена</button>
            <button
              disabled={!value.trim() ? true : false}
              onClick={() => handleSave(id)}
            >
              Сохранить
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="text">{text}</p>
          <div className="buttons">
            <button onClick={() => setIsEdit(true)}>Изменить</button>
            <button onClick={() => handleDelete(id)}>Удалить</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Note;
