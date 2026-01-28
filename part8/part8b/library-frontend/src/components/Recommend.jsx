import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS, ME } from "../queries";

const Recommend = () => {
  const userInfo = useQuery(ME);
  const books = useQuery(ALL_BOOKS);

  if (userInfo.loading || books.loading) {
    return <div>loading...</div>;
  }

  const filteredBooks = books.data.allBooks.filter((book) =>
    book.genres.includes(userInfo.data.me.favoriteGenre),
  );
  return (
    <div>
      <h1>recommendations</h1>
      <p>
        books in your favorite genre{" "}
        <strong>{userInfo.data.me.favoriteGenre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.length > 0 ? (
            filteredBooks.map((a) => (
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">no books match your favorite genre</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
