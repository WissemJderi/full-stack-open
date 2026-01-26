import { useQuery } from "@apollo/client/react";
import { ALL_AUTHORS } from "../queries";
import SetBirthyear from "./SetBirthyear";

const Authors = () => {
  const authors = useQuery(ALL_AUTHORS);

  if (authors.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <SetBirthyear />
    </div>
  );
};

export default Authors;
