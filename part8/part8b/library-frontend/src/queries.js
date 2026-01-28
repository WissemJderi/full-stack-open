import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query AllAuthors {
    allAuthors {
      bookCount
      born
      name
    }
  }
`;

export const ALL_BOOKS = gql`
  query AllBooks {
    allBooks {
      author {
        name
      }
      id
      published
      title
      genres
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation AddBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      genres
      id
      published
      title
      author {
        name
        born
        bookCount
      }
    }
  }
`;

export const CHANGE_BIRTHYEAR = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      bookCount
      born
      name
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const ME = gql`
  query Query {
    me {
      favoriteGenre
    }
  }
`;

export const BOOKS_BY_GENRE = gql`
  query AllBooks($genre: String) {
    allBooks(genre: $genre) {
      id
      title
      author {
        name
      }
      genres
      published
    }
  }
`;
