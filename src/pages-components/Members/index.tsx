/* eslint-disable jsx-a11y/control-has-associated-label */
import { Button } from 'components/Button';
import { useUser } from 'hooks/useUser';
import { MainContent } from 'layouts/MainContent';
import { useState, useEffect, useMemo } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import GymsService, { GymMember } from 'services/GymsService';
import { CreateMemberModal } from './components/CreateMemberModal';
import { DeleteMemberModal } from './components/DeleteMemberModal';
import { Table } from './styles';

interface Member {
  id: number;
  avatar_url: null;
  phone: string;
  name: string;
  birth_date: string;
  weight: string;
  height: string;
  email: string;
  password: string;
  state: string;
  city: string;
  street: string;
  adress_number: string;
  at_gym: false;
  created_at: string;
  updated_at: string;
}

const columns = ['Nome', 'Celular', 'Email'];

export const Members = () => {
  const [allMembers, setAllMembers] = useState<GymMember[]>([]);
  const [search, setSearch] = useState('');

  const [isDeleteMemberModalOpen, setIsDeleteMemberModalOpen] = useState(false);
  const [memberIdToDelete, setMemberIdToDelete] = useState(0);
  const [isCreateMemberModalOpen, setIsCreateMemberModalOpen] = useState(false);

  const { user } = useUser();

  useEffect(() => {
    (async () => {
      const gymMembers = await GymsService.getMembers(
        user?.gymEmployee?.gym_id as number
      );
      setAllMembers(gymMembers);
    })();
  }, [user]);

  function handleOpenDeleteMemberModal(memberId: number) {
    setMemberIdToDelete(memberId);
    setIsDeleteMemberModalOpen(true);
  }

  function handleOpenCreateMemberModal() {
    setIsCreateMemberModalOpen(true);
  }

  const employeesSearched = useMemo(
    () =>
      allMembers.filter((member) =>
        Object.values(member)
          .join('')
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [search, allMembers]
  );

  console.log(employeesSearched);

  return (
    <>
      <MainContent>
        <header className="w-full flex gap-4">
          <input
            placeholder="Busque por um membro da sua academia..."
            className="flex-1 rounded-2xl px-3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            className="h-[4.2rem] px-6"
            onClick={() => handleOpenCreateMemberModal()}
          >
            Adicionar Membro
          </Button>
        </header>

        <section>
          <Table className="mt-12">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column}>
                    <div>{column}</div>
                  </th>
                ))}
                <th />
              </tr>
            </thead>
            <tbody>
              {employeesSearched.map((gymMember) => (
                <tr key={`employeelistitem-${gymMember.id}`}>
                  <td>{gymMember.member.name}</td>
                  <td>{gymMember.member.phone}</td>
                  <td>{gymMember.member.email}</td>
                  <td>
                    <Button
                      variant="danger"
                      className="p-3"
                      onClick={() => handleOpenDeleteMemberModal(gymMember.id)}
                    >
                      <MdDeleteOutline />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </section>
      </MainContent>
      <DeleteMemberModal
        isOpen={isDeleteMemberModalOpen}
        setIsOpen={setIsDeleteMemberModalOpen}
        memberId={memberIdToDelete}
        setMembers={setAllMembers}
      />
      <CreateMemberModal
        isOpen={isCreateMemberModalOpen}
        setIsOpen={setIsCreateMemberModalOpen}
        setAllMembers={setAllMembers}
      />
    </>
  );
};
