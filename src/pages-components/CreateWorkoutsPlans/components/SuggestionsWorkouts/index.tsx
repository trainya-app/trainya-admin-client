import axios from 'axios';
import { Button } from 'components/Button';
import { IExercise } from 'pages-components/CreateWorkoutsPlans';
import { useSelectedExercises } from 'pages-components/CreateWorkoutsPlans/hooks/useSelectedExercises';
import ExercisesService from 'pages-components/CreateWorkoutsPlans/services/ExercisesService';
import {
  useCallback,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import { serverApi } from 'services/serverApi';

const FAKE_WORKOUTS: IExercise[] = [
  {
    id: 23,
    name: 'Supino Reto',
    sets: 3,
    reps: 12,
  },
  {
    id: 22,
    name: 'Supino Inclinado',
    sets: 3,
    reps: 15,
  },
  {
    id: 24,
    name: 'Rosca Direte',
    sets: 3,
    reps: 15,
  },
  {
    id: 424,
    name: 'Rosca Direte',
    sets: 3,
    reps: 15,
  },
  {
    id: 22290,
    name: 'Rosca Direte',
    sets: 3,
    reps: 15,
  },
  {
    id: 290290,
    name: 'Rosca Direte',
    sets: 3,
    reps: 15,
  },
  {
    id: 22311090,
    name: 'Rosca Direte',
    sets: 3,
    reps: 15,
  },
  {
    id: 230090,
    name: 'Rosca Direte',
    sets: 3,
    reps: 15,
  },
];

interface SuggestionsWorkoutsProps {
  setIsCreateExerciseModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const SuggestionsWorkouts = ({
  setIsCreateExerciseModalOpen,
}: SuggestionsWorkoutsProps) => {
  const [searchWorkouts, setSearchWorkouts] = useState('');
  const [suggestionsExercises, setSuggestionsExercises] = useState<
    { id: number; name: string }[]
  >([]);
  const { selectedExercisesDispatch } = useSelectedExercises();

  useEffect(() => {
    (async () => {
      const allExercises = await ExercisesService.getAll();
      setSuggestionsExercises(allExercises);
      console.log('allExercises', allExercises);
    })();
  }, []);

  const handleSeeMoreSuggestionWorkouts = useCallback(async () => {
    try {
      // Grab more suggestions workouts
      setSuggestionsExercises(FAKE_WORKOUTS);
    } catch (err: any) {}
  }, []);

  const handleSelectWorkout = useCallback(
    (workout: { id: number; name: string }) => {
      selectedExercisesDispatch({
        type: 'ADD-WORKOUT',
        payload: { id: workout.id, name: workout.name, sets: 3, reps: 12 },
      });
    },
    []
  );

  const handleOpenCreateExerciseModal = useCallback(() => {
    // TODO: Open the create exercise modal
    setIsCreateExerciseModalOpen(true);
  }, []);

  const filteredSuggestionWorkouts = suggestionsExercises.filter(
    (suggestion) => {
      const obj = Object.values(suggestion).join('').toLowerCase();
      return obj.includes(searchWorkouts.toLowerCase());
    }
  );
  return (
    <div>
      <h3 className="font-bold text-gray-600 text-3xl">
        Sugestões de Exercícios
      </h3>
      <div className="w-full bg-white rounded-3xl mt-6 p-6">
        <header className="flex items-center justify-between w-full">
          <input
            placeholder="Pesquisar por um treino"
            className="w-full bg-blue-50 text-blue-500 font-semibold placeholder-gray-500 h-16 px-4 rounded-2xl shadow-sm"
            value={searchWorkouts}
            onChange={(e) => setSearchWorkouts(e.target.value)}
          />
        </header>
        {/* Workouts Grid */}
        <div className="grid grid-cols-2 gap-6 mt-10 max-h-[40rem] overflow-y-scroll">
          {filteredSuggestionWorkouts.map((workout) => (
            <div
              key={workout.id}
              className="relative flex flex-col items-center gap-4 bg-blue-100 p-6 rounded-[1.6rem] bg-center overflow-hidden "
            >
              {/* <div className='absolute w-full h-full top-0 '/> */}
              <span className="font-bold text-blue-600 text-3xl z-10">
                {workout.name}
              </span>
              <Button
                type="button"
                onClick={() =>
                  handleSelectWorkout({ id: workout.id, name: workout.name })
                }
                variant="outlined"
                className="w-full h-[3.6rem] mt-4 z-10"
              >
                Adicionar
              </Button>
            </div>
          ))}
        </div>

        <footer className="flex justify-between items-center gap-6 mt-4">
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
  );
};
