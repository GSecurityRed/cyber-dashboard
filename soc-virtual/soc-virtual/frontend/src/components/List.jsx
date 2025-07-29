import { Table, TableHead, TableRow, TableCell, TableBody, TextField } from '@mui/material';
import { useState } from 'react';
export default function List({ data }) {
  const [filter, setFilter] = useState('');
  const filtered = data.filter(item => item.message.includes(filter));
  return (
    <>
      <TextField label="Buscar" onChange={e=>setFilter(e.target.value)} />
      <Table>
        <TableHead><TableRow><TableCell>Fonte</TableCell><TableCell>Sev</TableCell><TableCell>Mensagem</TableCell></TableRow></TableHead>
        <TableBody>{filtered.map((e,i)=>(
          <TableRow key={i}><TableCell>{e.source}</TableCell><TableCell>{e.severity}</TableCell><TableCell>{e.message}</TableCell></TableRow>
        ))}</TableBody>
      </Table>
    </>
  );
}
