/* eslint-disable import/no-unresolved */
import { FaArrowLeft } from 'react-icons/fa';

import { Button } from 'components/Button';
import { MainContent } from 'layouts/MainContent';
import Image from 'next/image';

// eslint-disable-next-line import/no-unresolved
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { ReactNode, useState } from 'react';
import { SelectedExercises } from './components/SelectedExercises';
import { useSelectedExercises } from './hooks/useSelectedExercises';
import { SuggestionsWorkouts } from './components/SuggestionsWorkouts';
import { FindMemberModal } from './components/FindMemberModal';

export interface IExercise {
  id: number;
  title: string;
  sets: number;
  reps: number;
}

export interface IMember {
  id: number;
  name: string;
  profileImage: string;
  document: {
    name: string;
    value: string;
  };
}

export const CreateWorkoutsPlans = () => {
  const { selectedExercises, selectedExercisesDispatch } =
    useSelectedExercises();

  const [selectedMember, setSelectedMember] = useState<IMember>({} as IMember);
  const [isFindMemberModalOpen, setIsFindMemberModalOpen] = useState(false);

  function handleOpenFindMemberModal() {
    setIsFindMemberModalOpen(true);
  }

  return (
    <>
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

        <div className="flex justify-between mt-12">
          {/* <SubTitle>Selecione o aluno</SubTitle> */}
          {selectedMember.id && (
            <div className="flex gap-4 items-center">
              <div className="img relative h-[3.6rem] w-[3.6rem] rounded-2xl overflow-hidden">
                <Image
                  layout="fill"
                  src={
                    selectedMember?.profileImage ||
                    'https://github.com/bryanmaraujo544.png'
                  }
                  alt={selectedMember?.name}
                />
              </div>
              <div className="flex flex-col">
                <p className="font-semibold text-gray-900">
                  Nome: {selectedMember?.name}
                </p>
                <p className="text-[1.4rem] text-gray-600">
                  {selectedMember?.document?.name}:{' '}
                  {selectedMember?.document?.value}
                </p>
              </div>
            </div>
          )}
          <Button
            className="h-16 px-12"
            onClick={() => handleOpenFindMemberModal()}
          >
            Selecionar Aluno
          </Button>
        </div>
        <div className="mt-10">
          <SubTitle>Título do Plano de Treino</SubTitle>
          <input
            placeholder="Ex: Fortalecimento Total"
            className="w-full h-20 rounded-[1.2rem] px-6 mt-3"
          />
        </div>

        <div className="mt-10">
          <SubTitle>Descrição</SubTitle>
          <input
            placeholder="Ex: Fortalecimento Total"
            className="w-full h-20 rounded-[1.2rem] px-6 mt-3"
          />
        </div>

        <section className="grid grid-cols-[1fr_2fr] mt-16 gap-8">
          <SelectedExercises
            selectedExercises={selectedExercises}
            selectedExercisesDispatch={selectedExercisesDispatch}
          />
          {/* Suggestions */}
          <SuggestionsWorkouts />
        </section>
      </MainContent>
      <FindMemberModal
        isOpen={isFindMemberModalOpen}
        setIsOpen={setIsFindMemberModalOpen}
        setSelectedMember={setSelectedMember}
      />
    </>
  );
};

const SubTitle = ({ children, ...rest }: { children: ReactNode }) => (
  <p className="font-semibold text-gray-500" {...rest}>
    {children}
  </p>
);
