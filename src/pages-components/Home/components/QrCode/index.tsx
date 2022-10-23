import { Modal } from 'components/Modal';
import dayjs from 'dayjs';
import { useUser } from 'hooks/useUser';
import { useState, Dispatch, SetStateAction } from 'react';
import QrReader from 'react-qr-reader';
import { serverApi } from 'services/serverApi';
import { toast } from 'utils/toast';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const ScanQrCode = ({ isOpen, setIsOpen }: Props) => {
  const [code, setCode] = useState(null);
  const [isReading, setIsReading] = useState(false);

  const { user } = useUser();

  const month = dayjs().month();
  async function handleScan(userId: string | any) {
    try {
      if (!userId) return;
      if (isReading) return;

      setIsReading(true);

      const {
        data: { exists },
      } = await serverApi.get(
        `/gymMembers/${user.gymEmployee.gym_id}/?userId=${userId}&verifyMember=true`
      );

      if (!exists) {
        toast({
          status: 'error',
          text: 'O membro não pertence a esta academia.',
        });
        return;
      }

      const { data } = await serverApi.put(
        `/gyms/capacity/${user?.gymEmployee?.gym_id}/${userId}/${month + 1}`
      );
      console.log(data);

      toast({ status: 'success', text: data?.message });
      setIsReading(false);
      handleCloseModal();
    } catch (err: any) {
      setIsReading(false);
      toast({ status: 'error', text: 'Erro ao lert QrCode' });
    }
  }

  function handleError(err: any) {
    console.log(err);
  }

  function handleCloseModal() {
    setIsOpen(false);
  }

  return (
    <Modal
      isModalOpen={isOpen}
      handleCloseModal={() => handleCloseModal()}
      className="max-w-[500px]"
      title="Aproxime o QR Code do aluno"
    >
      <div className="flex justify-center w-full bg-blue-400">
        <QrReader
          onScan={handleScan}
          onError={handleError}
          // chooseDeviceId={()=>selected}
          style={{ width: '100%' }}
        />
      </div>
    </Modal>
  );
};
