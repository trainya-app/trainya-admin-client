import type { NextPage } from 'next';
import { Employees as EmployeesComponent } from 'pages-components/Employees';

const Employees: NextPage = () => {
  console.log('home page');

  return <EmployeesComponent />;
};

export default Employees;
