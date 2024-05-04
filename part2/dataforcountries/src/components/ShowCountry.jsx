import { useState } from "react";
import Show from "./Show";

export default function ShowCountry({ result }) {
  const [showCountry, SetShowCountry] = useState(false);

  const handleShow = () => {
    SetShowCountry(!showCountry);
  };

  return (
    <li >
      {result.name.common}
      <button onClick={ handleShow}>
        show
      </button>
      {
        showCountry? <Show result={result} />:''
      }
    </li>
  );
}
