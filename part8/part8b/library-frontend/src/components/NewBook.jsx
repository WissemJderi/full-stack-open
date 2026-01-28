import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { ALL_AUTHORS, BOOKS_BY_GENRE, CREATE_BOOK } from "../queries";

const NewBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    update: (cache, { data: { addBook } }) => {
      cache.updateQuery(
        { query: BOOKS_BY_GENRE, variables: { genre: null } },
        (data) => {
          if (!data) return { allBooks: [addBook] };
          return { allBooks: data.allBooks.concat(addBook) };
        },
      );

      addBook.genres.forEach((g) => {
        cache.updateQuery(
          { query: BOOKS_BY_GENRE, variables: { genre: g } },
          (data) => {
            if (!data) return { allBooks: [addBook] };
            return { allBooks: data.allBooks.concat(addBook) };
          },
        );
      });

      cache.updateQuery({ query: ALL_AUTHORS }, (data) => {
        if (!data) return data;
        return {
          allAuthors: data.allAuthors.map((author) =>
            author.name === addBook.author.name
              ? { ...author, bookCount: author.bookCount + 1 }
              : author,
          ),
        };
      });
    },
  });
  const submit = async (event) => {
    event.preventDefault();
    createBook({
      variables: { title, author, published: Number(published), genres },
    });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
