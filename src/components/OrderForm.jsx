import React, { useState } from 'react';

const OrderForm = () => {
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);

  const handleChange = () => setTotal(price * amount);

  return (
    <form className="order-form">
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={e => setPrice(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(Number(e.target.value))}
      />
      <input type="number" placeholder="Total" value={total} readOnly />
      <button type="submit">Place Order</button>
    </form>
  );
};

export default OrderForm;