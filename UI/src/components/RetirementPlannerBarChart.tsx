import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  // Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { RetirementBarChartType } from '../types';
import { formatMoney } from '../functions/formatMoney';

interface BarChartType {
  data: RetirementBarChartType;
}

const RetirementBarChart = (props: BarChartType) => {
  // const data = [
  //   {
  //     endAmt: 4000,
  //     retireAmt: 2400,
  //   },
  // ];

  const data = props.data.map((dataSet) => dataSet);
  const barData = data.pop();
  let endAmtFill;

  if (barData) {
    if (barData.endAmt && barData.retireAmt) {
      barData.endAmt >= barData.retireAmt
        ? (endAmtFill = '#82ca9d')
        : (endAmtFill = '#860202');
    }
  }

  console.log(barData?.retireAmt);

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChart
        data={props.data}
        style={{
          overflow: 'hidden',
        }}
        margin={{
          top: 15,
          right: 10,
          left: 55,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis tick={false} />
        <YAxis tickFormatter={(money) => 'NGN' + formatMoney(+money, 0)} />
        {/* <Tooltip
          label={'retireAmt'}
          formatter={(money) => `NGN${formatMoney(+money, 0)}`}
        /> */}
        <Legend />
        <Bar dataKey='retireAmt' fill='#8884d8' background={{ fill: '#eee' }} />
        <Bar
          dataKey='endAmt'
          // fill='#82ca9d'
          fill={endAmtFill}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RetirementBarChart;
