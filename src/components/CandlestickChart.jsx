import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const CandlestickChart = ({ interval = 'daily' }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchCoinGeckoData = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart',
          {
            params: {
              vs_currency: 'usd',
              days: interval === 'daily' ? 1 : 7, // Adjust for daily or weekly data
            },
          }
        );

        const prices = response.data.prices.map(([timestamp, price]) => ({
          x: new Date(timestamp),
          y: price,
        }));

        setChartData({
          labels: prices.map((point) => point.x),
          datasets: [
            {
              label: 'BTC/USD Price',
              data: prices.map((point) => point.y),
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              pointRadius: 0,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data from CoinGecko:', error);
      }
    };

    fetchCoinGeckoData();
  }, [interval]);

  if (!chartData) return <div>Loading chart...</div>;

  return (
    <div>
      <h2>BTC/USD Chart</h2>
      <Line
        data={chartData}
        options={{
          responsive: true,
          scales: {
            x: {
              type: 'time',
              time: {
                unit: interval === 'daily' ? 'hour' : 'day',
              },
              title: {
                display: true,
                text: 'Time',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Price (USD)',
              },
            },
          },
        }}
      />
    </div>
  );
};

export default CandlestickChart;