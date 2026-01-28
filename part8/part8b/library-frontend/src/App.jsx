import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Authors from "./components/Authors";
import Books from "./components/Books";
import LoginForm from "./components/LoginForm";
import NewBook from "./components/NewBook";
import { useState } from "react";
import { useApolloClient } from "@apollo/client/react";
import Recommend from "./components/Recommend";

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("books-library-user-token"),
  );
  const [errorMessage, setErrorMessage] = useState(null);
  const client = useApolloClient();

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const onLogout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <Router>
      <div style={{ display: "flex", gap: "10px" }}>
        <Link to="/">authors</Link>
        <Link to="/books">books</Link>
        {/* Show the login page if the token is not in the localStorage otherwise show what a use can do*/}
        {!token ? (
          <Link to="/login">login</Link>
        ) : (
          <>
            <Link to="/new-book">add book</Link>
            <Link to="/recommend">recommend</Link>
            <button onClick={onLogout}>logout</button>
          </>
        )}
      </div>
      <Routes>
        {!token && (
          <Route
            path="/login"
            element={<LoginForm setToken={setToken} setError={notify} />}
          />
        )}
        <Route path="/books" element={<Books />} />
        <Route path="/new-book" element={<NewBook />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/" element={<Authors />} />
      </Routes>
    </Router>
  );
};

export default App;
