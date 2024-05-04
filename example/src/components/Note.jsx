import React from "react";

export default function Note({ note, toggleImportance }) {
  const label = note.important ? "make no important" : "make important";
  return (
    <li className="note">
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  );
}
