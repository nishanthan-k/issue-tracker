import React, { useCallback, useMemo } from 'react'
import StatisticsCard from './StatisticsCard';

interface ChartDataProps {
  title: string,
  issues: number,
}

const StatisticsChart = () => {
  const chartData: ChartDataProps[] = useMemo(() => (
    [
      { title: "Open", issues: 23 },
      { title: "In Progress", issues: 10 },
      { title: "On Review", issues: 5 },
      { title: "On Rework", issues: 43 },
      { title: "Closed", issues: 120 },
    ]
  ), []);
  
  const total = useMemo(() => {
    return chartData.reduce(
      (initialValue: number, currentData: ChartDataProps) => initialValue + currentData.issues,
      0
    );
  }, [chartData]);

  return (
    <div className='w-full flex flex-col sm:flex-row justify-around gap-4'>
      {chartData.map((data) => (
        <div key={data.title} className='w-full sm:w-1/4'>
          <StatisticsCard data={data} total={total} />
        </div>
      ))}
    </div>
  )
}

export default StatisticsChart;
