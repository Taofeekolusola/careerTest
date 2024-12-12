import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CandlestickChart from '../components/CandlestickChart';

const OrderBook = () => {
  const { symbol } = useParams(); // Extract symbol from the URL
  const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderBook = async () => {
      try {
        const response = await axios.get(
          `https://api.binance.com/api/v3/depth?symbol=${symbol}`
        );
        setOrderBook(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order book:', error);
        setLoading(false);
      }
    };

    fetchOrderBook();
  }, [symbol]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Order Book: {symbol}</h1>
      <div className="order-book">
        <div>
          <h3>Bids</h3>
          <table>
            <thead>
              <tr>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {orderBook.bids.slice(0, 10).map((bid, index) => (
                <tr key={index}>
                  <td>{parseFloat(bid[0]).toFixed(2)}</td>
                  <td>{parseFloat(bid[1]).toFixed(6)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h3>Asks</h3>
          <table>
            <thead>
              <tr>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {orderBook.asks.slice(0, 10).map((ask, index) => (
                <tr key={index}>
                  <td>{parseFloat(ask[0]).toFixed(2)}</td>
                  <td>{parseFloat(ask[1]).toFixed(6)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Place the CandlestickChart here */}
      <CandlestickChart interval="1h" />
    </div>
  );
};

export default OrderBook;
