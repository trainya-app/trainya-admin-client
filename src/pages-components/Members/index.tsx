/* eslint-disable jsx-a11y/control-has-associated-label */
import { Button } from 'components/Button';
import { useUser } from 'hooks/useUser';
import { MainContent } from 'layouts/MainContent';
import { useState, useEffect, useMemo } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import GymsService, { GymMember } from 'services/GymsService';
import { CgOptions } from 'react-icons/cg';
import { CreateMemberModal } from './components/CreateMemberModal';
import { DeleteMemberModal } from './components/DeleteMemberModal';
import { UpdateMemberModal } from './components/UpdateMemberModal';
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

  const [isUpdateMemberModalOpen, setIsUpdateMemberModalOpen] = useState(false);
  const [memberToUpdate, setMemberToUpdate] = useState<GymMember>(
    {} as GymMember
  );

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

  function handleOpenUpdateMemberModal(gymMember: GymMember) {
    setMemberToUpdate(gymMember);
    setIsUpdateMemberModalOpen(true);
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
                  <td className="flex gap-2">
                    <Button
                      variant="danger"
                      className="p-3"
                      onClick={() => handleOpenDeleteMemberModal(gymMember.id)}
                    >
                      <MdDeleteOutline />
                    </Button>
                    <Button
                      variant="white"
                      className="p-3"
                      onClick={() => handleOpenUpdateMemberModal(gymMember)}
                    >
                      <CgOptions />
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
      <UpdateMemberModal
        isOpen={isUpdateMemberModalOpen}
        setIsOpen={setIsUpdateMemberModalOpen}
        memberToUpdate={memberToUpdate}
        setAllMembers={setAllMembers}
      />
    </>
  );
};
