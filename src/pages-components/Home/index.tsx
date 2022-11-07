import { Button } from 'components/Button';
import { useUser } from 'hooks/useUser';
import { MainContent } from 'layouts/MainContent';
import { useEffect, useState } from 'react';
import { MdOutlinePeopleAlt } from 'react-icons/md';
import { serverApi } from 'services/serverApi';
import { toast } from 'utils/toast';
import { ScanQrCode } from './components/QrCode';

interface Gym {
  city: string;
  created_at: string;
  current_capacity: number;
  email: string;
  gymEmployee: number;
  gymMember: number;
  id: number;
  max_capacity: number;
  name: string;
  state: string;
}

export const Home = () => {
  const [isScanOpen, setIsScanOpen] = useState(false);
  const [gym, setGym] = useState<Gym>({} as Gym);

  function handleOpenScan() {
    setIsScanOpen(true);
  }

  const { user } = useUser();

  useEffect(() => {
    (async () => {
      try {
        if (user?.gymEmployee?.gym_id) {
          const { data } = await serverApi.get(
            `/gyms/${user?.gymEmployee?.gym_id}`
          );
          setGym(data.gym);
        }
      } catch (err) {
        toast({
          status: 'error',
          text: 'Erro ao carregar informações da academia',
        });
      }
    })();
  }, [user]);

  if (!gym) {
    return <h1>.</h1>;
  }

  return (
    <>
      <MainContent>
        <header className="flex justify-between items-center mb-10">
          <p className="text-3xl text-blue-500 font-bold ">
            Academia: {user?.gymEmployee?.gym?.name}
          </p>
          <Button className="h-[4.2rem] px-8" onClick={() => handleOpenScan()}>
            Entrada/Saída do membro
          </Button>
        </header>

        <section className="bg-white rounded-2xl border p-8 flex flex-col gap-4">
          <h1 className="text-4xl text-gray-600 font-bold">{user.name}</h1>
          <h2 className="text-gray-500">{user.email}</h2>
        </section>

        <section className="grid grid-cols-3 gap-6 mt-6">
          <div className="bg-white rounded-2xl border p-8 flex flex-col justify-center items-center gap-8">
            <p className="text-3xl text-gray-500 font-bold">
              Agora na academia
            </p>
            <div className="flex gap-10 items-center">
              <div className="flex flex-col items-center text-4xl text-blue-500">
                <b>{gym.current_capacity}</b>
                <small>Pessoas</small>
              </div>
              <div className="flex flex-col items-center text-4xl text-gray-500">
                <b>{gym.max_capacity}</b>
                <small>Máximo</small>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border p-8 flex flex-col justify-center items-center gap-8">
            <p className="text-3xl text-gray-500 font-bold">
              Funcionários ativos
            </p>
            <div className="flex gap-10 items-center">
              <div className="flex flex-col items-center text-4xl text-blue-500">
                <b>{gym.gymEmployee}</b>
                <small>Funcionários</small>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border p-8 flex flex-col justify-center items-center gap-8">
            <p className="text-3xl text-gray-500 font-bold">Alunos ativos</p>
            <div className="flex gap-10 items-center">
              <div className="flex flex-col items-center text-4xl text-blue-500">
                <b>{gym.gymMember}</b>
                <small>Alunos</small>
              </div>
            </div>
          </div>
        </section>
      </MainContent>
      {isScanOpen && (
        <ScanQrCode
          isOpen={isScanOpen}
          setIsOpen={setIsScanOpen}
          setGym={setGym}
        />
      )}
    </>
  );
};
