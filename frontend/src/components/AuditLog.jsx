import { useEffect, useState } from 'react';
import api from '../api';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
export default function AuditLog() {
  const [logs, setLogs] = useState([]);
  useEffect(()=>{ api.get('/audit').then(res=>setLogs(res.data)); }, []);
  return (
    <Table>
      <TableHead><TableRow><TableCell>Usuário</TableCell><TableCell>Ação</TableCell><TableCell>Quando</TableCell></TableRow></TableHead>
      <TableBody>{logs.map((l,i)=>(
        <TableRow key={i}><TableCell>{l.user_id}</TableCell><TableCell>{l.action}</TableCell><TableCell>{l.timestamp}</TableCell></TableRow>
      ))}</TableBody>
    </Table>
  );
}
