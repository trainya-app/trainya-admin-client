import { MdOutlineGroup } from 'react-icons/md';
import { BsTags } from 'react-icons/bs';
import { HiOutlineUserGroup, HiOutlineBookOpen } from 'react-icons/hi';

export const firstGroup = [
  {
    _id: `Membros ${String(Math.random())}`,
    icon: MdOutlineGroup,
    text: 'Membros',
    path: '/members',
  },
  {
    _id: `Funcionários ${String(Math.random())}`,
    icon: HiOutlineUserGroup,
    text: 'Funcionários',
    path: '/employees',
  },
  {
    _id: `Treino ${String(Math.random())}`,
    icon: HiOutlineBookOpen,
    text: 'Treinos',
    path: '/workouts',
  },
];
