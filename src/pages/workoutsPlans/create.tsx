import type { NextPage } from 'next';
import { CreateWorkoutsPlans as CreateWorkoutsPlansComponent } from 'pages-components/CreateWorkoutsPlans';
import { SelectedExercisesProvider } from 'pages-components/CreateWorkoutsPlans/contexts/selectedExercisesContext';
import { SelectedWorkoutsProvider } from 'pages-components/CreateWorkoutsPlans/contexts/selectedWorkoutsContext';

const CreateWorkoutsPlans: NextPage = () => {
  console.log('home page');

  return (
    <SelectedExercisesProvider>
      <SelectedWorkoutsProvider>
        <CreateWorkoutsPlansComponent />
      </SelectedWorkoutsProvider>
    </SelectedExercisesProvider>
  );
};

export default CreateWorkoutsPlans;
