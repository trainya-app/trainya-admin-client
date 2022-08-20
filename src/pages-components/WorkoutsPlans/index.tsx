/* eslint-disable import/no-unresolved */
import { MdLibraryAdd, MdOutlinePeopleAlt } from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from 'swiper';

import { MainContent } from 'layouts/MainContent';
import { SubTitle } from 'pages-components/Employees/components/SubTitle';

// eslint-disable-next-line import/no-unresolved
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-cube';
import { Button } from 'components/Button';

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

export const WorkoutsPlans = () => {
  console.log('WorkoutsPlans');

  return (
    <MainContent className="overflow-hidden">
      <button
        type="button"
        className="bg-blue-500 rounded-2xl h-[42px] gap-4 px-8 font-bold text-white flex items-center justify-center"
      >
        Criar plano de Treino
        <MdLibraryAdd />
      </button>

      <SubTitle className="mt-16 mb-8">Planos de Treinos</SubTitle>
      <section className="w-[100%] bg-white p-8 rounded-[2rem] shadow-sm">
        <Swiper
          id="customSwiper"
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
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
                className="relative flex flex-col justify-center items-center gap-6 h-64 p-4 rounded-[2rem]  text-white"
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
      </section>

      <SubTitle className="mt-16 mb-8">Em destaque</SubTitle>
      <section className="w-[100%] bg-white p-8 rounded-[2rem] shadow-sm">
        <Swiper
          id="customSwiper"
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
          modules={[Navigation, Pagination, Thumbs]}
          slidesPerView={3}
          spaceBetween={16}
          navigation
          pagination={{ clickable: true }}
          loop
        >
          {FAKE_WORKOUTS.map((workout) => (
            <SwiperSlide key={workout.id}>
              <div
                style={{
                  backgroundImage:
                    "url('https://i.pinimg.com/564x/b8/ea/06/b8ea0615898a93c0fd3907a07bbda69c.jpg')",
                }}
                className="relative flex flex-col justify-center items-center gap-6 h-64 p-4 rounded-[2rem]  text-white"
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
      </section>
    </MainContent>
  );
};
