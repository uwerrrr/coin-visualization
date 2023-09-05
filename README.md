# Coin visualization

Coin visualization with React and D3. Data is gathered from CoinDesk API.

## Demo & Snippets

- You can access the deployed version [here](https://oscar-coin-d3charts.netlify.app)

---

## Requirements / Purpose

- MVP:

  - Use a free API coin price data
  - Display this data in a chart format of your choosing
  - Include a dropdown/select element to change the data of your chart.
  - Include a button or toggle to switch between different kinds of charts (eg line and bar chart)

- Purpose of project

  - Learning creating visualization frontend using D3 library

- Stack used
  - React with Javascript for front end
  - D3 for plotting charts
  - CoinDesk API for getting coin price data

---

## Approach

- CoinDesk API is chosen because it is a free and easy to use API.
- There are several visualization library but I want to practice myself with D3. Sample of D3 charts that I learn from is from this [gallery](https://d3-graph-gallery.com/index.html).

---

## Features

- The website has 3 main section

  - Section 1:

    - Top 10 coins that have highest current prices

    - Bar chart with options showing top 10; top 3; top 4-10 coins

  - Section 2:

    - Price of last 30 days of 3 coins: bitcoin, ethereum and tether.

    - Line chart with options showing all 3 coins or each individual coin.

    - ! The code is <u>scalable</u> because the only dependence of the chart is selectedCoins array which, for future development, user can directly select the coins

  - Section 3: (developing)
    - A histogram showing distribution of current price of all coins (developing).

---

## Known issues

- The styling is not done yet.

---

## Future Goals

- Section 3: A histogram showing distribution of current price of all coins.
- Set styling for website using SCSS.

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
  - Create buttons to plot selected range.

### 04/09/2023

- Complete Section 2 components
  - Getting data of based on selected coin array
  - Transform data into last 30 days
  - Create line chart for data
  - Create buttons to plot individual coins.

---

## What did you struggle with?

- D3 library complex and not easy to work with. It takes me a while to research and understand.
