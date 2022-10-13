import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Navigation, Pagination, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { toast } from 'utils/toast';
import { MdLibraryAdd } from 'react-icons/md';
import Image from 'next/image';

import {
  Workout,
  WorkoutPlan as IWorkoutPlan,
} from 'pages-components/Workouts';
import { Button } from 'components/Button';
import { MainContent } from 'layouts/MainContent';
import { SubTitle } from 'pages-components/Employees/components/SubTitle';
import { SeeWorkoutModal } from 'pages-components/Workouts/components/SeeWorkoutModal';
import WorkoutPlansService from 'services/WorkoutPlansService';
import WorkoutService from 'services/WorkoutService';
import { FindMemberModal } from './components/FindMemberModal';

export const WorkoutPlan = () => {
  console.log('workout plan');
  const router = useRouter();
  const workoutPlanId = router.query.id;
  const [workoutPlan, setWorkoutPlan] = useState<IWorkoutPlan>(
    {} as IWorkoutPlan
  );

  const [isSeeWorkoutOpen, setIsSeeWorkoutOpen] = useState(false);
  const [workoutToSee, setWorkoutToSee] = useState<Workout>({} as Workout);

  const [isSelectMemberModalOpen, setIsSelectMemberModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      if (Number.isNaN(Number(workoutPlanId))) {
        toast({
          status: 'error',
          text: 'ID do plano de treino está inválido. ',
        });
        return;
      }

      const res = await WorkoutPlansService.getOne(Number(workoutPlanId));
      setWorkoutPlan(res);
    })();
  }, []);
  console.log({ workoutPlan });

  async function handleSeeWorkout(workoutId: number) {
    console.log({ workoutId });
    try {
      setIsSeeWorkoutOpen(true);
      const workout = await WorkoutService.getOne(workoutId);
      console.log({ workout });
      setWorkoutToSee(workout);
    } catch (err) {
      toast({ status: 'error', text: 'Não foi possível carregar o treino.' });
    }
  }

  async function handleOpenModalToSelectMember() {
    setIsSelectMemberModalOpen(true);
  }

  return (
    <>
      <MainContent className="overflow-hidden ">
        <SubTitle className="text-4xl">
          Plano de treino - {workoutPlan.goal}
        </SubTitle>

        <p className="mt-8 mb-4 text-gray-500 font-medium text-3xl">Treinos</p>
        <section className="w-[100%] bg-white p-8 rounded-[2rem] shadow-sm ">
          <Swiper
            id="customSwiper"
            modules={[Navigation, Pagination, Thumbs]}
            slidesPerView={3}
            spaceBetween={16}
            navigation
            pagination={{ clickable: true }}
            loop
          >
            {workoutPlan.workoutPlanWorkout?.map((workoutPlanWorkout) => (
              <SwiperSlide key={workoutPlanWorkout.id}>
                <div className="relative flex flex-col justify-center items-center gap-6 h-[13.2rem] p-4 rounded-[2rem] bg-blue-100  text-blue-900">
                  <span className="text-blue-800 font-bold text-3xl">
                    {workoutPlanWorkout.workout.title}
                  </span>
                  <Button
                    type="button"
                    className="px-8 h-[3.2rem] text-md"
                    onClick={() =>
                      handleSeeWorkout(workoutPlanWorkout.workout.id)
                    }
                  >
                    Ver mais
                  </Button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <Button
          className="h-[4.8rem] px-8 flex items-center gap-6 mt-8"
          onClick={() => handleOpenModalToSelectMember()}
        >
          Adicionar aluno ao plano de treino
          <MdLibraryAdd />
        </Button>
      </MainContent>

      <SeeWorkoutModal
        isOpen={isSeeWorkoutOpen}
        setIsOpen={setIsSeeWorkoutOpen}
        workoutToSee={workoutToSee}
      />

      <FindMemberModal
        isOpen={isSelectMemberModalOpen}
        setIsOpen={setIsSelectMemberModalOpen}
      />
    </>
  );
};
