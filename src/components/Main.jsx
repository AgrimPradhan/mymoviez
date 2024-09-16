import React, { useState } from "react";
import Box from "./Box.jsx";
import Details from "./Details.jsx";

const average = (arr) => arr.reduce((acc, cur) => acc + cur / arr.length, 0);
export default function Main({
  movies,
  watched,
  error,
  handleonaddwatched,
  handledeletewatched,
  loading,
}) {
  const avgImdbRating = average(
    watched.map((movie) => movie.imdbRating)
  ).toFixed(1);
  const avgUserRating = average(
    watched.map((movie) => movie.userRating)
  ).toFixed(1);
  const avgRuntime = average(watched.map((movie) => movie.runtime)).toFixed(1);
  const [selected, setselected] = useState([]);
  console.log(avgRuntime);

  return (
    <div className="main">
      <Box>
        {error && !loading && <h1>{error}</h1>}
        {loading && <h1>Loading Movies....</h1>}

        {!loading && !error && (
          <ul className="list">
            {movies?.map((movie) => (
              <li key={movie.imdbID} onClick={() => setselected([movie])}>
                <img src={movie.Poster} alt={`${movie.Title} poster`} />
                <h3>{movie.Title}</h3>
                <div>
                  <p>
                    <span>🗓</span>
                    <span>{movie.Year}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Box>
      <Box>
        {selected.length ? (
          <>
            <Details
              selected={selected[0]}
              setselected={setselected}
              key={selected[0].imdbID}
              watched={watched}
              handleonaddwatched={handleonaddwatched}></Details>
          </>
        ) : (
          <>
            <div className="summary">
              <h2>Movies you watched</h2>
              <div>
                <p>
                  <span>#️⃣</span>
                  <span>{watched.length} movies</span>
                </p>
                <p>
                  <span>⭐️</span>
                  <span>{avgImdbRating}</span>
                </p>
                <p>
                  <span>🌟</span>
                  <span>{avgUserRating}</span>
                </p>
                <p>
                  <span>⏳</span>
                  <span>{avgRuntime} min</span>
                </p>
              </div>
            </div>
            <ul className="list">
              {watched.map((movie) => (
                <li className="summarylist" key={movie.imdbID}>
                  <button
                    className="btn-back"
                    onClick={() => {
                      handledeletewatched(movie.imdbID);
                    }}>
                    X
                  </button>
                  <img src={movie.Poster} alt={`${movie.Title} poster`} />
                  <h3>{movie.Title}</h3>
                  <div>
                    <p>
                      <span>⭐️</span>
                      <span>{movie.imdbRating}</span>
                    </p>
                    <p>
                      <span>🌟</span>
                      <span>{movie.userRating}</span>
                    </p>
                    <p>
                      <span>⏳</span>
                      <span>{movie.runtime} min</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </Box>
    </div>
  );
}
