import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
export default function Chart({ data }) {
  return (
    <BarChart width={600} height={300} data={data}>
      <XAxis dataKey="source" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="severity" />
    </BarChart>
  );
}
