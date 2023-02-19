import { Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const data = [
  {
    name: "20代",
    男性: 4,
    女性: 2,
    amt: 2400
  },
  {
    name: "30代",
    男性: 3,
    女性: 1,
    amt: 2210
  },
  {
    name: "40代",
    男性: 2,
    女性: 4,
    amt: 2290
  },
  {
    name: "50代",
    男性: 6,
    女性: 4,
    amt: 2000
  },
  {
    name: "60代",
    男性: 4,
  女性: 1,
    amt: 2181
  },
];

export default function Customers() {
  return (
    <>
      <Typography> 年代別教師人数</Typography>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="男性" stackId="a" fill="#82ca9d" />
        <Bar dataKey="女性" stackId="a" fill="#8884d8" />
      </BarChart>
    </>
  );
}
