import { ChartDataProps, IssueStatProps } from '@/app/validationSchema';
import StatisticsCard from './StatisticsCard';

const StatisticsChart = (props: IssueStatProps) => {
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
