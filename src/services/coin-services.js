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
