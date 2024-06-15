import { RetirementPlannerType, SavingInfoType } from '../types';

const savingsCalculator = (
  currAge: number,
  timeForSavings: number,
  salary: number,
  salaryIncreaseRate: number,
  savingsRate: number,
  investReturn: number,
  type: string
  // desiredRetirementAmount: number
) => {
  let age = currAge;
  const yearsTillRetirement =
    type === 'Retirement' ? timeForSavings - currAge : timeForSavings;
  let newSalaryPerYear = salary;
  let savingsPerYear = newSalaryPerYear * (savingsRate / 100);
  let retirementSavingsPerYear =
    savingsPerYear + savingsPerYear * (investReturn / 100);

  const retirementPlannerArr: RetirementPlannerType = [
    {
      age: age,
      savings: retirementSavingsPerYear,
    },
  ];

  console.log(yearsTillRetirement);

  if (yearsTillRetirement) {
    for (let i = 0; i < yearsTillRetirement; i++) {
      const salaryIncrease = newSalaryPerYear * (salaryIncreaseRate / 100);
      newSalaryPerYear += salaryIncrease;
      savingsPerYear = newSalaryPerYear * (savingsRate / 100);

      const retirementSavingsIncrease = savingsPerYear * (investReturn / 100);
      retirementSavingsPerYear = savingsPerYear + retirementSavingsIncrease;
      age += 1;

      const newSavingsInfo: SavingInfoType = {
        age: age,
        savings: retirementSavingsPerYear,
      };

      retirementPlannerArr.push(newSavingsInfo);
    }
  }

  return retirementPlannerArr;
};

export default savingsCalculator;
