import React, { useEffect, useState } from "react";
import { StockSymbols } from "../data/stock.js";
import { fetchStockQuote, fetchEarnings, fetchDividends } from "../data/utils/fetchstocks";

const StockListings = ({ selectedSector }) => {
  const [stockData, setStockData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllStocks() {
      const newStockData = {};
      setLoading(true);
      for (const stock of StockSymbols) {
        try {
          const quote = await fetchStockQuote(stock.symbol);
          const earnings = await fetchEarnings(stock.symbol);
          const dividends = await fetchDividends(stock.symbol);

          newStockData[stock.symbol] = {
            quote,
            earnings,
            dividends,
          };
        } catch (error) {
          console.error(`Error fetching ${stock.symbol}`, error);
        }
      }
      setStockData(newStockData);
      setLoading(false);
    }

    fetchAllStocks();
  }, []); // Only run on mount

  const filtered =
    selectedSector === "all"
      ? StockSymbols
      : StockSymbols.filter((stock) => stock.sector === selectedSector);

  return (
    <div className="bg-black w-full min-h-screen px-4 text-white">
      <h1 className="text-4xl font-extrabold text-center w-full py-6">
        Stock Dashboard
      </h1>

      {loading ? (
        <p className="text-center text-lg">Fetching stock data...</p>
      ) : (
        <div className="flex justify-center">
          {/* Custom 5x4 grid layout (4 rows, 5 stocks per row) */}
          <div className="grid grid-cols-5 gap-6">
            {filtered.map((stock) => {
              const stockInfo = stockData[stock.symbol];
              const data = stockInfo?.quote;
              const earnings = stockInfo?.earnings;
              const dividends = stockInfo?.dividends;

              return (
                <div
                  key={stock.symbol}
                  className="bg-white text-black rounded-lg shadow-xl p-5 text-xl"
                  style={{ transform: "scale(0.9)" }} // Reduce card size by 10%
                >
                  <h3 className="text-gray-800 font-semibold text-lg">
                    {stock.name} ({stock.symbol})
                  </h3>

                  {data && data.c ? (
                    <>
                      <p className="mt-4 text-lg">
                        Price: <span className="font-bold text-xl">${data.c.toFixed(2)}</span>
                      </p>
                      <p className={data.d >= 0 ? "text-green-600" : "text-red-600"}>
                        {data.d >= 0 ? "▲" : "▼"} {data.d.toFixed(2)} ({data.dp.toFixed(2)}%)
                      </p>
                    </>
                  ) : (
                    <p className="text-gray-500 mt-2">Data unavailable</p>
                  )}

                  {earnings && earnings.length > 0 && (
                    <p className="text-sm mt-2">
                      📅 Earnings: <span className="font-semibold">{earnings[0].period}</span>
                    </p>
                  )}

                  {dividends && dividends.length > 0 && (
                    <p className="text-sm mt-2">
                      💵 Dividend: <span className="font-semibold">${dividends[0].amount.toFixed(2)}</span>
                    </p>
                  )}

                  <p className="mt-4 bg-amber-500 px-4 py-2 inline-block rounded-full text-sm">
                    {stock.sector}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default StockListings;






