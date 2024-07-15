'use client';

import React, { useState } from 'react';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/register', { email, password, name });
      if (response.data.success) {
        alert('Registration successful!');
        router.push('/login');
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleRegister} className="w-full max-w-sm space-y-4">
        <Input
          fullWidth
          label="Name"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          fullWidth
          label="Email"
          placeholder="Your email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          fullWidth
          label="Password"
          placeholder="Your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        <Button fullWidth type="submit">Register</Button>
      </form>
    </div>
  );
};

export default RegisterPage;
