import { Button } from 'components/Button';
import { Modal } from 'components/Modal';
import dayjs from 'dayjs';
import { useUser } from 'hooks/useUser';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import EmployeesService from 'services/EmployeesService';
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
}

interface Inputs {
  name: string;
  birthDate: string;
  email: string;
  password: string;
  wage?: number;
  paymentDate?: string;
  profileImg?: string;
  documentType: 'RG' | 'CPF';
  roleName: string;
}

export const CreateEmployeeModal = ({ isOpen, setIsOpen }: Props) => {
  const [documentValue, setDocumentValue] = useState('');

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { user } = useUser();

  const handleCreateEmployee: SubmitHandler<Inputs> = async (data) => {
    try {
      switch (data.documentType) {
        case 'RG': {
          if (!isRGValid(documentValue)) {
            toast({
              status: 'error',
              text: 'Documento de RG inválido. ',
            });
            return;
          }
          break;
        }
        case 'CPF': {
          if (!isCPFValid(documentValue)) {
            toast({
              status: 'error',
              text: 'Documento de CPF inválido. ',
            });
            return;
          }
          break;
        }
        default: {
          throw new Error('Documento não encontrado.');
        }
      }
      const formattedData: Inputs & { documentValue: string; gymId: number } = {
        ...data,
        birthDate: dayjs(data.birthDate).format('DD/MM/YYYY'),
        documentValue: documentValue.replace(/\W/g, ''),
        gymId: user.gymEmployee.gym_id as number,
      };

      const res = await EmployeesService.store(formattedData);
      toast({ status: 'success', text: res.message });
      setIsOpen(false);
    } catch (err: any) {
      toast({ status: 'error', text: err?.response?.data?.message });
    }
  };

  function handleChangeDocumentValue(value: string) {
    const docType: 'RG' | 'CPF' = watch('documentType');

    switch (docType) {
      case 'RG': {
        setDocumentValue(formatRG(value));
        break;
      }
      case 'CPF': {
        setDocumentValue(formatCPF(value));
        break;
      }
      default: {
        throw new Error('Documento não encontrado.');
      }
    }
  }

  return (
    <Modal
      isModalOpen={isOpen}
      handleCloseModal={() => setIsOpen(false)}
      className="max-w-[800px]"
      title="Cadastrar funcionário"
    >
      <form
        onSubmit={handleSubmit(handleCreateEmployee)}
        className="flex flex-col gap-6 overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <div className="flex flex-col w-100 h-100">
            Cargo
            <select
              {...register('roleName')}
              className="border rounded-2xl flex-1"
            >
              <option value="Admin">Admin</option>
              <option value="Instrutor">Instrutor</option>
              <option value="Faxineiro">Faxineiro</option>
              <option value="Professor">Professor</option>
              <option value="Recepcionista">Recepcionista</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <select {...register('documentType')} className="border rounded-2xl">
            <option value="RG">RG</option>
            <option value="CPF">CPF</option>
          </select>
          <input
            className="h-[4.2rem] px-4 rounded-2xl border"
            placeholder="N° Documento *"
            value={documentValue}
            onChange={(e) => handleChangeDocumentValue(e.target.value)}
          />
        </div>

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
          Salário
          <input
            type="number"
            className="h-[4.2rem] px-4 rounded-2xl border"
            {...register('wage')}
          />
        </label>

        <label className="flex flex-col">
          URL de imagem de perfil
          <input
            className="h-[4.2rem] px-4 rounded-2xl border"
            {...register('profileImg')}
          />
        </label>
        {/** some inputs */}
        <Button className="h-[4.2rem]">Submit</Button>
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
