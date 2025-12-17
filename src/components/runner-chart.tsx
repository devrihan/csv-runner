"use client";

import { RunData } from "@/types";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface RunnerChartProps {
  data: RunData[];
  filterPerson?: string;
}

export function RunnerChart({ data, filterPerson }: RunnerChartProps) {
  const chartData = filterPerson
    ? data.filter((d) => d.person === filterPerson)
    : data;

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>
          {filterPerson ? `${filterPerson}'s Performance` : "Recent Activity"}
        </CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <XAxis
              dataKey="date"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value} mi`}
            />
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
            <Legend />
            <Bar
              dataKey="miles"
              fill="#0f172a"
              radius={[4, 4, 0, 0]}
              name="Miles Run"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
