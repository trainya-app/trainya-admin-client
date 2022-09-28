/* eslint-disable import/no-unresolved */
import { FaArrowLeft } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';

import { Button } from 'components/Button';
import { MainContent } from 'layouts/MainContent';
import Image from 'next/image';

// eslint-disable-next-line import/no-unresolved
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { ReactNode, useEffect, useState } from 'react';
import { BackButton } from 'components/BackButton';
import WorkoutService, { AllWorkouts } from 'services/WorkoutService';
import { useRouter } from 'next/router';
import { toast } from 'utils/toast';
import WorkoutPlansService from 'services/WorkoutPlansService';
import { useUser } from 'hooks/useUser';
import { FindMemberModal } from './components/FindMemberModal';
import { SelectedWorkouts } from './components/SelectedWorkouts';
import { CreateExerciseModal } from '../CreateWorkout/components/CreateExerciseModal';
import { SeeWorkoutModal } from './components/SeeWorkoutModal';
import { useSelectedWorkouts } from './hooks/useSelectedWorkouts';

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
  const [goal, setGoal] = useState('');

  const [workouts, setWorkouts] = useState<AllWorkouts>([] as AllWorkouts);

  const [workoutSearch, setWorkoutSearch] = useState('');
  const [isSeeWorkoutModalOpen, setIsSeeWorkoutModalOpen] = useState(false);
  const [workoutToSee, setWorkoutToSee] = useState<AllWorkouts[0]>(
    {} as AllWorkouts[0]
  );

  const { selectedWorkoutsDispatch, selectedWorkouts } = useSelectedWorkouts();

  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    (async () => {
      const allWorkouts = await WorkoutService.getAll();
      setWorkouts(allWorkouts);
    })();
  }, []);

  function handleSeeWorkout(workout: AllWorkouts[0]) {
    setWorkoutToSee(workout);
    setIsSeeWorkoutModalOpen(true);
  }

  function handleAddWorkout(workout: AllWorkouts[0]) {
    selectedWorkoutsDispatch({
      type: 'ADD-WORKOUT',
      payload: { ...workout, exercisesCount: workout.workoutExercise.length },
    });
  }

  function handleGoBack() {
    router.back();
  }

  const filteredWorkouts = workouts.filter((workout) => {
    const objStr = Object.values(workout).join('');
    if (objStr.toLowerCase().includes(workoutSearch.toLowerCase())) {
      return true;
    }
    return false;
  });

  async function handleCreateWorkoutPlan() {
    try {
      if (!goal) {
        toast({ status: 'error', text: 'Preencha os campos obrigatórios' });
        return;
      }
      if (selectedWorkouts.length < 1) {
        toast({ status: 'error', text: 'Selecione pelo menos 1 treino.' });
        return;
      }

      const workoutPlanWorkouts = selectedWorkouts.map((workout) => ({
        workout_id: workout.id,
      }));
      const { workoutPlan } = await WorkoutPlansService.store({
        goal,
        employeeId: user.id,
        workoutPlanWorkouts,
      });
      console.log({ workoutPlan });
      resetFields();
      toast({ status: 'success', text: 'Plano de Treino criado com sucesso!' });
    } catch (err: any) {
      toast({ status: 'error', text: err?.response?.data?.message });
    }
  }

  function resetFields() {
    selectedWorkoutsDispatch({ type: 'REPLACE-WORKOUTS', payload: [] });
    setGoal('');
  }

  return (
    <>
      <MainContent className="overflow-hidden">
        <header className="flex items-center gap-4">
          <BackButton onClick={handleGoBack} />
          <h2 className="font-bold text-gray-700 text-3xl">
            Criar Planos de Treinos
          </h2>
        </header>

        {/* <div className="flex justify-between mt-12">
          <SubTitle>Selecione o aluno</SubTitle>
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
        </div> */}

        <section className="flex w-100 gap-6 mt-10 items-end">
          <div className="flex-1">
            <SubTitle>Objetivo do Plano de Treino</SubTitle>
            <input
              placeholder="Ex: Fortalecimento do Abdômen"
              className="w-full h-[4.2rem] rounded-[1.2rem] px-6 mt-3"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </div>

          <Button
            className="h-[4.2rem] px-4"
            onClick={() => handleCreateWorkoutPlan()}
          >
            Criar Plano de Treino
          </Button>
        </section>

        <SelectedWorkouts />

        {/* Workouts Section */}
        <section className="w-full">
          <h2 className="font-bold text-gray-600 text-3xl">
            Treinos da plataforma
          </h2>

          <input
            placeholder="Pesquise por um treino"
            className="w-full h-[4.2rem] rounded-[1.2rem] px-6 mt-3"
            value={workoutSearch}
            onChange={(e) => setWorkoutSearch(e.target.value)}
          />
          <div className="w-100 h-[.1rem] my-10 bg-gray-300" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {filteredWorkouts.map((workout) => (
              <div
                key={`workout-plans-all-exercies-${workout.id}`}
                style={{
                  backgroundImage:
                    "url('https://i.pinimg.com/564x/b8/ea/06/b8ea0615898a93c0fd3907a07bbda69c.jpg')",
                }}
                className="p-6 rounded-3xl flex flex-col items-center justify-between gap-6"
              >
                <p
                  className="w-full text-white font-semibold overflow-hidden text-center"
                  style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}
                  title={workout.title}
                >
                  {workout.title}
                </p>
                <footer className="flex gap-2 w-full">
                  <Button
                    variant="white"
                    className="flex-1 h-[3.6rem]"
                    onClick={() => handleSeeWorkout(workout)}
                  >
                    Ver Treino
                  </Button>
                  <Button
                    className="flex-1 h-[3.6rem]"
                    onClick={() => handleAddWorkout(workout)}
                  >
                    Adicionar
                  </Button>
                </footer>
              </div>
            ))}
          </div>
        </section>
      </MainContent>
      {/* <FindMemberModal
        isOpen={isFindMemberModalOpen}
        setIsOpen={setIsFindMemberModalOpen}
        setSelectedMember={setSelectedMember}
      /> */}
      <SeeWorkoutModal
        workoutToSee={workoutToSee}
        isOpen={isSeeWorkoutModalOpen}
        setIsOpen={setIsSeeWorkoutModalOpen}
      />
    </>
  );
};

const SubTitle = ({ children, ...rest }: { children: ReactNode }) => (
  <p className="font-semibold text-gray-500" {...rest}>
    {children}
  </p>
);
