import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { ALL_AUTHORS, CHANGE_BIRTHYEAR } from "../queries";
import { useQuery } from "@apollo/client/react/react.cjs";

const SetBirthyear = () => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const authors = useQuery(ALL_AUTHORS);

  if (authors.loading) {
    return <div>loading...</div>;
  }

  const [changeBirthyear] = useMutation(CHANGE_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    changeBirthyear({ variables: { name: name, setBornTo: Number(born) } });

    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>Set Birthyear</h2>
      <form onSubmit={handleSubmit}>
        <label>
          name
          <select
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          >
            <option value="">select author...</option>
            {authors.data.allAuthors.map((author) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          born
          <input
            type="text"
            value={born}
            onChange={(e) => {
              setBorn(e.target.value);
            }}
          />
        </label>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default SetBirthyear;
