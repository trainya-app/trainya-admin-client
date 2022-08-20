import type { NextPage } from 'next';
import { CreateWorkoutsPlans as CreateWorkoutsPlansComponent } from 'pages-components/CreateWorkoutsPlans';

const CreateWorkoutsPlans: NextPage = () => {
  console.log('home page');

  return <CreateWorkoutsPlansComponent />;
};

export default CreateWorkoutsPlans;
