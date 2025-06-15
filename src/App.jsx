import React, { useState } from 'react';
import './App.css';

const rates = {
  BRL: { USD: 0.20, EUR: 0.18, GBP: 0.16, JPY: 31.50, ARS: 45.00, BRL: 1 },
  USD: { BRL: 5.10, EUR: 0.90, GBP: 0.78, JPY: 157.50, ARS: 230.00, USD: 1 },
  EUR: { BRL: 5.65, USD: 1.11, GBP: 0.86, JPY: 174.80, ARS: 255.00, EUR: 1 },
  GBP: { BRL: 6.55, USD: 1.28, EUR: 1.16, JPY: 203.20, ARS: 300.00, GBP: 1 },
  JPY: { BRL: 0.032, USD: 0.0064, EUR: 0.0057, GBP: 0.0049, ARS: 1.48, JPY: 1 },
  ARS: { BRL: 0.022, USD: 0.0043, EUR: 0.0039, GBP: 0.0033, JPY: 0.68, ARS: 1 },
};

function App() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('BRL');
  const [toCurrency, setToCurrency] = useState('USD');
  const [result, setResult] = useState(null);

  const convert = () => {
    if (!amount || isNaN(amount)) {
      alert('Digite um valor numérico válido');
      return;
    }
    const rate = rates[fromCurrency][toCurrency];
    const converted = parseFloat(amount) * rate;
    setResult(converted.toFixed(2));
  };

  const clearResult = () => setResult(null);

  return (
    <div className="container">
      <h1>Conversor de Moedas</h1>

      <input
        type="text"
        placeholder="Valor"
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value);
          clearResult();
        }}
        data-testid="input-amount"
      />

      <select
        value={fromCurrency}
        onChange={(e) => {
          setFromCurrency(e.target.value);
          clearResult();
        }}
        data-testid="select-from"
      >
        <option value="BRL">Real (BRL)</option>
        <option value="USD">Dólar (USD)</option>
        <option value="EUR">Euro (EUR)</option>
        <option value="GBP">Libra (GBP)</option>
        <option value="JPY">Iene (JPY)</option>
        <option value="ARS">Peso Argentino (ARS)</option>
      </select>

      <select
        value={toCurrency}
        onChange={(e) => {
          setToCurrency(e.target.value);
          clearResult();
        }}
        data-testid="select-to"
      >
        <option value="BRL">Real (BRL)</option>
        <option value="USD">Dólar (USD)</option>
        <option value="EUR">Euro (EUR)</option>
        <option value="GBP">Libra (GBP)</option>
        <option value="JPY">Iene (JPY)</option>
        <option value="ARS">Peso Argentino (ARS)</option>
      </select>

      <button onClick={convert} data-testid="btn-convert">
        Converter
      </button>

      {result !== null && (
        <p data-testid="result">
          {amount} {fromCurrency} = {result} {toCurrency}
        </p>
      )}
    </div>
  );
}

export default App;
