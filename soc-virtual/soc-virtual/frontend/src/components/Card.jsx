import { Card as MCard, CardContent, Typography } from '@mui/material';
export default function Card({ title, value }) {
  return (
    <MCard>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4">{value}</Typography>
      </CardContent>
    </MCard>
  );
}
