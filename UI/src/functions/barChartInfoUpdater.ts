import incomeExpenseService from '../services/incomeExpense';
import { BarChartInfo, NewBarDataBody } from '../types';

const barChartInfoUpdater = (
  userBarChartInfo: BarChartInfo,
  transactionType: string,
  amount: number
) => {
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
  console.log(monthName);

  const resorceToUpdate = userBarChartInfo.barData.find(
    (info) => info.name === monthName
  );

  console.log(userBarChartInfo);

  if (resorceToUpdate) {
    if (transactionType === 'debit') {
      const newExpenses = resorceToUpdate.expensis + amount;

      userBarChartInfo.barData.map((data) => {
        if (data.name === monthName) {
          data.expensis = newExpenses;
          data.difference = resorceToUpdate.income - newExpenses;
        }
      });

      console.log(userBarChartInfo);

      incomeExpenseService
        .updateBarChartInfo(userBarChartInfo.id, userBarChartInfo)
        .then((returnedUserBarChartInfo) =>
          console.log(returnedUserBarChartInfo)
        );
    } else {
      const newIncome = resorceToUpdate.income + amount;

      userBarChartInfo.barData.map((data) => {
        if (data.name === monthName) {
          data.income = newIncome;
          data.difference = newIncome - resorceToUpdate.expensis;
        }
      });

      console.log(userBarChartInfo);

      incomeExpenseService
        .updateBarChartInfo(userBarChartInfo.id, userBarChartInfo)
        .then((returnedUserBarChartInfo) =>
          console.log(returnedUserBarChartInfo)
        );

      // console.log(updatedInfo);
    }
  } else {
    const incomeValue = transactionType === 'credit' ? amount : 0;
    const expensesValue = transactionType === 'debit' ? amount : 0;

    const newBarDataResource: NewBarDataBody = {
      name: monthName,
      income: incomeValue,
      expensis: expensesValue,
      difference: incomeValue - expensesValue,
    };

    userBarChartInfo.barData.push(newBarDataResource);

    if (userBarChartInfo.barData.length > 6) {
      userBarChartInfo.barData.shift();
    }

    console.log(userBarChartInfo.barData);

    incomeExpenseService
      .updateBarChartInfo(userBarChartInfo.id, userBarChartInfo)
      .then((returnedUserBarChartInfo) =>
        console.log(returnedUserBarChartInfo)
      );
  }
};

export default barChartInfoUpdater;
