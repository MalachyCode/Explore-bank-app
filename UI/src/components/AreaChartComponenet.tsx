// import { PureComponent } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { RetirementPlannerType } from '../types';
import { formatMoney } from '../functions/formatMoney';

interface AreaChartType {
  data: RetirementPlannerType;
}

const AreaChartComponent = (props: AreaChartType) => {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <AreaChart
        style={{
          overflow: 'hidden',
        }}
        data={props.data}
        margin={{
          top: 10,
          right: 10,
          left: 55,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='age' />
        <YAxis
          dataKey='savings'
          tickFormatter={(money) => 'NGN' + formatMoney(+money, 0)}
        />
        <Tooltip
          label={'savings'}
          labelFormatter={(age) => `Age: ${age}`}
          formatter={(money) => `NGN${formatMoney(+money, 0)}`}
        />
        <Area
          type='monotone'
          dataKey='savings'
          stroke='#8884d8'
          fill='#8884d8'
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
