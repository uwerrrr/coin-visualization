import React, { useEffect, useState } from "react";
import { getAllCoins } from "../services/coin-services";
import AllCoinChart from "../components/AllCoinChart/AllCoinChart";

const MainPage = () => {
  const [allCoins, setAllCoins] = useState();
  const [requestAllCoins, setRequestAllCoins] = useState(0);

  useEffect(() => {
    getAllCoins()
      .then((coins) => {
        setAllCoins(coins);
      })
      .catch((err) => console.error(err));
  }, [requestAllCoins]);

  console.log(allCoins);

  return <div>{allCoins && <AllCoinChart coins={allCoins} />}</div>;
};

export default MainPage;
