import type { NextPage } from 'next';
import { WorkoutsPlans as WorkoutsPlansComponent } from 'pages-components/WorkoutsPlans';

const WorkoutsPlans: NextPage = () => {
  console.log('home page');

  return <WorkoutsPlansComponent />;
};

export default WorkoutsPlans;
