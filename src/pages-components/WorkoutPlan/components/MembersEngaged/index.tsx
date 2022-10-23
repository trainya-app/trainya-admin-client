import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { SubTitle } from 'pages-components/Employees/components/SubTitle';
import { useState } from 'react';
import { GymMember } from 'services/GymsService';

export const MembersEngaged = ({ members }: { members: any }) => {
  const [memberSearch, setMemberSearch] = useState('');

  function handleSeeMember(member: any) {
    console.log(member);
  }

  const filteredMembers = members?.filter((member: any) =>
    JSON.stringify(member)
      .toLowerCase()
      .includes(memberSearch.toLowerCase().trim())
  );

  return (
    <div className="flex flex-col p-2 overflow-y-hidden">
      <SubTitle className="mb-6">
        Alunos registrados ao plano de treino
      </SubTitle>
      <Input
        placeholder="Digite o nome do usuário"
        value={memberSearch}
        onChange={(e) => setMemberSearch(e.target.value)}
      />
      {filteredMembers?.map((gymMember: GymMember) => (
        <div
          className="flex flex-col mt-8 gap-6 h-full oveflow-y-scroll"
          key={gymMember.id}
        >
          <div className="flex items-center gap-2">
            <div className="img relative w-16 h-16 rounded overflow-hidden mr-4 bg-blue-400" />
            <div>
              <p className="text-gray-900 font-bold">{gymMember.member.name}</p>
            </div>
            <Button
              className="ml-auto h-[3.2rem] px-4"
              variant="outlined"
              onClick={() => handleSeeMember(gymMember)}
            >
              Selecionar
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
