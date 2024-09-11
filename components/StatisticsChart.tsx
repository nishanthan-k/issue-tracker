import { ChartDataProps } from '@/app/validationSchema';
import StatisticsCard from './StatisticsCard';

interface StatProps {
  stat: ChartDataProps[],
  totalIssues: number,
}

const StatisticsChart = (props: StatProps) => {
  const { stat,totalIssues } = props;

  return (
    <div className='w-full flex flex-col sm:flex-row justify-around gap-4'>
      {stat.map((data) => (
        data.title !== 'total' && (
          <div key={data.title} className='w-full sm:w-1/4'>
            <StatisticsCard data={data} total={totalIssues} />
          </div>
        )
      ))}
    </div>
  )
}

export default StatisticsChart;
