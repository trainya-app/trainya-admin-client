/* eslint-disable import/no-unresolved */
import { FaArrowLeft } from 'react-icons/fa';

import { Button } from 'components/Button';
import { MainContent } from 'layouts/MainContent';

// eslint-disable-next-line import/no-unresolved
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const FAKE_WORKOUTS = [
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
    id: 290,
    title: 'Rosca Direte',
    sets: 3,
    reps: 15,
  },
];

export const CreateWorkoutsPlans = () => {
  console.log('WorkoutsPlans');

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
        <div>
          <h3>Treinos</h3>
          <div className="w-full bg-white rounded-3xl p-6">f</div>
        </div>

        {/* Suggestions */}
        <div>
          <h3>Sugestões de Treinos</h3>
          <div className="w-full bg-white rounded-3xl p-6">
            <header className="flex items-center justify-between w-full">
              <input
                placeholder="Pesquisar por um treino"
                className="w-full bg-blue-50 text-blue-500 font-semibold placeholder-gray-500 h-16 px-4 rounded-2xl shadow-sm"
              />
            </header>
            {/* Workouts Grid */}
            <div className="grid grid-cols-2 gap-4 mt-10 max-h-[50rem] overflow-y-scroll">
              {FAKE_WORKOUTS.map((workout) => (
                <div
                  key={workout.id}
                  className="flex flex-col items-center gap-4 bg-blue-100 p-4 rounded-[1.6rem]"
                  style={{
                    backgroundImage:
                      "url('https://i.pinimg.com/564x/b8/ea/06/b8ea0615898a93c0fd3907a07bbda69c.jpg')",
                  }}
                >
                  <span className="font-bold text-white">{workout.title}</span>
                  <div className="flex gap-3">
                    <div className="bg-blue-50 text-blue-500 font-bold py-1 px-6 rounded-xl">
                      Sets: {workout.sets}
                    </div>
                    <div className="bg-blue-50 text-blue-500 font-bold py-1 px-6 rounded-xl">
                      Reps: {workout.reps}
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outlined"
                    className="w-full max-w-[150px] h-[3.2rem] mt-4"
                  >
                    Adicionar
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </MainContent>
  );
};
