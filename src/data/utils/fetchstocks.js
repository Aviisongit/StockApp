// fetchstocks.js

const apiKey = 'cvreenpr01qp88cps9q0cvreenpr01qp88cps9qg';  // Your Finnhub API key

export async function fetchStockQuote(symbol) {
  const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch quote for ${symbol}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Error fetching quote for ${symbol}:`, error);
    throw error;
  }
}

export async function fetchEarnings(symbol) {
  const url = `https://finnhub.io/api/v1/stock/earnings?symbol=${symbol}&token=${apiKey}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Earnings error for ${symbol}`);
    return res.json();
  } catch (err) {
    console.error("Earnings fetch error:", err);
    return null;
  }
}

export async function fetchDividends(symbol) {
  const url = `https://finnhub.io/api/v1/stock/dividend?symbol=${symbol}&token=${apiKey}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Dividend error for ${symbol}`);
    return res.json();
  } catch (err) {
    console.error("Dividend fetch error:", err);
    return null;
  }
}

export async function fetchPercentChanges(symbol) {
  const url = `https://finnhub.io/api/v1/stock/candle`;
  const now = Math.floor(Date.now() / 1000);
  const ytdStart = new Date(new Date().getFullYear(), 0, 1).getTime() / 1000;

  const fetchCandle = async (from, to) => {
    const res = await fetch(`${url}?symbol=${symbol}&resolution=D&from=${from}&to=${to}&token=${apiKey}`);
    const json = await res.json();
    if (json.s !== "ok") throw new Error(`Bad candle response for ${symbol}`);
    return json;
  };

  const changes = {};

  try {
    const d1 = await fetchCandle(now - 2 * 86400, now);
    changes["1D"] = ((d1.c[d1.c.length - 1] - d1.c[0]) / d1.c[0]) * 100;

    const w1 = await fetchCandle(now - 8 * 86400, now);
    changes["1W"] = ((w1.c[w1.c.length - 1] - w1.c[0]) / w1.c[0]) * 100;

    const m1 = await fetchCandle(now - 32 * 86400, now);
    changes["1M"] = ((m1.c[m1.c.length - 1] - m1.c[0]) / m1.c[0]) * 100;

    const ytd = await fetchCandle(ytdStart, now);
    changes["YTD"] = ((ytd.c[ytd.c.length - 1] - ytd.c[0]) / ytd.c[0]) * 100;

    return changes;
  } catch (err) {
    console.error(`Failed to fetch % changes for ${symbol}:`, err);
    return null;
  }
}

export const StockSymbols = [
  { symbol: "AAPL", name: "Apple Inc.", sector: "Technology" },
  { symbol: "MSFT", name: "Microsoft Corp", sector: "Technology" },
  { symbol: "TSLA", name: "Tesla Inc", sector: "Automotive" },
  { symbol: "JNJ", name: "Johnson & Johnson", sector: "Healthcare" },
  { symbol: "JPM", name: "JPMorgan Chase", sector: "Finance" },
  { symbol: "AMZN", name: "Amazon.com Inc.", sector: "Consumer Discretionary" },
  { symbol: "GOOG", name: "Alphabet Inc.", sector: "Technology" },
  { symbol: "META", name: "Meta Platforms", sector: "Technology" },
  { symbol: "NVDA", name: "NVIDIA Corporation", sector: "Technology" },
  { symbol: "PYPL", name: "PayPal Holdings", sector: "Technology" },
  { symbol: "NFLX", name: "Netflix Inc.", sector: "Consumer Discretionary" }, 
  { symbol: "BABA", name: "Alibaba Group", sector: "Consumer Discretionary" }, 
  { symbol: "AMD", name: "Advanced Micro Devices", sector: "Technology" }, 
  { symbol: "DIS", name: "Walt Disney", sector: "Consumer Discretionary" }, 
  { symbol: "WMT", name: "Walmart", sector: "Consumer Staples" }, 
  { symbol: "PFE", name: "Pfizer Inc.", sector: "Healthcare" },
  { symbol: "MRK", name: "Merck & Co.", sector: "Healthcare" },
  { symbol: "F", name: "Ford Motor Company", sector: "Automotive" },
  { symbol: "GM", name: "General Motors", sector: "Automotive" },
  { symbol: "GS", name: "Goldman Sachs", sector: "Finance" }
];






