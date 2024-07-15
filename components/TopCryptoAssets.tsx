// components/TopCryptoAssets.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell
} from '@nextui-org/table';

interface CryptoData {
  id: string;
  market_cap_rank: number;
  image: string;
  name: string;
  current_price: number;
  market_cap: number;
}

const TopCryptoAssets: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 10,
            page: 1,
            sparkline: false,
          },
        });
        setCryptoData(response.data);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      }
    };

    fetchCryptoData();
  }, []);

  return (
    <Table aria-label="Top Crypto Assets">
      <TableHeader>
        <TableColumn>Rank</TableColumn>
        <TableColumn>Coin</TableColumn>
        <TableColumn>Price</TableColumn>
        <TableColumn>Market Cap</TableColumn>
      </TableHeader>
      <TableBody>
        {cryptoData.map((coin) => (
          <TableRow key={coin.id}>
            <TableCell>{coin.market_cap_rank}</TableCell>
            <TableCell>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={coin.image} alt={coin.name} width="20" height="20" style={{ marginRight: '8px' }} />
                {coin.name}
              </div>
            </TableCell>
            <TableCell>${coin.current_price.toLocaleString()}</TableCell>
            <TableCell>${coin.market_cap.toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TopCryptoAssets;
