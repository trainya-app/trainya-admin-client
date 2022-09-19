import { Modal } from 'components/Modal';
import { Dispatch, SetStateAction } from 'react';
import { AllWorkouts } from 'services/WorkoutService';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  workoutToSee: AllWorkouts[0];
}

export const SeeWorkoutModal = ({ isOpen, setIsOpen, workoutToSee }: Props) => {
  function handleCloseModal() {
    setIsOpen(false);
  }

  return (
    <Modal isModalOpen={isOpen} handleCloseModal={handleCloseModal} title="">
      <p className="text-4xl font-bold">{workoutToSee.title}</p>
      <p className="text-gray-500">{workoutToSee.description}</p>

      <hr className="mx-6 my-8" />

      <div className="grid grid-cols-4 gap-4">
        {workoutToSee?.workoutExercise?.map((workoutExercise) => (
          <div
            key={`see-workout-${workoutExercise.id}`}
            className="relative flex flex-col items-center gap-4 w-full bg-blue-100 p-6 rounded-[1.6rem] bg-center overflow-hidden"
            style={{
              backgroundImage:
                "url('https://i.pinimg.com/564x/b8/ea/06/b8ea0615898a93c0fd3907a07bbda69c.jpg')",
            }}
          >
            <div className="absolute w-full h-full left-0 top-0 bg-[#00000050]" />
            {/* <div className='absolute w-full h-full top-0 '/> */}
            <span
              className="font-bold text-white text-3xl z-10 w-full text-center overflow-hidden"
              style={{ whiteSpace: 'nowrap' }}
              title={workoutExercise?.exercise?.name}
            >
              {workoutExercise?.exercise?.name}
            </span>
            <div className="flex w-full gap-3">
              <div className="bg-blue-50 text-blue-500 font-bold text-center py-2 px-6 flex-1 rounded-2xl z-10">
                Sets: {workoutExercise.sets}
              </div>
              <div className="bg-blue-50 text-blue-500 font-bold text-center py-2 px-6 flex-1 rounded-2xl z-10">
                Reps: {workoutExercise.repetitions}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};
