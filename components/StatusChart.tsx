"use client"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useMemo, useState } from "react"

export const description = "A donut chart with status"

const chartData = [
  { browser: "open", issues: 275, fill: "var(--color-open)" },
  { browser: "in_progress", issues: 200, fill: "var(--color-in_progress)" },
  { browser: "on_review", issues: 287, fill: "var(--color-on_review)" },
  { browser: "on_rework", issues: 173, fill: "var(--color-on_rework)" },
  { browser: "closed", issues: 190, fill: "var(--color-closed)" },
]

const chartConfig = {
  issues: {
    label: "Issues",
  },
  open: {
    label: "Open",
    color: "hsl(var(--chart-1))",
  },
  in_progress: {
    label: "In Progress",
    color: "hsl(var(--chart-2))",
  },
  on_review: {
    label: "On Review",
    color: "hsl(var(--chart-3))",
  },
  on_rework: {
    label: "On Rework",
    color: "hsl(var(--chart-4))",
  },
  closed: {
    label: "Closed",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function StatusChart() {
  const totalVisitors = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.issues, 0)
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Status Report</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="issues"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Issues
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total issues for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  )
}
