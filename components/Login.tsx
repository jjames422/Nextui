import React, { useState } from 'react';
import { Button, Input, Spacer, Text, Container, Card } from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.ok) {
      router.push('/dashboard');
    } else {
      console.error(result?.error);
    }
  };

  return (
    <Container>
      <Card css={{ p: '20px', mw: '400px' }}>
        <Text h3>Login</Text>
        <form onSubmit={handleSubmit}>
          <Input 
            clearable
            bordered
            fullWidth
            size="lg"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Spacer y={1} />
          <Input.Password 
            clearable
            bordered
            fullWidth
            size="lg"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Spacer y={1.5} />
          <Button shadow color="primary" type="submit">Login</Button>
        </form>
      </Card>
    </Container>
  );
};

export default Login;
