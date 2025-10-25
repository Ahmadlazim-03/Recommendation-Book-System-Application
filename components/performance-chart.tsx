"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface PerformanceChartProps {
  data: {
    user_based: { MAE: number; RMSE: number; Precision: number; Recall: number }
    item_based: { MAE: number; RMSE: number; Precision: number; Recall: number }
  }
}

export default function PerformanceChart({ data }: PerformanceChartProps) {
  const chartData = [
    {
      metric: "MAE",
      "User-Based": Number.parseFloat(data.user_based.MAE.toFixed(2)),
      "Item-Based": Number.parseFloat(data.item_based.MAE.toFixed(2)),
    },
    {
      metric: "RMSE",
      "User-Based": Number.parseFloat(data.user_based.RMSE.toFixed(2)),
      "Item-Based": Number.parseFloat(data.item_based.RMSE.toFixed(2)),
    },
    {
      metric: "Precision",
      "User-Based": Number.parseFloat((data.user_based.Precision * 100).toFixed(0)),
      "Item-Based": Number.parseFloat((data.item_based.Precision * 100).toFixed(0)),
    },
    {
      metric: "Recall",
      "User-Based": Number.parseFloat((data.user_based.Recall * 100).toFixed(0)),
      "Item-Based": Number.parseFloat((data.item_based.Recall * 100).toFixed(0)),
    },
  ]

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis dataKey="metric" stroke="var(--color-muted-foreground)" />
          <YAxis stroke="var(--color-muted-foreground)" />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-card)",
              border: "1px solid var(--color-border)",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "var(--color-foreground)" }}
          />
          <Legend />
          <Bar dataKey="User-Based" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
          <Bar dataKey="Item-Based" fill="var(--color-accent)" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
