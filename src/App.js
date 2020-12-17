import { axisBottom, axisRight, scaleBand, scaleLinear, select } from "d3";
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
      const xScale = scaleBand()
        .domain(data.map((value, index) => index))
        .range([0, 300])
        .padding(0.5);

      // svg is 150 px high
      const yScale = scaleLinear().domain([0, 150]).range([150, 0]);

      const colorScale = scaleLinear()
        .domain([75, 100, 150])
        .range(["green", "orange", "red"])
        .clamp(true);

      const xAxis = axisBottom(xScale).ticks(data.length);
      svg.select(".x-axis").style("transform", "translateY(150px)").call(xAxis);

      const yAxis = axisRight(yScale);
      svg.select(".y-axis").style("transform", "translateX(300px)").call(yAxis);

      // bandwidth = width of a band
      // placing the fill AFTER transition animates the color change
      svg
        .selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .style("transform", "scale(1, -1)")
        .attr("x", (value, index) => xScale(index))
        .attr("y", -150)
        .attr("width", xScale.bandwidth())
        .transition()
        .attr("fill", colorScale)
        .attr("height", (value) => 150 - yScale(value));
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
