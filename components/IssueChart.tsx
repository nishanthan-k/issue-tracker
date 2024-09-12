"use client";
import { IssueStatProps } from '@/app/validationSchema';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,
} from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

function IssueChart(props: IssueStatProps) {
  const [timeRange, setTimeRange] = useState("7");
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const fetchStat = async () => {
      let currDate = new Date();
      currDate.setDate(currDate.getDate() - parseInt(timeRange));
      currDate.setHours(0, 0, 0, 0);
      let min = currDate.toISOString();
      let max = new Date().toISOString();

      try {
        const response = await axios.post('/api/issues/stat/range', { min, max });
        const fetchedData = response.data;

        setChartData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStat();
  }, [timeRange]);

  const chartConfig = {
    OPEN: {
      label: "Open",
      color: "hsl(var(--chart-1))",
    },
    IN_PROGRESS: {
      label: "In Progress",
      color: "hsl(var(--chart-2))",
    },
    ON_REVIEW: {
      label: "On Review",
      color: "hsl(var(--chart-3))",
    },
    ON_REWORK: {
      label: "On Rework",
      color: "hsl(var(--chart-4))",
    },
    CLOSED: {
      label: "Closed",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig

  console.log(chartData)

  return (
    <Card>
      <CardHeader>
      <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="7" className="rounded-lg">
              Last 7 days
            </SelectItem>
            <SelectItem value="30" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="90" className="rounded-lg">
              Last 90 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 10)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              type="monotone"
              dataKey="OPEN"
              stroke={chartConfig.OPEN.color}
              fill={chartConfig.OPEN.color}
              fillOpacity={0.4}
              stackId="a"
            />
            <Area
              type="monotone"
              dataKey="IN_PROGRESS"
              stroke={chartConfig.IN_PROGRESS.color}
              fill={chartConfig.IN_PROGRESS.color}
              fillOpacity={0.4}
              stackId="a"
            />
            <Area
              type="monotone"
              dataKey="ON_REVIEW"
              stroke={chartConfig.ON_REVIEW.color}
              fill={chartConfig.ON_REVIEW.color}
              fillOpacity={0.4}
              stackId="a"
            />
            <Area
              type="monotone"
              dataKey="ON_REWORK"
              stroke={chartConfig.ON_REWORK.color}
              fill={chartConfig.ON_REWORK.color}
              fillOpacity={0.4}
              stackId="a"
            />
            <Area
              type="monotone"
              dataKey="CLOSED"
              stroke={chartConfig.CLOSED.color}
              fill={chartConfig.CLOSED.color}
              fillOpacity={0.4}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default IssueChart;
