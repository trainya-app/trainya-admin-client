/* eslint-disable import/no-unresolved */
import { FaArrowLeft } from 'react-icons/fa';

import { Button } from 'components/Button';
import { MainContent } from 'layouts/MainContent';

// eslint-disable-next-line import/no-unresolved
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useCallback, useReducer, useState } from 'react';
import { SelectedWorkouts } from './components/SelectedWorkouts';
import { selectedWorkoutsReducer } from './reducers/selectedWorkoutsReducer';

export interface IWorkout {
  id: number;
  title: string;
  sets: number;
  reps: number;
}

const FAKE_WORKOUTS: IWorkout[] = [
  {
    id: 23,
    title: 'Supino Reto',
    sets: 3,
    reps: 12,
  },
  {
    id: 22,
    title: 'Supino Inclinado',
    sets: 3,
    reps: 15,
  },
  {
    id: 24,
    title: 'Rosca Direte',
    sets: 3,
    reps: 15,
  },
  {
    id: 424,
    title: 'Rosca Direte',
    sets: 3,
    reps: 15,
  },
  {
    id: 22290,
    title: 'Rosca Direte',
    sets: 3,
    reps: 15,
  },
  {
    id: 290290,
    title: 'Rosca Direte',
    sets: 3,
    reps: 15,
  },
  {
    id: 22311090,
    title: 'Rosca Direte',
    sets: 3,
    reps: 15,
  },
  {
    id: 230090,
    title: 'Rosca Direte',
    sets: 3,
    reps: 15,
  },
];

export const CreateWorkoutsPlans = () => {
  const [suggestionsWorkouts, setSuggestionsWorkouts] = useState<
    {
      id: number;
      title: string;
      sets: number;
      reps: number;
    }[]
  >([]);
  // const [selectedWorkouts, setSelectedWorkouts] = useState<IWorkout[]>([]);
  const [selectedWorkouts, selectedWorkoutsDispatch] = useReducer(
    selectedWorkoutsReducer,
    { value: [] }
  );

  const handleSeeMoreSuggestionWorkouts = useCallback(() => {
    try {
      // Grab more suggestions workouts
      setSuggestionsWorkouts(FAKE_WORKOUTS);
    } catch (err: any) {}
  }, []);

  const handleSelectWorkout = useCallback((workout: IWorkout) => {
    selectedWorkoutsDispatch({ type: 'ADD-WORKOUT', payload: workout });
  }, []);

  return (
    <MainContent className="overflow-hidden">
      <header className="flex items-center gap-4">
        <Button
          variant="white"
          className="w-16 h-16 flex items-center justify-center"
        >
          <FaArrowLeft className="text-2xl" />
        </Button>
        <h2 className="font-bold text-gray-700 text-3xl">
          Criar Planos de Treinos
        </h2>
      </header>

      <div className="mt-12">
        <p className="font-semibold text-gray-500">Título do Plano de Treino</p>
        <input
          placeholder="Ex: Fortalecimento Total"
          className="w-full h-20 rounded-[1.2rem] px-6 mt-3"
        />
      </div>

      <div className="mt-10">
        <p className="font-semibold text-gray-500">Descrição</p>
        <input
          placeholder="Ex: Fortalecimento Total"
          className="w-full h-20 rounded-[1.2rem] px-6 mt-3"
        />
      </div>

      <section className="grid grid-cols-[1fr_2fr] mt-16 gap-8">
        <SelectedWorkouts
          selectedWorkouts={selectedWorkouts.value}
          selectedWorkoutsDispatch={selectedWorkoutsDispatch}
        />
        {/* Suggestions */}
        <div>
          <h3 className="font-bold text-gray-600 text-3xl">
            Sugestões de Treinos
          </h3>
          <div className="w-full bg-white rounded-3xl mt-6 p-6">
            <header className="flex items-center justify-between w-full">
              <input
                placeholder="Pesquisar por um treino"
                className="w-full bg-blue-50 text-blue-500 font-semibold placeholder-gray-500 h-16 px-4 rounded-2xl shadow-sm"
              />
            </header>
            {/* Workouts Grid */}
            <div className="grid grid-cols-2 gap-6 mt-10 max-h-[40rem] overflow-y-scroll">
              {suggestionsWorkouts.map((workout) => (
                <div
                  key={workout.id}
                  className="relative flex flex-col items-center gap-4 bg-blue-100 p-6 rounded-[1.6rem] bg-center overflow-hidden "
                  style={{
                    backgroundImage:
                      "url('https://i.pinimg.com/564x/b8/ea/06/b8ea0615898a93c0fd3907a07bbda69c.jpg')",
                  }}
                >
                  <div className="absolute w-full h-full left-0 top-0 bg-[#00000050]" />
                  {/* <div className='absolute w-full h-full top-0 '/> */}
                  <span className="font-bold text-white text-3xl z-10">
                    {workout.title}
                  </span>
                  <div className="flex w-full gap-3">
                    <div className="bg-blue-50 text-blue-500 font-bold text-center py-2 px-6 flex-1 rounded-2xl z-10">
                      Sets: {workout.sets}
                    </div>
                    <div className="bg-blue-50 text-blue-500 font-bold text-center py-2 px-6 flex-1 rounded-2xl z-10">
                      Reps: {workout.reps}
                    </div>
                  </div>
                  <Button
                    type="button"
                    onClick={() => handleSelectWorkout(workout)}
                    variant="outlined"
                    className="w-full h-[3.6rem] mt-4 z-10"
                  >
                    Adicionar
                  </Button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => handleSeeMoreSuggestionWorkouts()}
              className="bg-blue-50 text-blue-500 py-2 px-6 rounded-2xl mt-4 hover:bg-blue-500 hover:text-blue-100 transition-all"
            >
              Ver mais
            </button>
          </div>
        </div>
      </section>
    </MainContent>
  );
};
