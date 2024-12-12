import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Wallet = () => {
  const [balance, setBalance] = useState({
    total: 0,
    currencies: { BTC: 0, ETH: 0, DOGE: 0 },
  });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        // Fetching cryptocurrency prices
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price',
          {
            params: {
              ids: 'bitcoin,ethereum,dogecoin',
              vs_currencies: 'usd',
            },
          }
        );

        const prices = response.data;

        // Simulated wallet balance in BTC, ETH, and DOGE
        const walletCurrencies = {
          BTC: 0.5, // Half a Bitcoin
          ETH: 1.2, // 1.2 Ether
          DOGE: 5000, // 5000 Dogecoins
        };

        const totalBalance =
          walletCurrencies.BTC * prices.bitcoin.usd +
          walletCurrencies.ETH * prices.ethereum.usd +
          walletCurrencies.DOGE * prices.dogecoin.usd;

        setBalance({
          total: totalBalance,
          currencies: walletCurrencies,
        });

        // Simulated transaction history
        setTransactions([
          {
            id: 'tx1',
            date: new Date(),
            type: 'Deposit',
            amount: walletCurrencies.BTC * prices.bitcoin.usd,
            status: 'Completed',
          },
          {
            id: 'tx2',
            date: new Date(),
            type: 'Withdraw',
            amount: walletCurrencies.ETH * prices.ethereum.usd,
            status: 'Pending',
          },
        ]);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchWalletData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="wallet-container">
      <h1>My Wallet</h1>

      {/* Account Summary */}
      <div className="wallet-summary">
        <h2>Account Balance</h2>
        <p>Total: ${balance.total.toLocaleString()}</p>
        {Object.entries(balance.currencies).map(([currency, amount]) => (
          <p key={currency}>
            {currency.toUpperCase()}: {amount} (${(amount * (balance.currencies[currency] || 0)).toLocaleString()})
          </p>
        ))}
      </div>

      {/* Transaction History */}
      <div className="wallet-transactions">
        <h2>Transaction History</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <td>{new Date(tx.date).toLocaleDateString()}</td>
                <td>{tx.type}</td>
                <td>${tx.amount.toLocaleString()}</td>
                <td>{tx.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Actions */}
      <div className="wallet-actions">
        <button onClick={() => alert('Deposit feature coming soon!')}>Deposit</button>
        <button onClick={() => alert('Withdraw feature coming soon!')}>Withdraw</button>
        <button onClick={() => alert('Transfer feature coming soon!')}>Transfer</button>
      </div>
    </div>
  );
};

export default Wallet;
