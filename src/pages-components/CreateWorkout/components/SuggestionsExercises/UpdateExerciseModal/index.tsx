import { Button } from 'components/Button';
import { Modal } from 'components/Modal';
import {
  Dispatch,
  HTMLAttributes,
  InputHTMLAttributes,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import ExercisesService from 'services/ExercisesService';
import { serverApi } from 'services/serverApi';
import { IExercise } from 'types/IExercise';
import { toast } from 'utils/toast';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  exercise: IExercise;
  setSuggestionExercises: Dispatch<SetStateAction<IExercise[]>>;
}

export const UpdateExerciseModal = ({
  isOpen,
  setIsOpen,
  setSuggestionExercises,
  exercise,
}: Props) => {
  const [needsEquipment, setNeedsEquipment] = useState(false);
  const [name, setName] = useState('');
  const [advise, setAdvise] = useState('');
  const [image, setImage] = useState<any>(null as any);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setNeedsEquipment(true);
    setName(exercise?.name as string);
    setAdvise(exercise?.comment as string);
  }, [exercise]);

  function handleChangleNeedsEquipment(value: 'yes' | 'no') {
    if (value === 'yes') {
      setNeedsEquipment(true);
      return;
    }
    setNeedsEquipment(false);
  }

  async function handleUpdateExercise() {
    try {
      setIsLoading(true);
      if (!name || !advise) {
        toast({
          status: 'error',
          text: 'Campos obrigatórios não foram preenchidos.',
          duration: 1000,
        });
        setIsLoading(false);

        return;
      }

      let videoUrl;
      if (image) {
        const formData = new FormData();

        formData.append('file', image);

        const { data } = await serverApi.post(`/files`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (!data?.url) {
          toast({
            status: 'error',
            text: 'Algo deu errado ao carregar sua imagem',
          });
          setIsLoading(false);

          return;
        }
        videoUrl = data?.url;
      }

      const { message, exercise: exerciseUpdated } =
        await ExercisesService.update({
          id: exercise.id,
          name,
          advise,
          needsEquipment,
          videoUrl,
        });

      setSuggestionExercises((prev) =>
        prev.map((sExercise) => {
          if (sExercise.id === exerciseUpdated?.id) {
            return exerciseUpdated;
          }
          return sExercise;
        })
      );

      toast({ status: 'success', text: message });
      setIsOpen(false);
      setIsLoading(false);
      setImage({});
    } catch (err: any) {
      setIsLoading(false);
      toast({ status: 'error', text: err?.response?.data?.message });
    }
  }

  function handleCloseModal() {
    setIsOpen(false);
  }

  return (
    <Modal
      isModalOpen={isOpen}
      handleCloseModal={handleCloseModal}
      className="max-w-[80rem]"
    >
      <div className="flex flex-col gap-6">
        <Label className="w-full">
          Nome do exercício
          <Input
            placeholder="Supino Reto"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Label>

        <Label className="w-full">
          Avisos
          <Input
            placeholder="Muito cuidado com o apoio do pulso"
            value={advise}
            onChange={(e) => setAdvise(e.target.value)}
          />
        </Label>

        <input type="file" onChange={(e) => setImage(e?.target?.files?.[0])} />

        <span className="text-[1.4rem] text-gray-500 text-semibold mt-4">
          Precisa de equipamento?
        </span>
        <div className="flex gap-6 mt-[-0.8rem]">
          <Label>
            <input
              type="radio"
              name="equip"
              value="yes"
              placeholder="Sim"
              checked={!!needsEquipment}
              onChange={(e) =>
                handleChangleNeedsEquipment(e.target.value as 'yes' | 'no')
              }
            />
            Sim
          </Label>
          <Label>
            <input
              type="radio"
              name="equip"
              value="no"
              placeholder="Sim"
              checked={!needsEquipment}
              onChange={(e) =>
                handleChangleNeedsEquipment(e.target.value as 'yes' | 'no')
              }
            />
            Não
          </Label>
        </div>
        <Button
          className="h-[4.2rem] mt-4"
          onClick={() => handleUpdateExercise()}
          disabled={isLoading}
        >
          {isLoading ? 'Atualizando' : 'Atualizar'}
        </Button>
      </div>
    </Modal>
  );
};

const Input = ({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={`h-[4.2rem] w-full px-4 rounded-xl bg-blue-100 place placeholder:text-gray-600 text-blue-600 font-semibold ${className}`}
    {...props}
  />
);

const Label = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLLabelElement>) => (
  <label
    className={` text-[1.4rem] text-gray-500 text-semibold ${className}`}
    {...props}
  >
    {children}
  </label>
);
