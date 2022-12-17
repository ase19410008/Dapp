import * as React from 'react';
import Title from './Title';

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";

const data = [
  {
    subject: "数学",
    A: 120,
    B: 110,
    fullMark: 150
  },
  {
    subject: "国語",
    A: 98,
    B: 130,
    fullMark: 150
  },
  {
    subject: "英語",
    A: 86,
    B: 130,
    fullMark: 150
  },
  {
    subject: "物理",
    A: 85,
    B: 90,
    fullMark: 150
  },
  {
    subject: "歴史",
    A: 65,
    B: 85,
    fullMark: 150
  }
];

export default function Orders() {
  return (
    <React.Fragment>
      <Title>成績</Title>
      <RadarChart
      cx={300}
      cy={250}
      outerRadius={150}
      width={500}
      height={500}
      data={data}
    >
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis />
      <Radar
        name="Mike"
        dataKey="A"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.6}
      />
    </RadarChart>
    </React.Fragment>
  );
}