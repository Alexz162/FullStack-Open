const Show = ({ result }) => {

  const api_key = import.meta.env.VITE_SOME_KEY

  return (
    <>
      <h1>{result.name.common}</h1>
      <p>{result.area}</p>
      <p>{result.capital[0]}</p>
      <p>languages</p>
      <ul>
        {Object.values(result.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img
        src={result.flags.svg}
        alt="flag of country"
        width={300}
        style={{ boder: "1px solid #000" }}
      />
    </>
  );
};

export default Show;
