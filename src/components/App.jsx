import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Main from "./Main";
const KEY = "e0d2b8e9";
export default function App() {
  const [movies, setmovies] = useState([]);
  const [watched, setWatched] = useState(
    () => JSON.parse(localStorage.getItem("watched")) || []
  );
  const [query, setQuery] = useState("");
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);

  function handleonaddwatched(newmovie) {
    setWatched([...watched, newmovie]);
  }
  function handledeletewatched(movieimdbID) {
    setWatched(watched.filter((m) => m.imdbID !== movieimdbID));
  }

  useEffect(
    function () {
      const controller = new AbortController();
      const signal = controller.signal;

      async function fetchmovies() {
        try {
          seterror("");

          setloading(true);
          const data = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: signal }
          );
          if (!data.ok) {
            throw new Error("Oops! Something went wrong....");
          }

          const res = await data.json();
          if (res.Response === "False") throw new Error("Movie Not Found☹️");
          setmovies(res.Search);
          seterror("");
        } catch (err) {
          if (err.name !== "AbortError") {
            seterror(err.message);
          }
        } finally {
          setloading(false);
        }
      }
      if (query.length < 3) {
        setmovies([]);
        seterror("");
        return;
      }
      fetchmovies();
      return () => {
        controller.abort();
      };
    },
    [query]
  );

  useEffect(
    function () {
      function addinlist() {
        localStorage.setItem("watched", JSON.stringify(watched));
      }
      addinlist();
    },
    [watched]
  );

  return (
    <>
      <Navbar movies={movies}>
        {" "}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search"
          type="text"
          placeholder="Search movies..."
        />
      </Navbar>
      <Main
        handledeletewatched={handledeletewatched}
        handleonaddwatched={handleonaddwatched}
        movies={movies}
        watched={watched}
        query={query}
        error={error}
        loading={loading}
      />
    </>
  );
}
