"use client"
import { Label, Pie, PieChart } from "recharts"

import { IssueStatProps } from "@/app/validationSchema"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A donut chart with status"


export function StatusChart(props: IssueStatProps) {
  const { stat, totalIssues } = props;
  const totalVisitors = totalIssues;

  const chartColor = ["var(--color-open)",
    "var(--color-in_progress)",
    "var(--color-on_review)",
    "var(--color-on_rework)",
    "var(--color-closed)"];

  const chartData = stat.map((data, i) => {
    return {
      browser: data.title.replace(' ', '_').toLowerCase(),
      issues: data.issues,
      fill: chartColor[i]
    }
  })

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
