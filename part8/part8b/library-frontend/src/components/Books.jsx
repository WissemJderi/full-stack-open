import { useQuery } from "@apollo/client/react";
import { BOOKS_BY_GENRE } from "../queries";
import { useState } from "react";

const Books = (props) => {
  const [genre, setGenre] = useState(null);
  const books = useQuery(BOOKS_BY_GENRE, { variables: { genre } });

  if (books.loading) {
    return <div>loading...</div>;
  }

  const genres = [
    ...new Set(books.data.allBooks.flatMap((book) => book.genres)),
  ];

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) => (
        <button key={genre} onClick={() => setGenre(genre)}>
          {genre}
        </button>
      ))}

      <button onClick={() => setGenre(null)}>all genres</button>
    </div>
  );
};

export default Books;
