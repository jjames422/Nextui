// components/OverallBalanceCard.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardBody } from '@nextui-org/card';

interface BalanceData {
  totalBalance: number;
  fiatBalance: number;
}

const OverallBalanceCard: React.FC = () => {
  const [balance, setBalance] = useState<number>(0.0);
  const [fiatBalance, setFiatBalance] = useState<number>(0.0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get<BalanceData>('/api/user/overall-balance');
        setBalance(response.data.totalBalance || 0.0);
        setFiatBalance(response.data.fiatBalance || 0.0);
      } catch (error) {
        console.error('Error fetching overall balance:', error);
        setError('Failed to fetch balance');
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);

  const handleBuyAsset = async (assetType: string, amount: number) => {
    try {
      const response = await axios.post('/api/user/buy-asset', { assetType, amount });
      if (response.data.success) {
        alert('Asset bought successfully');
        setFiatBalance(fiatBalance - amount);
        setBalance(balance + amount);
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error('Error buying asset:', error);
      alert('Error buying asset');
    }
  };

  if (loading) {
    return <p>Loading balance...</p>;
  }

  return (
    <Card className="bg-gray-800 text-center mb-4">
      <CardHeader>
        <h2 className="text-white text-xl">Total Balance</h2>
      </CardHeader>
      <CardBody>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <p className="text-green-400 text-2xl font-bold">${balance.toFixed(2)}</p>
            <p className="text-white">Fiat Balance: ${fiatBalance.toFixed(2)}</p>
            <div className="mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => handleBuyAsset('BTC', 100)} // Example: buying $100 of BTC
              >
                Buy BTC with $100
              </button>
            </div>
            <div className="mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => handleBuyAsset('ETH', 100)} // Example: buying $100 of ETH
              >
                Buy ETH with $100
              </button>
            </div>
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default OverallBalanceCard;
