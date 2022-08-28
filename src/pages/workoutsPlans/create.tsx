import type { NextPage } from 'next';
import { CreateWorkoutsPlans as CreateWorkoutsPlansComponent } from 'pages-components/CreateWorkoutsPlans';
import { SelectedWorkoutsProvider } from 'pages-components/CreateWorkoutsPlans/contexts/selectedWorkoutsContext';

const CreateWorkoutsPlans: NextPage = () => {
  console.log('home page');

  return (
    <SelectedWorkoutsProvider>
      <CreateWorkoutsPlansComponent />
    </SelectedWorkoutsProvider>
  );
};

export default CreateWorkoutsPlans;
