import { useSelectedWorkouts } from 'pages-components/CreateWorkoutsPlans/hooks/useSelectedWorkouts';
import { AiFillCloseCircle } from 'react-icons/ai';

export const SelectedWorkouts = () => {
  const { selectedWorkouts, selectedWorkoutsDispatch } = useSelectedWorkouts();

  function handleUnselectWorkout(id: number) {
    selectedWorkoutsDispatch({ type: 'REMOVE-WORKOUT', payload: { id } });
  }

  return (
    <section className="flex gap-8 mt-16">
      {selectedWorkouts.map((workout) => (
        <div
          key={`selected-workout-${workout.id}`}
          className="relative flex flex-col justify-center bg-white p-4 px-6 rounded-2xl border"
        >
          <button
            type="button"
            className="absolute right-2 bottom-0 text-blue-400"
            style={{ right: '-1rem', top: '-1rem' }}
            onClick={() => handleUnselectWorkout(workout.id)}
          >
            <AiFillCloseCircle style={{ fontSize: '2rem', color: '#575757' }} />
          </button>
          <p className="font-semibold text-center">{workout.title}</p>
          <span className="text-center">
            {workout.exercisesCount} exercícios
          </span>
        </div>
      ))}
    </section>
  );
};
