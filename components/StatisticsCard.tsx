import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';

interface ChartDataProps {
  data: {
    title: string,
    issues: number,
  },
  total: number,
}

const StatisticsCard = (props: ChartDataProps) => {
  const { total } = props;
  const { title, issues } = props.data;

  return (
     <Card className=''>
      <CardHeader>
        <CardTitle className='text-md uppercase'>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{issues}</p>
        <Progress value={(issues/total)*100} />
      </CardContent>
    </Card>
  )
}

export default StatisticsCard;
