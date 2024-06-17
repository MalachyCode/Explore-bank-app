import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { formatMoney } from '../functions/formatMoney';

interface IncomeExpenseData {
  name: string;
  difference: number;
  income: number;
  expensis: number;
}

interface IncomeExpenseType {
  data: Array<IncomeExpenseData>;
}

const BarChartComponent = (props: IncomeExpenseType) => {
  const date = new Date();
  let month = date.getMonth();
  const numberOfMonthsToShow = 6;

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const monthsToUse: Array<string> = [];
  for (let i = 0; i < numberOfMonthsToShow; i++) {
    if (month < 0) {
      month = months.length - 1;
    }
    monthsToUse.push(months[month]);
    month -= 1;
  }

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChart
        style={{
          overflow: 'hidden',
        }}
        data={props.data}
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        {/* <YAxis /> */}
        {/* <Tooltip /> */}
        <Tooltip
          label={'month'}
          labelFormatter={(month) => `Month: ${month}`}
          formatter={(money) => `NGN${formatMoney(+money, 0)}`}
        />
        <Legend />
        <Bar dataKey='income' stackId='a' fill='#82ca9d' />
        <Bar dataKey='expensis' stackId='a' fill='#ff0000' />
        <Bar dataKey='difference' fill='#E3B23C' />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
