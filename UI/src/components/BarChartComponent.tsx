// import { PureComponent } from 'react';
import {
  BarChart,
  Bar,
  // Cell,
  XAxis,
  // YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

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

  // const data = [
  //   {
  //     name: monthsToUse[5],
  //     difference: 2000,
  //     income: 9800,
  //     expensis: 2290,
  //   },
  //   {
  //     name: monthsToUse[4],
  //     difference: 3000,
  //     income: 1398,
  //     expensis: 2210,
  //   },
  //   {
  //     name: monthsToUse[3],
  //     difference: 4000,
  //     income: 4400,
  //     expensis: 2400,
  //   },
  //   {
  //     name: monthsToUse[2],
  //     difference: 2000,
  //     income: 9800,
  //     expensis: 2290,
  //   },
  //   {
  //     name: monthsToUse[1],
  //     difference: 3000,
  //     income: 1398,
  //     expensis: 2210,
  //   },
  //   {
  //     name: monthsToUse[0],
  //     difference: 2000,
  //     income: 4400,
  //     expensis: 2400,
  //   },
  // ];

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChart
        width={500}
        height={300}
        data={props.data}
        // data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        {/* <YAxis /> */}
        <Tooltip />
        <Legend />
        <Bar dataKey='income' stackId='a' fill='#82ca9d' />
        <Bar dataKey='expensis' stackId='a' fill='#ff0000' />
        <Bar dataKey='difference' fill='#E3B23C' />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
