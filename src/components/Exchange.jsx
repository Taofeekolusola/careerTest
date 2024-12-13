import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Exchange = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 5,
              page: 1,
            },
          }
        );
        setCryptoData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Cryptocurrency Exchange</h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Coin</th>
            <th>Price (USD)</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {cryptoData.map((coin) => (
            <tr key={coin.id}>
              <td>
                <img src={coin.image} alt={coin.name} style={styles.image} />
                {coin.name}
              </td>
              <td>${coin.current_price.toLocaleString()}</td>
              <td>${coin.market_cap.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  image: {
    width: '20px',
    height: '20px',
    marginRight: '10px',
  },
  th: {
    borderBottom: '1px solid #ccc',
    padding: '10px',
    textAlign: 'left',
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #ccc',
  },
};

export default Exchange;