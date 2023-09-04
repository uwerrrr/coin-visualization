# Coin visualization

Coin visualization with React and D3. Data is gathered from CoinDesk API.

## Demo & Snippets

- You can access the deployed version here: [TBA]

---

## Requirements / Purpose

- MVP:

  - Use a free API coin price data
  - Display this data in a chart format of your choosing
  - Include a dropdown/select element to change the data of your chart.
  - Include a button or toggle to switch between different kinds of charts (eg line and bar chart)

- purpose of project
- stack used
  - React with Javascript for front end
  - D3 for plotting charts
  - CoinDesk API for getting data

---

## Approach

- CoinDesk API is chosen because it is a free and easy to use API.
- There are several visualization library but I want to practice myself with D3. Sample of D3 charts that I learn from is from this [gallery](https://d3-graph-gallery.com/index.html).

---

## Features

- The website has 2 main section
  - Section 1:
    - Top 10 coins that have highest current prices
    - Bar chart with options showing top 10; top 3; top 4-10 coins
  - Section 2:
    - Price of last 30 days of 3 coins: bitcoin, ethereum and tether.
    - Line chart with options showing all 3 coins or each individual coin (developing).
    - An option for user to toggle between line chart and histogram (developing).

---

## Known issues

- The styling is not done yet.

---

## Future Goals

- Set styling for website.

---

## Change logs

### 02/09/2023

- Research on good API to use.
- Set up project and services linking to the API

### 03/09/2023

- Complete Section 1 components
  - Getting data
  - Transform data into sorted top 10 coins
  - Create bar chart for data
  - Create buttons to plot selected data.

---

## What did you struggle with?

- D3 library complex and not easy to work with. It takes me a while to research and understand.
