import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Modal } from 'components/Modal';
import { useUser } from 'hooks/useUser';
import Image from 'next/image';
import { IMember } from 'pages-components/CreateWorkoutsPlans';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import GymsService, { GymMember } from 'services/GymsService';
import MembersWorkoutPlans from 'services/MembersWorkoutPlans';
import { toast } from 'utils/toast';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title?: string;
  workoutPlanId: number;
}

export const FindMemberModal = ({
  isOpen,
  setIsOpen,
  title,
  workoutPlanId,
}: Props) => {
  const [memberSearch, setMemberSearch] = useState('');
  const [members, setMembers] = useState<GymMember[]>([] as GymMember[]);
  const { user } = useUser();

  useEffect(() => {
    (async () => {
      try {
        const gymMembers = await GymsService.getMembers(
          user.gymEmployee.gym_id as number
        );
        setMembers(gymMembers);
      } catch (err: any) {}
    })();
  }, []);

  function handleCloseModal() {
    setIsOpen(false);
  }

  const handleSearchMember = useCallback((value: string) => {
    setMemberSearch(value);
    // TODO: Search in back-end
  }, []);

  const filteredMembers = members.filter((member) => {
    const objStr = Object.values(member).join('');
    if (objStr.toLowerCase().includes(memberSearch.toLowerCase())) {
      return true;
    }
    return false;
  });

  async function handleSelectUser(member: GymMember) {
    try {
      await MembersWorkoutPlans.store({ memberId: member.id, workoutPlanId });
      toast({
        status: 'success',
        text: `O aluno ${member.member.name} foi inscrito em um plano de treino.`,
      });
      setIsOpen(false);
    } catch (err: any) {
      toast({ status: 'error', text: err?.response?.data?.message });
    }
  }

  return (
    <Modal
      title={title || ''}
      isModalOpen={isOpen}
      handleCloseModal={handleCloseModal}
      className="w-full"
    >
      <div className="flex flex-col p-2 overflow-y-hidden">
        <Input
          placeholder="Digite o nome do usuário"
          value={memberSearch}
          onChange={(e) => handleSearchMember(e.target.value)}
        />
        {filteredMembers.map((gymMember) => (
          <div
            className="flex flex-col mt-8 gap-6 h-full oveflow-y-scroll"
            key={gymMember.id}
          >
            <div className="flex items-center gap-2">
              <div className="img relative w-16 h-16 rounded overflow-hidden mr-4 bg-blue-400" />
              <div>
                <p className="text-gray-900 font-bold">
                  {gymMember.member.name}
                </p>
              </div>
              <Button
                className="ml-auto h-[3.2rem] px-4"
                variant="outlined"
                onClick={() => handleSelectUser(gymMember)}
              >
                Selecionar
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};
