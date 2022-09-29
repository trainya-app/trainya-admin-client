/* eslint-disable import/no-unresolved */
import { useState, useEffect } from 'react';
import { MdLibraryAdd, MdOutlinePeopleAlt } from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from 'swiper';

import { MainContent } from 'layouts/MainContent';
import { SubTitle } from 'pages-components/Employees/components/SubTitle';
import { Button } from 'components/Button';

// eslint-disable-next-line import/no-unresolved
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-cube';
import { useRouter } from 'next/router';
import { FaDumbbell } from 'react-icons/fa';
import WorkoutService from 'services/WorkoutService';
import { SeeWorkoutModal } from './components/SeeWorkoutModal';

const FAKE_WORKOUTS = [
  {
    id: 'fdadfddkdjfds',
    bg: 'https://i.pinimg.com/564x/b8/ea/06/b8ea0615898a93c0fd3907a07bbda69c.jpg',
    target: 'Foco',
    button: 'Ver mais',
    footer: 129,
  },
  {
    id: 'fdfaADFAddkdjfds',
    bg: 'https://i.pinimg.com/564x/b8/ea/06/b8ea0615898a93c0fd3907a07bbda69c.jpg',
    target: 'Foco',
    button: 'Ver mais',
    footer: 129,
  },
  {
    id: 'fdFFddkdjfgfadfds',
    bg: 'https://i.pinimg.com/564x/b8/ea/06/b8ea0615898a93c0fd3907a07bbda69c.jpg',
    target: 'Foco',
    button: 'Ver mais',
    footer: 129,
  },
  {
    id: 'FGaaFGafFda',
    bg: 'https://i.pinimg.com/564x/b8/ea/06/b8ea0615898a93c0fd3907a07bbda69c.jpg',
    target: 'Foco',
    button: 'Ver mais',
    footer: 129,
  },
];

export interface Workout {
  id: number;
  employee_id: number;
  title: string;
  description: string;
  level: string;
  duration: string;
  workoutExercise: any[];
}

export const Workouts = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([] as Workout[]);
  const router = useRouter();

  const [isSeeWorkoutOpen, setIsSeeWorkoutOpen] = useState(false);
  const [workoutToSee, setWorkoutToSee] = useState<Workout>({} as Workout);

  useEffect(() => {
    (async () => {
      const allWorkouts = await WorkoutService.getAll();
      setWorkouts(allWorkouts);
    })();
  }, []);

  function handleGoToCreateWorkoutPlan() {
    router.push('/workouts/create-workout-plan');
  }

  function handleGoToCreateWorkout() {
    router.push('/workouts/create-workout');
  }

  function handleSeeWorkout(workout: Workout) {
    setIsSeeWorkoutOpen(true);

    setWorkoutToSee(workout);
  }

  return (
    <>
      <MainContent className="overflow-hidden">
        <SubTitle className="mt-16 mb-8">Planos de Treinos</SubTitle>
        <section className="w-[100%] bg-white p-8 rounded-[2rem] shadow-sm">
          <Swiper
            id="customSwiper"
            modules={[Navigation, Pagination, Thumbs]}
            slidesPerView={3}
            spaceBetween={16}
            navigation
            pagination={{ clickable: true }}
            loop
            style={{ borderRadius: '2rem' }}
          >
            {FAKE_WORKOUTS.map((workout) => (
              <SwiperSlide key={workout.id}>
                <div
                  style={{
                    backgroundImage:
                      "url('https://i.pinimg.com/564x/b8/ea/06/b8ea0615898a93c0fd3907a07bbda69c.jpg')",
                  }}
                  className="relative flex flex-col justify-center items-center gap-6 h-64 p-4 rounded-[2rem]  text-white "
                >
                  <span className="text-white font-bold text-3xl">
                    Foco em fortalecimento
                  </span>

                  <Button
                    type="button"
                    className="w-full max-w-[150px] h-[3.6rem]"
                  >
                    Ver mais
                  </Button>
                  <footer className="absolute flex items-center gap-2 bottom-4 right-6 mt-auto">
                    <MdOutlinePeopleAlt />
                    <span className="font-bold">129</span>
                  </footer>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <Button
            type="button"
            variant="primary"
            className=" h-[42px] gap-4 px-8 mt-6 font-bold text-white flex items-center justify-center"
            onClick={handleGoToCreateWorkoutPlan}
          >
            Criar plano de Treino
            <MdLibraryAdd />
          </Button>
        </section>

        <SubTitle className="mt-16 mb-8">Treinos</SubTitle>
        <section className="w-[100%] bg-white p-8 rounded-[2rem] shadow-sm">
          <Swiper
            id="customSwiper"
            modules={[Navigation, Pagination, Thumbs]}
            slidesPerView={3}
            spaceBetween={16}
            navigation
            pagination={{ clickable: true }}
            loop
          >
            {workouts.map((workout) => (
              <SwiperSlide key={workout.id}>
                <div
                  style={{
                    backgroundImage:
                      "url('https://i.pinimg.com/564x/b8/ea/06/b8ea0615898a93c0fd3907a07bbda69c.jpg')",
                  }}
                  className="relative flex flex-col justify-center items-center gap-6 h-64 p-4 rounded-[2rem]  text-white"
                >
                  <span className="text-white font-bold text-3xl">
                    {workout.title}
                  </span>
                  <span className="text-gray-200 text-[1.4rem] mt-[-0.8rem]">
                    {workout.description}
                  </span>
                  <Button
                    type="button"
                    className="w-full max-w-[150px] h-[3.6rem]"
                    onClick={() => handleSeeWorkout(workout)}
                  >
                    Ver mais
                  </Button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <Button
            type="button"
            variant="primary"
            className=" h-[42px] gap-4 px-8 mt-6 font-bold text-white flex items-center justify-center"
            onClick={handleGoToCreateWorkout}
          >
            Criar Treino
            <FaDumbbell />
          </Button>
        </section>
      </MainContent>
      <SeeWorkoutModal
        isOpen={isSeeWorkoutOpen}
        setIsOpen={setIsSeeWorkoutOpen}
        workoutToSee={workoutToSee}
      />
    </>
  );
};
