import { useState } from "react";
import withApollo from "../lib/apollo";

import { gql, useMutation, useQuery } from "@apollo/client";

const QUERY_AUTHORS = gql`
  query {
    authors {
      id
      name
    }
  }
`;

const CREATE_AUTHOR = gql`
  mutation createAuthor($name: String!) {
    createAuthor(name: $name) {
      id
      name
    }
  }
`;

const DELETE_AUTHOR = gql`
  mutation deleteAuthor($id: ID!) {
    deleteAuthor(id: $id)
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(QUERY_AUTHORS, {});

  const [authorName, setAuthorName] = useState("");

  const [createAuthor, { cLoading, cError }] = useMutation(CREATE_AUTHOR, {
    refetchQueries: [{ query: QUERY_AUTHORS }],
  });

  const [deleteAuthor, { dLoading, dError }] = useMutation(DELETE_AUTHOR, {
    refetchQueries: [{ query: QUERY_AUTHORS }],
  });

  const onCreateAuthorSubmit = (e) => {
    e.preventDefault();
    if (authorName.trim()) {
      createAuthor({ variables: { name: authorName } });
    }
    setAuthorName("");
  };

  if (loading || !data || !data.authors) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      <ul>
        {data.authors.map((author) => (
          <li key={author.id}>
            {author.name}{" "}
            <button
              onClick={(e) => {
                e.preventDefault(e);
                deleteAuthor({ variables: { id: author.id } });
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={onCreateAuthorSubmit} disable={cLoading}>
        <h2>Create Author</h2>
        <p>
          <label>Name:</label>
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
          />
        </p>
        <p>
          <input type="submit" value="Create Author" />
        </p>
      </form>
    </div>
  );
};

export default withApollo({ ssr: true })(Home);
