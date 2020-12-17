import { select } from "d3";
import React, { useEffect, useRef, useState } from "react";

import "./App.css";

// const data = [25, 30, 45, 60, 20];

function App() {
  const [data, setData] = useState([25, 30, 45, 60, 20]);
  const svgRef = useRef();

  // best time to access the svg DOM elemenet is in the useEffect hook
  useEffect(
    () => {
      const svg = select(svgRef.current);
      // selects all of the existing circle elements AND synchronize them with the data
      // enter new data represented in SVG
      // join creates the new circles
      // enter -> enters the circles
      // update -> updates the circles with a class of updated
      ////// If there's a pre-existing circle element, the update will reuse the circle as part of d3 and update with an updated class
      // If 6 circles exist, will remove one and re-use 6 since there are 5 elements in the data array
      svg
        .selectAll("circle")
        .data(data)
        .join(
          // works even if you take out all callback functions and replace with just "circle"
          // join method will create and append the circles for you
          (enter) => enter.append("circle"),
          (update) => update.attr("class", "updated"),
          // exit callback is default
          (exit) => exit.remove()
        )
        // r is radius
        // by placing it at the end after join, the styles are applied to both enter and update
        .attr("r", (value) => value)
        .attr("cx", (value) => value * 2)
        .attr("cy", (value) => value * 2)
        .attr("stroke", "red");
    },
    // empty dependency array results in the useEffect being only called once (once the DOM elements have been rendered)
    [data]
  );

  return (
    <>
      <svg ref={svgRef}></svg>
      <button onClick={() => setData(data.map((val) => val + 5))}>
        Update Data
      </button>
      <button onClick={() => setData(data.filter((val) => val <= 35))}>
        Filter Data
      </button>
    </>
  );
}

export default App;
