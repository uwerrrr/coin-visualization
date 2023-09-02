import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const AllCoinChart = ({ coins }) => {
  const svgRef = useRef();
  const sortedCoins = coins.sort((a, b) => b.priceUsd - a.priceUsd);
  const top10Coins = sortedCoins.slice(5, 10);

  const [data, setDate] = useState(top10Coins);

  // Set the dimensions and margins of the graph
  const margin = { top: 30, right: 30, bottom: 70, left: 80 },
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  useEffect(() => {
    // Remove any existing SVG elements before rendering
    d3.select(svgRef.current).selectAll("*").remove();

    // Append the SVG object to the component's container
    const svg = d3
      .select(svgRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right + 100)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create scales for mapping data to the chart's dimensions
    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(data.map((d) => d.name))
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => parseFloat(d.priceUsd))])
      .range([height, 0]);

    // X axis
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");
    // X label
    svg
      .append("text")
      .attr("x", width / 2) // Position it in the middle of the chart
      .attr("y", height + margin.top + 40) // Position it below the X-axis
      .attr("text-anchor", "middle") // Center the text horizontally
      .text("Coin name");

    // Y axis
    svg.append("g").call(d3.axisLeft(y).ticks(10));
    // Y label
    svg
      .append("text")
      .attr("transform", "rotate(-90)") // Rotate the text vertically
      .attr("x", 0 - height / 2) // Position it in the middle of the Y-axis
      .attr("y", 0 - margin.left + 20) // Position it to the left of the Y-axis
      .attr("text-anchor", "middle") // Center the text horizontally
      .text("Price in USD");

    // Bars
    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.name))
      .attr("y", (d) => y(parseFloat(d.priceUsd)))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(parseFloat(d.priceUsd)))
      .attr("fill", "#69b3a2");
  }, [data]);

  return (
    <>
      <h3>Top 5 coins current price</h3>
      <svg
        ref={svgRef}
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
      >
        {/* Chart elements will be rendered here */}
      </svg>
    </>
  );
};

export default AllCoinChart;
