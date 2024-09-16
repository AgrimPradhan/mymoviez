import React, { useEffect, useState } from "react";
import Star from "./Star";
const KEY = "e0d2b8e9";

export default function Details({
  selected,
  setselected,
  handleonaddwatched,
  watched,
}) {
  const [dets, setdets] = useState([]);
  const [rated, setrated] = useState(0);
  useEffect(() => {
    const changetitle = () => {
      document.title = `MyMoviez | ${selected.Title}`;
    };
    changetitle();
    return () => {
      document.title = "MyMoviez";
    };
  }, [selected]);

  useEffect(() => {
    async function getdetails() {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${KEY}&i=${selected.imdbID}`
      );
      const data = await res.json();
      setdets(data);
    }
    getdetails();
  }, [selected]);

  useEffect(
    function () {
      function callback(e) {
        if (e.code == "Escape") {
          setselected([]);
        }
      }
      document.addEventListener("keydown", callback);
      return () => {
        document.removeEventListener("keydown", callback);
      };
    },

    []
  );

  function handleaddwatched() {
    const newmovie = {
      Title: dets?.Title,
      Poster: dets?.Poster,
      imdbID: dets?.imdbID,
      imdbRating: dets?.imdbRating,
      userRating: rated,
      runtime: Number(dets?.Runtime.slice(0, 3)),
    };
    console.log(newmovie);
    setrated(0);
    handleonaddwatched(newmovie);
  }
  const index = watched.map((item) => item.imdbID).indexOf(selected.imdbID);
  const iscontain = index == -1 ? true : false;
  console.log(iscontain);

  return (
    <div className="details">
      <button className="btn-back " onClick={() => setselected([])}>
        ⬅
      </button>
      <header>
        <img src={`${selected.Poster}`} alt={`${selected.Title} poster`} />

        <div className="name"> {selected.Title}</div>
      </header>
      {rated ? (
        <button onClick={handleaddwatched} className="addlist">
          Add to the List
        </button>
      ) : null}

      {iscontain && (
        <div className="stars">
          <Star
            key={selected.imdbID}
            max={10}
            styles={{ width: 20, height: 20, cursor: "pointer" }}
            onsetrate={setrated}></Star>
        </div>
      )}
      {iscontain || (
        <div className="addlist">
          You have rated this movie {watched[index].userRating} ⭐
        </div>
      )}
      <section>
        <div>
          {" "}
          <strong style={{ fontWeight: 600 }}>Rating </strong>⭐ :{" "}
          {dets?.Ratings?.at(0)?.Value}{" "}
        </div>
        <div>
          {" "}
          <strong style={{ fontWeight: 600 }}>Genres 🎬</strong> : {dets?.Genre}{" "}
        </div>
        <div>
          {" "}
          <strong style={{ fontWeight: 600 }}>Starring 🎭 </strong>:{" "}
          {dets?.Actors}{" "}
        </div>
        <div>
          {" "}
          <strong style={{ fontWeight: 600 }}>Release Date 📅 : </strong>{" "}
          {dets.Released}
        </div>
        <div>
          {" "}
          <strong style={{ fontWeight: 600 }}>Runtime ⏳ : </strong>{" "}
          {dets.Runtime}
        </div>
        <div
          style={{ fontWeight: 200, fontSize: "1.3rem", lineHeight: "2.2rem" }}>
          {dets?.Plot}
        </div>
      </section>
    </div>
  );
}
