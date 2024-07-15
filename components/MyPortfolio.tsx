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
import Image from 'next/image';

interface Asset {
  type: string;
  balance: number;
}

const MyPortfolio: React.FC = () => {
  const [portfolio, setPortfolio] = useState<Asset[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await axios.get('/api/user/portfolio');
        setPortfolio(response.data.assets);
      } catch (error) {
        console.error('Error fetching user portfolio:', error);
        setError('Failed to fetch portfolio');
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  if (loading) {
    return <p>Loading portfolio...</p>;
  }

  if (error) {
    return (
      <div className="text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (portfolio.length === 0) {
    return (
      <div className="flex flex-col items-center text-center">
        <p>No assets in your portfolio yet!</p>
        <Image src="/Pig.png" alt="Cartoon Character" width={200} height={200} />
      </div>
    );
  }

  return (
    <Table aria-label="My Portfolio">
      <TableHeader>
        <TableColumn>Asset</TableColumn>
        <TableColumn>Balance</TableColumn>
      </TableHeader>
      <TableBody>
        {portfolio.map((asset, index) => (
          <TableRow key={index}>
            <TableCell>{asset.type}</TableCell>
            <TableCell>{asset.balance}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MyPortfolio;
