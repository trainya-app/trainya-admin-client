import type { NextPage } from 'next';
import { CreateWorkoutsPlans as CreateWorkoutsPlansComponent } from 'pages-components/CreateWorkoutsPlans';
import { SelectedExercisesProvider } from 'pages-components/CreateWorkoutsPlans/contexts/selectedExercisesContext';

const CreateWorkoutsPlans: NextPage = () => {
  console.log('home page');

  return (
    <SelectedExercisesProvider>
      <CreateWorkoutsPlansComponent />
    </SelectedExercisesProvider>
  );
};

export default CreateWorkoutsPlans;
