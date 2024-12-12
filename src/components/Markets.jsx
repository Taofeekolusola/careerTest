import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './MarketStyle.css'

const Markets = () => {
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 10,
            page: 1,
          },
        });
        setMarkets(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching market data:', error);
        setLoading(false);
      }
    };

    fetchMarketData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="market-table-container">
      <h1>Markets</h1>
      <table className="market-table">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Current Price (USD)</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {markets.map((market) => (
            <tr key={market.id}>
              <td>
                <Link to={`/markets/${market.id}`}>{market.symbol.toUpperCase()}</Link>
              </td>
              <td>${market.current_price.toLocaleString()}</td>
              <td>${market.market_cap.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Markets;