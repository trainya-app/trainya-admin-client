import { NextPage } from 'next';
import { CreateWorkout as CreateWorkoutComponent } from 'pages-components/CreateWorkout';
import { SelectedExercisesProvider } from 'pages-components/CreateWorkout/contexts/selectedExercisesContext';

const CreateWorkout: NextPage = () => {
  console.log('home page');

  return (
    <SelectedExercisesProvider>
      <CreateWorkoutComponent />
    </SelectedExercisesProvider>
  );
};

export default CreateWorkout;
