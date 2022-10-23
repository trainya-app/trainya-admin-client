import { Button } from 'components/Button';
import { Modal } from 'components/Modal';
import dayjs from 'dayjs';
import { useUser } from 'hooks/useUser';
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import EmployeesService from 'services/EmployeesService';
import GymsService, { GymMember } from 'services/GymsService';
import MembersService from 'services/MembersService';
import formatPhone from 'utils/format-phone';
import { formatCNPJ, formatCPF, formatRG } from 'utils/masks';
import { toast } from 'utils/toast';
import {
  isRGValid,
  isCNPJValid,
  isCNHValid,
  isCPFValid,
} from '../../../../utils/document-validators';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setAllMembers: Dispatch<SetStateAction<GymMember[]>>;
}

interface Inputs {
  name: string;
  weight: number;
  height: number;
  email: string;
  password: string;
  avatarUrl: string;
  birthDate: string;
}

export const CreateMemberModal = ({
  isOpen,
  setIsOpen,
  setAllMembers,
}: Props) => {
  const [phone, setPhone] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { user } = useUser();

  const handleCreateMember: SubmitHandler<Inputs> = async (data) => {
    try {
      const formattedData: Inputs & { gymId: number; phone: string } = {
        ...data,
        birthDate: dayjs(data.birthDate).format('DD/MM/YYYY'),
        gymId: user.gymEmployee.gym_id as number,
        phone,
      };

      const res = await MembersService.store(formattedData);

      const gymMembers = await GymsService.getMembers(
        user?.gymEmployee?.gym_id as number
      );
      setAllMembers(gymMembers);

      toast({ status: 'success', text: res.message });
      setIsOpen(false);
    } catch (err: any) {
      toast({
        status: 'error',
        text: err?.response?.data?.message || 'Erro ao criar usuário',
      });
    }
  };

  return (
    <Modal
      isModalOpen={isOpen}
      handleCloseModal={() => setIsOpen(false)}
      className="max-w-[1400px]"
      title="Cadastrar Membro"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            Senha *
            <input
              type="password"
              className="h-[4.2rem] px-4 rounded-2xl border"
              {...register('password', { required: 'Senha é obrigatório' })}
            />
            <ShowError
              isWrong={!!errors.password}
              message={errors?.password?.message as string}
            />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="flex flex-col">
            Data de nascimento *
            <input
              type="date"
              className="h-[4.2rem] px-4 rounded-2xl border"
              {...register('birthDate', {
                required: 'Data de Nascimento é obrigatório',
              })}
            />
            <ShowError
              isWrong={!!errors.birthDate}
              message={errors?.birthDate?.message as string}
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
        </div>

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

        <label className="flex flex-col">
          URL de imagem de perfil
          <input
            className="h-[4.2rem] px-4 rounded-2xl border"
            {...register('avatarUrl')}
          />
        </label>
        <Button className="h-[4.2rem]">Criar</Button>
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
