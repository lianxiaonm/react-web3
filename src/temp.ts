//

const needSavings = (year: number, bill = 10000, salary = 3000, work = 20) => {
  let savings = 0;
  const billYear = 12 * bill;
  while (--year >= 0) {
    savings = savings / 1.025;
    const currBill = billYear * Math.pow(1.06, year);
    const currSalary =
      year <= work ? salary * 8 * 1.02 ** year : salary * 12 * 1.01 ** work;
    savings += Math.ceil(currBill - currSalary);
  }
  return Math.ceil(savings);
};
