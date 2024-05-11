import incomeExpenseService from '../services/incomeExpense';
import { NewBarChartInfo } from '../types';

const createBarChartInfo = (id: string) => {
  const date = new Date();
  const month = date.getMonth();

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
  const monthName = months[month];

  const newBarChartInfo: NewBarChartInfo = {
    owner: id,
    barData: [
      {
        name: monthName,
        income: 0,
        expensis: 0,
        difference: 0,
      },
    ],
  };

  incomeExpenseService
    .create(newBarChartInfo)
    .then((createdBarChartInfo) => console.log(createdBarChartInfo));
};

export default createBarChartInfo;
