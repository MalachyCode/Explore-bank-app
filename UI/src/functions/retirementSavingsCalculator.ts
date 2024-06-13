import { RetirementPlannerType, SavingInfoType } from '../types';

const retirementSavingsCalculator = (
  currAge: number,
  retireAge: number,
  salary: number,
  salaryIncreaseRate: number,
  savingsRate: number,
  investReturn: number
  // desiredRetirementAmount: number
) => {
  let age = currAge;
  const yearsTillRetirement = retireAge - currAge;
  let newSalaryPerYear = salary;
  let savingsPerYear = newSalaryPerYear * (savingsRate / 100);
  let retirementSavingsPerYear =
    savingsPerYear + savingsPerYear * (investReturn / 100);

  const retirementPlannerArr: RetirementPlannerType = [
    {
      age: age,
      retirementSavings: retirementSavingsPerYear,
    },
  ];

  for (let i = 0; i < yearsTillRetirement; i++) {
    const salaryIncrease = newSalaryPerYear * (salaryIncreaseRate / 100);
    newSalaryPerYear += salaryIncrease;
    savingsPerYear = newSalaryPerYear * (savingsRate / 100);

    const retirementSavingsIncrease = savingsPerYear * (investReturn / 100);
    retirementSavingsPerYear = savingsPerYear + retirementSavingsIncrease;
    age += 1;

    const newSavingsInfo: SavingInfoType = {
      age: age,
      retirementSavings: retirementSavingsPerYear,
    };

    retirementPlannerArr.push(newSavingsInfo);
  }

  return retirementPlannerArr;
};

export default retirementSavingsCalculator;
