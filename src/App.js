import {
  axisBottom,
  axisRight,
  curveCardinal,
  line,
  scaleLinear,
  select,
} from "d3";
import React, { useEffect, useRef, useState } from "react";

import "./App.css";

// const data = [25, 30, 45, 60, 20];

function App() {
  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);
  const svgRef = useRef();

  // best time to access the svg DOM elemenet is in the useEffect hook
  useEffect(
    () => {
      const svg = select(svgRef.current);
      // domain is basically the input values
      // scaling the value and making it linear to range over 300 px long
      // which is how long the svg is
      const xScale = scaleLinear()
        .domain([0, data.length - 1])
        .range([0, 300]);

      // svg is 150 px high
      const yScale = scaleLinear().domain([0, 75]).range([150, 0]);

      const xAxis = axisBottom(xScale);
      svg.select(".x-axis").style("transform", "translateY(150px)").call(xAxis);

      const yAxis = axisRight(yScale);
      svg.select(".y-axis").style("transform", "translateX(300px)").call(yAxis);

      const myLine = line()
        .x((value, index) => xScale(index))
        .y(yScale)
        .curve(curveCardinal);

      svg
        .selectAll(".line")
        .data([data])
        .join("path")
        .attr("class", "line")
        .attr("d", myLine)
        .attr("fill", "none")
        .attr("stroke", "blue");
    },
    // empty dependency array results in the useEffect being only called once (once the DOM elements have been rendered)
    [data]
  );

  return (
    <>
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      {/* <button onClick={() => setData(data.map((val) => val + 5))}>
        Update Data
      </button>
      <button onClick={() => setData(data.filter((val) => val <= 35))}>
        Filter Data
      </button> */}
    </>
  );
}

export default App;
