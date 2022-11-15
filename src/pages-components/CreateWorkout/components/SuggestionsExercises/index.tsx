import { Button } from 'components/Button';
import { IExercise } from 'types/IExercise';
import { useSelectedExercises } from 'pages-components/CreateWorkout/hooks/useSelectedExercises';
import { useCallback, useState, Dispatch, SetStateAction } from 'react';
import { UpdateExerciseModal } from './UpdateExerciseModal';

interface SuggestionsWorkoutsProps {
  setIsCreateExerciseModalOpen: Dispatch<SetStateAction<boolean>>;
  suggestionExercises: IExercise[];
  setSuggestionExercises: Dispatch<SetStateAction<IExercise[]>>;
}

export const SuggestionsExercises = ({
  setIsCreateExerciseModalOpen,
  suggestionExercises,
  setSuggestionExercises,
}: SuggestionsWorkoutsProps) => {
  const [searchExercises, setSearchExercises] = useState('');
  const { selectedExercisesDispatch } = useSelectedExercises();

  const [exerciseToUpdate, setExerciseToUpdate] = useState<IExercise>(
    {} as IExercise
  );
  const [isUpdateExerciseModalOpen, setIsUpdateExerciseModalOpen] =
    useState(false);

  const handleSeeMoreSuggestionWorkouts = useCallback(async () => {
    try {
      // Grab more suggestions workouts
    } catch (err: any) {}
  }, []);

  const handleSelectWorkout = useCallback(
    (workout: { id: number; name: string; video_url?: string }) => {
      selectedExercisesDispatch({
        type: 'ADD-WORKOUT',
        payload: {
          id: workout.id,
          name: workout.name,
          sets: 3,
          repetitions: 12,
          video_url: workout.video_url,
        },
      });
    },
    []
  );

  function handleOpenUpdateExerciseModal(exercise: IExercise) {
    setExerciseToUpdate(exercise);
    setIsUpdateExerciseModalOpen(true);
  }

  const handleOpenCreateExerciseModal = useCallback(() => {
    setIsCreateExerciseModalOpen(true);
  }, []);

  const filteredSuggestionWorkouts = suggestionExercises.filter(
    (suggestion) => {
      const obj = Object.values(suggestion).join('').toLowerCase();
      return obj.includes(searchExercises.toLowerCase().trim());
    }
  );

  return (
    <>
      <div className="flex flex-col  h-full">
        <h3 className="font-bold text-gray-600 text-3xl">Sugestões</h3>
        <div className="w-full flex-1 bg-white rounded-3xl mt-6 p-6">
          <header className="flex items-center justify-between w-full">
            <input
              placeholder="Pesquisar por um treino"
              className="w-full bg-blue-50 text-blue-500 font-semibold placeholder-gray-500 h-16 px-4 rounded-2xl shadow-sm"
              value={searchExercises}
              onChange={(e) => setSearchExercises(e.target.value)}
            />
          </header>
          {/* Workouts Grid */}
          <div className="grid grid-cols-2 gap-6 mt-10 max-h-[40rem] overflow-y-scroll">
            {filteredSuggestionWorkouts.map((workout) => (
              <div
                key={workout.id}
                className="relative flex flex-col items-center justify-between gap-4 bg-blue-100 p-6 rounded-[1.6rem] bg-center overflow-hidden "
              >
                {/* <div className='absolute w-full h-full top-0 '/> */}
                <span className="font-bold text-blue-800 text-3xl text-center z-10">
                  {workout.name}
                </span>

                <footer className="flex w-full gap-4">
                  <Button
                    type="button"
                    onClick={() =>
                      handleSelectWorkout({
                        id: workout.id,
                        name: workout.name,
                        video_url: workout.video_url,
                      })
                    }
                    variant="outlined"
                    className="h-[3.6rem] z-10 flex-1"
                  >
                    Adicionar
                  </Button>

                  <Button
                    type="button"
                    variant="white"
                    className="h-[3.6rem] flex-1"
                    onClick={() => handleOpenUpdateExerciseModal(workout)}
                  >
                    Editar
                  </Button>
                </footer>
              </div>
            ))}
          </div>

          <footer className="flex justify-between items-center gap-6 mt-8">
            <button
              type="button"
              onClick={() => handleSeeMoreSuggestionWorkouts()}
              className="bg-blue-50 text-blue-500 h-[3.2rem] px-6 rounded-2xl  hover:bg-blue-500 hover:text-blue-100 transition-all"
            >
              Ver mais
            </button>
            <button
              type="button"
              onClick={() => handleOpenCreateExerciseModal()}
              className="border-2 border-blue-500 rounded-2xl px-4 h-[3.2rem] text-blue-500 hover:bg-blue-500 hover:text-white transition-all"
            >
              Criar exercício
            </button>
          </footer>
        </div>
      </div>
      <UpdateExerciseModal
        isOpen={isUpdateExerciseModalOpen}
        setIsOpen={setIsUpdateExerciseModalOpen}
        exercise={exerciseToUpdate}
        setSuggestionExercises={setSuggestionExercises}
      />
    </>
  );
};
