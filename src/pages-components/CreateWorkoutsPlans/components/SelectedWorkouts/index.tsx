import { AiFillCloseCircle } from 'react-icons/ai';

export const SelectedWorkouts = () => {
  console.log('selected workoutsl');

  return (
    <section className="flex gap-8 mt-16">
      <div className="relative flex flex-col justify-center bg-white p-4 px-6 rounded-2xl border">
        <button
          type="button"
          className="absolute right-2 bottom-0 text-blue-400"
          style={{ right: '-1rem', top: '-1rem' }}
        >
          <AiFillCloseCircle style={{ fontSize: '2rem', color: '#575757' }} />
        </button>
        <p className="font-semibold text-center">Treino de peito</p>
        <span className="text-center">3 exercícios</span>
      </div>
      <div className="relative flex flex-col justify-center bg-white p-4 px-6 rounded-2xl border">
        <button
          type="button"
          className="absolute right-2 bottom-0 text-blue-400"
          style={{ right: '-1rem', top: '-1rem' }}
        >
          <AiFillCloseCircle style={{ fontSize: '2rem', color: '#575757' }} />
        </button>
        <p className="font-semibold text-center">Treino de peito</p>
        <span className="text-center">3 exercícios</span>
      </div>
    </section>
  );
};
