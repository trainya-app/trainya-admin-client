import { MdOutlineGroup } from 'react-icons/md';
import { HiOutlineUserGroup, HiOutlineBookOpen } from 'react-icons/hi';
import { AiOutlineHome } from 'react-icons/ai';

export const firstGroup = [
  {
    _id: `Home ${String(Math.random())}`,
    icon: AiOutlineHome,
    text: 'Home',
    path: '/',
  },
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
