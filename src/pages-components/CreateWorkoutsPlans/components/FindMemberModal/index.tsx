import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Modal } from 'components/Modal';
import Image from 'next/image';
import { IMember } from 'pages-components/CreateWorkoutsPlans';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title?: string;
  setSelectedMember: Dispatch<SetStateAction<IMember>>;
}

const MOCK_MEMBERS = [
  {
    id: 1,
    name: 'Jul Martins',
    profileImage: 'https://github.com/bryanmaraujo544.png',
    document: {
      name: 'RG',
      value: '544709834',
    },
  },
  {
    id: 2,
    name: 'Bryan Martins',
    profileImage: 'https://github.com/bryanmaraujo544.png',
    document: {
      name: 'RG',
      value: '544709834',
    },
  },
  {
    id: 3,
    name: 'Bryan Martins',
    profileImage: 'https://github.com/bryanmaraujo544.png',
    document: {
      name: 'RG',
      value: '544709834',
    },
  },
  {
    id: 4,
    name: 'Bryan Martins',
    profileImage: 'https://github.com/bryanmaraujo544.png',
    document: {
      name: 'RG',
      value: '544709834',
    },
  },
  {
    id: 5,
    name: 'Bryan Martins',
    profileImage: 'https://github.com/bryanmaraujo544.png',
    document: {
      name: 'RG',
      value: '544709834',
    },
  },
  {
    id: 6,
    name: 'Bryan Martins',
    profileImage: 'https://github.com/bryanmaraujo544.png',
    document: {
      name: 'RG',
      value: '544709834',
    },
  },
  {
    id: 36,
    name: 'Bryan Martins',
    profileImage: 'https://github.com/bryanmaraujo544.png',
    document: {
      name: 'RG',
      value: '544709834',
    },
  },
  {
    id: 7,
    name: 'Bryan Martins',
    profileImage: 'https://github.com/bryanmaraujo544.png',
    document: {
      name: 'RG',
      value: '544709834',
    },
  },
];

export const FindMemberModal = ({
  isOpen,
  setIsOpen,
  title,
  setSelectedMember,
}: Props) => {
  const [memberSearch, setMemberSearch] = useState('');
  const [members, setMembers] = useState<IMember[]>([] as IMember[]);

  useEffect(() => {
    setMembers(MOCK_MEMBERS);
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

  function handleSelectUser(member: IMember) {
    setSelectedMember(member);
    setIsOpen(false);
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
        {filteredMembers.map((member) => (
          <div
            className="flex flex-col mt-8 gap-6 h-full oveflow-y-scroll"
            key={member.id}
          >
            <div className="flex items-center gap-2">
              <div className="img relative w-16 h-16 rounded overflow-hidden mr-4">
                <Image src={member.profileImage} layout="fill" alt="profile" />
              </div>
              <div>
                <p className="text-gray-900 font-bold">{member.name}</p>
                <p className="text-gray-600 text-2xl">
                  {member.document.name}: {member.document.value}
                </p>
              </div>
              <Button
                className="ml-auto h-[3.2rem] px-4"
                variant="outlined"
                onClick={() => handleSelectUser(member)}
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
