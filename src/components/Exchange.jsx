import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Exchange.css';
import CandlestickChart from './CandlestickChart'; // Reuse your existing chart component

const Exchange = () => {
  const [tradingPair, setTradingPair] = useState('bitcoin');
  const [orderBook, setOrderBook] = useState({ buy: [], sell: [] });
  const [recentTrades, setRecentTrades] = useState([]);
  const [userBalance, setUserBalance] = useState({ base: 0, quote: 0 });
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [orderType, setOrderType] = useState('buy');

  useEffect(() => {
    const fetchExchangeData = async () => {
      try {
        // Fetch order book
        const orderBookResponse = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${tradingPair}/market_chart`,
          { params: { vs_currency: 'usd', days: 1 } }
        );
        // Fetch recent trades (mock or another API for real trades)
        const tradesResponse = []; // Replace with API endpoint for trades
        setOrderBook({
          buy: orderBookResponse.data.buy || [],
          sell: orderBookResponse.data.sell || [],
        });
        setRecentTrades(tradesResponse);
        // Mock user balance
        setUserBalance({ base: 1.234, quote: 1000 });
      } catch (error) {
        console.error('Error fetching exchange data:', error);
      }
    };

    fetchExchangeData();
  }, [tradingPair]);

  // Handle trade execution
  const handleTradeExecution = (e) => {
    e.preventDefault();
    // Implement trade logic here
    console.log(`Executing ${orderType} order for ${amount} at price ${price}`);
  };

  return (
    <div className="exchange-container">
      <h1>Exchange</h1>
      <div className="trading-pair-selector">
        <select onChange={(e) => setTradingPair(e.target.value)}>
          <option value="bitcoin">BTC/USD</option>
          <option value="ethereum">ETH/USD</option>
          <option value="bnb">BNB/USD</option>
          <option value="xrp">XRP/USD</option>
          <option value="solana">SOL/USD</option>
          {/* Add more pairs */}
        </select>
      </div>

      <CandlestickChart interval="hourly" />

      {/* Order Book Section */}
      <div className="order-book">
        <h2>Order Book</h2>
        <div>
          <h3>Buy Orders</h3>
          <ul>
            {orderBook.buy.length > 0 ? (
              orderBook.buy.map((order, index) => (
                <li key={index}>
                  Price: {order.price} | Amount: {order.amount}
                </li>
              ))
            ) : (
              <li>No buy orders available</li>
            )}
          </ul>
        </div>
        <div>
          <h3>Sell Orders</h3>
          <ul>
            {orderBook.sell.length > 0 ? (
              orderBook.sell.map((order, index) => (
                <li key={index}>
                  Price: {order.price} | Amount: {order.amount}
                </li>
              ))
            ) : (
              <li>No sell orders available</li>
            )}
          </ul>
        </div>
      </div>

      {/* Recent Trades Section */}
      <div className="recent-trades">
        <h2>Recent Trades</h2>
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Price</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {recentTrades.length > 0 ? (
              recentTrades.map((trade, index) => (
                <tr key={index}>
                  <td>{new Date(trade.timestamp).toLocaleString()}</td>
                  <td>{trade.price}</td>
                  <td>{trade.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No recent trades</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Trade Execution Section */}
      <div className="trade-execution">
        <h2>Execute Trade</h2>
        <form onSubmit={handleTradeExecution}>
          <div>
            <label>Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              required
            />
          </div>
          <div>
            <label>Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              required
            />
          </div>
          <div>
            <label>Order Type</label>
            <select onChange={(e) => setOrderType(e.target.value)} value={orderType}>
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
          </div>
          <button type="submit">{orderType.charAt(0).toUpperCase() + orderType.slice(1)}</button>
        </form>
      </div>

      {/* User Balance Display */}
      <div className="user-balance">
        <h3>Your Balance</h3>
        <p>
          {tradingPair.toUpperCase() === 'bitcoin' ? 'BTC' : 'ETH'} Balance: {userBalance.base} <br />
          USD Balance: ${userBalance.quote}
        </p>
      </div>
    </div>
  );
};

export default Exchange;