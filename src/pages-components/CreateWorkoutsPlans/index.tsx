/* eslint-disable import/no-unresolved */
import { FaArrowLeft } from 'react-icons/fa';

import { Button } from 'components/Button';
import { MainContent } from 'layouts/MainContent';

// eslint-disable-next-line import/no-unresolved
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

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
        <div>
          <h3>Sugestões de Treinos</h3>
          <div className="w-full bg-white rounded-3xl p-6">f</div>
        </div>
      </section>
    </MainContent>
  );
};
