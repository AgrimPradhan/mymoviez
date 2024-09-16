import React, { useState } from "react";

export default function Box({ children }) {
  const [showed, setshow] = useState(true);
  return (
    <div className="box">
      <button onClick={() => setshow((prev) => !prev)} className="btn-toggle">
        {showed ? "+" : "-"}
      </button>
      {showed && children}
    </div>
  );
}
