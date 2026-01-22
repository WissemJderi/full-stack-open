import React, { useState, useEffect } from "react";
import axios from "axios";
import { useField } from "./hooks";

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (!name) return;

    const fetchCountry = async () => {
      const response = await axios.get(
        `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`,
      );

      if (response.data) {
        setCountry({ data: response.data, found: true });
      } else {
        setCountry({ found: false });
      }
    };

    fetchCountry();
  }, [name]);

  return country;
};

const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (!country.found) {
    return <div>not found...</div>;
  }

  const { name, capital, population, flags } = country.data;

  return (
    <div>
      <h3>{name.common}</h3>
      <div>capital {capital}</div>
      <div>population {population}</div>
      <img src={flags.png} height="100" alt={`flag of ${name.common}`} />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;

