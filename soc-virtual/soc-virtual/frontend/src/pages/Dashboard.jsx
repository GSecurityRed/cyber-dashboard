import { useEffect, useState } from 'react';
import api from '../api';
import Card from '../components/Card';
import List from '../components/List';
import Chart from '../components/Chart';
import AuditLog from '../components/AuditLog';
import { Button, Container, Grid, TextField } from '@mui/material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [surface, setSurface] = useState({});
  const fetchData = async () => {
    const ev = await api.get('/events'); setEvents(ev.data);
    const ts = await api.get('/tenable/surface'); setSurface(ts.data);
  };
  useEffect(() => { fetchData(); }, []);
  const exportPDF = async () => {
    const canvas = await html2canvas(document.body);
    const img = canvas.toDataURL('image/png');
    const pdf = new jsPDF(); pdf.addImage(img, 'PNG', 0, 0);
    pdf.save('dashboard.pdf');
  };
  return (
    <Container>
      <h1>Dashboard SOC</h1>
      <Grid container spacing={2}>
        <Grid item><Card title="Ativos" value={surface.assets} /></Grid>
        <Grid item><Card title="Score Médio" value={surface.avg_score} /></Grid>
        <Grid item><Card title="Alertas Críticos" value={events.filter(e=>e.severity==='critical').length} /></Grid>
      </Grid>
      <Button onClick={exportPDF}>Exportar PDF</Button>
      <List data={events} />
      <Chart data={events} />
      <AuditLog />
    </Container>
  );
}
