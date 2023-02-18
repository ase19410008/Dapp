import Typography from "@mui/material/Typography";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const data = [
  {
    name: "1月",
    カウント: 12,
    amt: 2400
  },
  {
    name: "2月",
    カウント: 30,
    amt: 2210
  },
  {
    name: "3月",
    カウント: 20,
    amt: 2290
  },
  {
    name: "4月",
    カウント: 27,
    amt: 2000
  },
  {
    name: "5月",
    カウント: 18,
    amt: 2181
  },
  {
    name: "6月",
    カウント: 23,
    amt: 2500
  },
  {
    name: "7月",
    カウント: 34,
    amt: 2100
  }
];

export default function Reports() {
  return (
    <>
      <Typography>レビュー推移</Typography>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
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
        <Line type="monotone" dataKey="カウント" stroke="#82ca9d" />
      </LineChart>
    </>
  );
}
