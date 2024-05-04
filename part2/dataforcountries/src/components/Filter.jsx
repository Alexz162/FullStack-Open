import React, { useState } from "react";
import Show from "./Show";
import ShowCountry from "./ShowCountry";

export const Filter = ({ searching, countries }) => {
  const filteredCountries = countries.filter((c) =>
    c.name.common.toLowerCase().includes(searching.toLowerCase())
  );

  console.log(filteredCountries);
  if (filteredCountries.length > 10) {
    return "to many maches";
  } else if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
    return (
      <>
        {filteredCountries.map((c) => (
          <ul>
            <ShowCountry
              key={c.name.common}
              result={c}
            />
          </ul>
        ))}
      </>
    );
  } else if (filteredCountries.length == 1) {
    return filteredCountries.map(fil=> <Show result={fil} />) ;
  }
};
