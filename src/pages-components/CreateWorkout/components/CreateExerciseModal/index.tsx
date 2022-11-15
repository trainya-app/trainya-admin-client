import {
  Dispatch,
  HTMLAttributes,
  InputHTMLAttributes,
  SetStateAction,
  useState,
} from 'react';

import { Modal } from 'components/Modal';
import { Button } from 'components/Button';
import { toast } from 'utils/toast';
import ExercisesService from 'services/ExercisesService';
import { IExercise } from 'types/IExercise';

import { parseCookies } from 'nookies';

import { serverApi } from 'services/serverApi';

interface CreateExercisesModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setSuggestionExercises: Dispatch<SetStateAction<IExercise[]>>;
}

export const CreateExerciseModal = ({
  isOpen,
  setIsOpen,
  setSuggestionExercises,
}: CreateExercisesModalProps) => {
  const [needsEquipment, setNeedsEquipment] = useState(false);
  const [name, setName] = useState('');
  const [advise, setAdvise] = useState('');
  const [image, setImage] = useState<any>(null as any);

  const [isLoading, setIsLoading] = useState(false);

  function handleCloseModal() {
    setIsOpen(false);
  }

  function handleChangleNeedsEquipment(value: 'yes' | 'no') {
    if (value === 'yes') {
      setNeedsEquipment(true);
      return;
    }
    setNeedsEquipment(false);
  }

  async function handleCreateExercise() {
    try {
      setIsLoading(true);
      if (!name) {
        toast({
          status: 'error',
          text: 'Campos obrigatórios não foram preenchidos.',
          duration: 1000,
        });
        setIsLoading(false);

        return;
      }
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
      const videoUrl = data?.url;

      const { message, exercise } = await ExercisesService.store({
        name,
        advise,
        needsEquipment,
        videoUrl,
      });

      setSuggestionExercises((prev) => [...prev, exercise]);

      toast({ status: 'success', text: message });
      setIsOpen(false);
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      toast({ status: 'error', text: err?.response?.data?.message });
    }
  }

  const { token } = parseCookies();

  return (
    <Modal
      isModalOpen={isOpen}
      title="Criar exercício"
      handleCloseModal={handleCloseModal}
      className="max-w-[600px]"
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
          onClick={() => handleCreateExercise()}
          disabled={isLoading}
        >
          {isLoading ? 'Criando' : 'Criar'}
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
