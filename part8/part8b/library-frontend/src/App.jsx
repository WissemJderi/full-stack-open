import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

const App = () => {
  return (
    <Router>
      <div style={{ display: "flex", gap: "10px" }}>
        <Link to="/">authors</Link>
        <Link to="/books">books</Link>
        <Link to="/new-book">add book</Link>
      </div>
      <Routes>
        <Route path="/books" element={<Books />} />
        <Route path="/new-book" element={<NewBook />} />
        <Route path="/" element={<Authors />} />
      </Routes>
    </Router>
  );
};

export default App;
