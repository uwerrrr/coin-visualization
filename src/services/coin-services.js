export const getAllCoins = async () => {
  const response = await fetch("https://api.coincap.io/v2/assets", {
    headers: {
      Accept: "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch all coins");
  }
  const data = await response.json();
  return data.data;
};

export const getCoinPrices = async (coin) => {
  const response = await fetch(
    `https://api.coincap.io/v2/assets/${coin}/history?interval=d1`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  if (!response.ok) {
    // console.log(response);
    throw new Error(`Failed to fetch history price for coin ${coin}`);
  }
  const data = await response.json();
  return data.data;
};
