import { useState } from "react";
const Input = ({ notes, setNotes, setHashtags, refreshHashtags }) => {
  const [text, setText] = useState("");
  const regexp = "\\#[a-zA-Z0-9]+";

  const checkHashtags = () => {
    const arr = Array.from(text.matchAll(regexp));
    const newArr = Array.from(new Set(arr.map((item) => item[0])));
    return newArr;
  };

  const handleSave = () => {
    const hashtags = checkHashtags();
    const newNote = {
      id: String(Math.random() * 10000),
      text: text,
      hashtags: hashtags,
    };
    localStorage.setItem("notes", JSON.stringify([newNote, ...notes]));
    setNotes(JSON.parse(localStorage.getItem("notes")));
    setText("");
    setHashtags(refreshHashtags([newNote, ...notes]));
  };

  return (
    <>
      <div className="input-block">
        <input
          autoFocus
          value={text}
          onInput={(e) => setText(e.target.value)}
          placeholder="Введите текст заметки"
        />
        <button disabled={!text.trim() ? true : false} onClick={handleSave}>
          Сохранить
        </button>
      </div>
    </>
  );
};

export default Input;
