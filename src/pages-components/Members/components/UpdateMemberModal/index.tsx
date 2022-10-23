import { Button } from 'components/Button';
import { Modal } from 'components/Modal';
import dayjs from 'dayjs';
import { useUser } from 'hooks/useUser';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import GymsService, { GymMember } from 'services/GymsService';
import MembersService from 'services/MembersService';
import formatPhone from 'utils/format-phone';
import { toast } from 'utils/toast';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setAllMembers: Dispatch<SetStateAction<GymMember[]>>;
  memberToUpdate: GymMember;
}

interface Inputs {
  name: string;
  weight: number;
  height: number;
  email: string;
}

export const UpdateMemberModal = ({
  isOpen,
  setIsOpen,
  setAllMembers,
  memberToUpdate,
}: Props) => {
  const [phone, setPhone] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Inputs>();

  const { user } = useUser();

  const member = memberToUpdate?.member;

  useEffect(() => {
    setValue('email', member?.email);
    setValue('name', member?.name);
    setPhone(member?.phone);
    setValue('height', member?.height);
    setValue('weight', member?.weight);
  }, [memberToUpdate]);

  const handleCreateMember: SubmitHandler<Inputs> = async (data) => {
    try {
      const formattedData: Inputs & { phone: string; id: number } = {
        ...data,
        phone,
        id: member?.id,
      };

      const res = await MembersService.update(formattedData);

      const gymMembers = await GymsService.getMembers(
        user?.gymEmployee?.gym_id as number
      );
      setAllMembers(gymMembers);

      toast({ status: 'success', text: res.message });
      setIsOpen(false);
    } catch (err: any) {
      toast({
        status: 'error',
        text: err?.response?.data?.message || 'Erro ao atualizar usuário',
      });
    }
  };

  return (
    <Modal
      isModalOpen={isOpen}
      handleCloseModal={() => setIsOpen(false)}
      className="max-w-[1400px]"
      title="Atualizar Membro"
    >
      <form
        onSubmit={handleSubmit(handleCreateMember)}
        className="flex flex-col gap-6 overflow-hidden"
      >
        <label className="flex flex-col">
          Nome *
          <input
            className="h-[4.2rem] px-4 rounded-2xl border"
            {...register('name', { required: 'Nome é obrigatório' })}
          />
          <ShowError
            isWrong={!!errors.name}
            message={errors?.name?.message as string}
          />
        </label>

        <label className="flex flex-col">
          Email *
          <input
            className="h-[4.2rem] px-4 rounded-2xl border"
            {...register('email', { required: 'Email é obrigatório' })}
          />
          <ShowError
            isWrong={!!errors.email}
            message={errors?.email?.message as string}
          />
        </label>

        <label className="flex flex-col">
          Celular *
          <input
            type=""
            className="h-[4.2rem] px-4 rounded-2xl border"
            onChange={(e) => setPhone(() => formatPhone(e.target.value))}
            value={phone}
          />
          <ShowError isWrong={!phone} message="Telefone é obrigatório" />
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="flex flex-col">
            Peso (kg) *
            <input
              type="number"
              className="h-[4.2rem] px-4 rounded-2xl border"
              {...register('weight', { required: 'Peso é obrigatório' })}
            />
            <ShowError
              isWrong={!!errors.weight}
              message={errors?.weight?.message as string}
            />
          </label>
          <label className="flex flex-col">
            Altura (cm) *
            <input
              type="number"
              className="h-[4.2rem] px-4 rounded-2xl border"
              {...register('height', { required: 'Altura é obrigatório' })}
            />
            <ShowError
              isWrong={!!errors.height}
              message={errors?.height?.message as string}
            />
          </label>
        </div>

        <Button className="h-[4.2rem]">Atualizar</Button>
      </form>
    </Modal>
  );
};

const ShowError = ({
  isWrong,
  message,
}: {
  isWrong: boolean;
  message: string;
}) =>
  isWrong ? (
    <span className="text-[1.2rem] text-red-500 mt-2">{message}</span>
  ) : null;
