import axios from "axios";
import { useState, useEffect } from "react";
import { Filter } from "./components/Filter";

function App() {
  const [countries, setCountries] = useState([]);
  const [searching, setSearching] = useState("");

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((res) => {
        setCountries(res.data);
      });
  }, []);

  const changeSearching = (e) => {
    setSearching(e.target.value);
  };

  return (
    <>
      <div>
        find countries
        <input type="text" value={searching} onChange={changeSearching} />
      </div>
      <div>
        <Filter countries={countries} searching={searching} />
      </div>
    </>
  );
}

export default App;
