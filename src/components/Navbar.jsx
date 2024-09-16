import React from "react";

export default function Navbar({ movies, children }) {
  return (
    <nav className="navbar">
      <div className="logo">
        <span role="img">🍿</span>
        <h2>MyMoviez</h2>
      </div>
      {children}
      <p className="num-results">
        Found <strong>{movies?.length}</strong> results
      </p>
    </nav>
  );
}
