import { useState } from 'react';
import api from '../api';
import { TextField, Button, Container } from '@mui/material';

export default function Login() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const handleSubmit = async () => {
    const res = await api.post('/token', { username: user, password: pass });
    localStorage.setItem('token', res.data.access_token);
    window.location.href = '/';
  };
  return (
    <Container>
      <h1>Login SOC</h1>
      <TextField label="Usuário" fullWidth onChange={e => setUser(e.target.value)} />
      <TextField label="Senha" type="password" fullWidth onChange={e => setPass(e.target.value)} />
      <Button variant="contained" onClick={handleSubmit}>Entrar</Button>
    </Container>
  );
}
