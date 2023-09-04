import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const TimeChart = ({ coinsPrice, makeCoinTimeRequest }) => {
  const svgRef = useRef();

  const coinsPrice30 = Object.keys(coinsPrice).reduce((acc, cur) => {
    acc[cur] = coinsPrice[cur]
      .sort((a, b) => b.time - a.time)
      .slice(0, 30)
      .sort((a, b) => a.time - b.time);
    return acc;
  }, {});

  const coinsPrice30Keys = Object.keys(coinsPrice30);

  const coinsPriceArr = coinsPrice30Keys.reduce((acc, curr) => {
    acc.push({ [curr]: coinsPrice30[curr] });
    return acc;
  }, []);

  // data shape: {key:arr,key:arr}
  const [data, setData] = useState(coinsPrice30);
  const dataKeys = Object.keys(data);

  const margin = { top: 20, right: 30, bottom: 40, left: 50 };
  const width = 800 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const generateLineChart = () => {
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current);

    // Parse date strings to Date objects
    const parseDate = d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ");

    const maxPrice = d3.max(
      Object.keys(data).map((coinName) =>
        d3.max(data[coinName], (d) => parseFloat(d.priceUsd))
      )
    );

    // Set up scales based on the maximum price value
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data[dataKeys[0]], (d) => parseDate(d.date)))
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, maxPrice]) // Use the maximum price value
      .nice()
      .range([height, 0]);

    // Define line generator
    const line = d3
      .line()
      .x((d) => xScale(parseDate(d.date)))
      .y((d) => yScale(parseFloat(d.priceUsd)));

    // Create the chart
    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add X and Y axes
    chart
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).ticks(10).tickFormat(d3.timeFormat("%d/%m")));

    chart
      .append("g")
      .attr("class", "y-axis")
      .call(
        d3
          .axisLeft(yScale)
          .ticks(6)
          .tickFormat((value) =>
            value >= 1000 ? (value / 1000).toFixed(1) + "k" : value
          )
      );

    // X label
    chart
      .append("text")
      .attr("x", width / 2) // Position it in the middle of the chart
      .attr("y", height + margin.top + 20) // Position it below the X-axis
      .attr("text-anchor", "middle") // Center the text horizontally
      .text("Date");

    // Y label
    chart
      .append("text")
      .attr("transform", "rotate(-90)") // Rotate the text vertically
      .attr("x", 0 - height / 2) // Position it in the middle of the Y-axis
      .attr("y", 0 - margin.left + 15) // Position it to the left of the Y-axis
      .attr("text-anchor", "middle") // Center the text horizontally
      .text("Price in USD");

    // Draw lines dynamically for each coin
    dataKeys.forEach((coinName, index) => {
      chart
        .append("path")
        .attr("class", "line")
        .attr("d", line(data[coinName]))
        .style("stroke", d3.schemeCategory10[index % 10]) // Use a color scheme for lines
        .style("fill", "none");
    });

    // Add legend
    const legend = chart
      .append("g")
      .attr("class", "legend")
      .attr("transform", `translate(${width - 80},${10})`);

    legend
      .selectAll("text")
      .data(dataKeys)
      .enter()
      .append("text")
      .attr("y", (d, i) => i * 20)
      .style("fill", (d, i) => d3.schemeCategory10[i % 10]) // Match line colors
      .text((d) => d);
  };

  useEffect(() => {
    generateLineChart();
  }, [data]);

  return (
    <div>
      <h3>Price of last 30 days</h3>
      <div>
        <button
          onClick={() => {
            setData(coinsPrice30);
          }}
          style={{ marginRight: "5px" }}
        >
          All
        </button>
        {coinsPrice30Keys.map((coin, index) => (
          <button
            key={index}
            onClick={() => {
              setData(coinsPriceArr[index]);
            }}
            style={{ marginRight: "5px" }}
          >
            {coin}
          </button>
        ))}
      </div>
      <svg
        ref={svgRef}
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
      >
        {/* Chart elements will be rendered here */}
      </svg>
    </div>
  );
};

export default TimeChart;
