import { BackButton } from 'components/BackButton';
import { Button } from 'components/Button';
import { MainContent } from 'layouts/MainContent';
import { useRouter } from 'next/router';
import WorkoutExercisesService from 'services/WorkoutExercisesService';
import WorkoutService from 'services/WorkoutService';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'utils/toast';
import { IExercise } from 'types/IExercise';
import ExercisesService from 'services/ExercisesService';
import { CreateExerciseModal } from './components/CreateExerciseModal';
import { SelectedExercises } from './components/SelectedExercises';
import { SuggestionsExercises } from './components/SuggestionsExercises';
import { useSelectedExercises } from './hooks/useSelectedExercises';

export const CreateWorkout = () => {
  const [isCreateExerciseModalOpen, setIsCreateExerciseModalOpen] =
    useState(false);
  const [suggestionExercises, setSuggestionExercises] = useState<IExercise[]>(
    [] as IExercise[]
  );

  const workoutTitle = useRef<string>('');
  const workoutDuration = useRef<string>('');
  const workoutTitleRef = useRef<HTMLInputElement>(null);
  const workoutDurationRef = useRef<HTMLInputElement>(null);

  const { selectedExercises, selectedExercisesDispatch } =
    useSelectedExercises();

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const allExercises = await ExercisesService.getAll();
      setSuggestionExercises(allExercises);
    })();
  }, []);

  function handleGoBack() {
    router.back();
  }

  async function handleSaveWorkout() {
    try {
      // TODO: grab the employeeId
      const employeeId = 1;

      const workout = {
        employeeId,
        title: workoutTitle?.current,
        duration: workoutDuration.current,
      };

      // TODO: do the api call to create workout and grab the id from database
      const workoutStored = await WorkoutService.store({
        title: workout.title,
        duration: workout.duration,
        employeeId: workout.employeeId,
      });

      // TODO: save exercixes
      await Promise.all(
        selectedExercises.map((exercise) =>
          WorkoutExercisesService.store({
            exerciseId: exercise.id,
            sets: exercise.sets,
            repetitions: exercise.repetitions,
            workoutId: workoutStored.workout.id,
          })
        )
      );

      resetWorkoutFields();

      toast({ status: 'success', text: 'Treino criado!', duration: 2000 });
    } catch (err: any) {
      toast({ status: 'error', text: err?.response?.data?.message });
    }
  }

  function resetWorkoutFields() {
    selectedExercisesDispatch({ type: 'PLACE-EXERCISES', payload: [] });

    if (workoutTitleRef.current && workoutDurationRef.current) {
      workoutTitleRef.current.value = '';
      workoutDurationRef.current.value = '';
    }
  }

  return (
    <>
      <MainContent>
        <header className="flex items-center gap-4">
          <BackButton onClick={handleGoBack} />
          <h2 className="text-4xl font-bold text-blue-800">
            Criar treino na plataforma
          </h2>
        </header>

        <div className="flex flex-col w-100 gap-2 mt-6">
          <input
            className="bg-white h-[4.2rem] p-4 rounded-xl mt-4"
            placeholder="Título do treino"
            ref={workoutTitleRef}
            onChange={(e) => {
              workoutTitle.current = e.target.value;
            }}
          />
          <input
            className="bg-white h-[4.2rem] p-4 rounded-xl mt-4"
            placeholder='Duração. Ex: "15 minutos" '
            ref={workoutDurationRef}
            onChange={(e) => {
              workoutDuration.current = e.target.value;
            }}
          />
        </div>
        <section className="grid grid-cols-[1fr_2fr] h-[60rem] max-h-[600px] mt-16 gap-8 overflow-y-hidden">
          <SelectedExercises
            selectedExercises={selectedExercises}
            selectedExercisesDispatch={selectedExercisesDispatch}
          />
          {/* Suggestions */}
          <SuggestionsExercises
            setIsCreateExerciseModalOpen={setIsCreateExerciseModalOpen}
            suggestionExercises={suggestionExercises}
            setSuggestionExercises={setSuggestionExercises}
          />
        </section>
        <Button
          className="h-[3.6rem] mt-8 w-full"
          variant="primary"
          onClick={() => handleSaveWorkout()}
        >
          Salvar treino
        </Button>
      </MainContent>
      <CreateExerciseModal
        isOpen={isCreateExerciseModalOpen}
        setIsOpen={setIsCreateExerciseModalOpen}
        setSuggestionExercises={setSuggestionExercises}
      />
    </>
  );
};
