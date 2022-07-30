import {
  MdSpaceDashboard,
  MdOutlineInventory2,
  MdOutlineGroup,
} from 'react-icons/md';
import { IoStatsChart } from 'react-icons/io5';
import { IoMdHelpCircleOutline } from 'react-icons/io';
import { BiTask } from 'react-icons/bi';
import { BsTags } from 'react-icons/bs';
import { HiOutlineUserGroup, HiOutlineBookOpen } from 'react-icons/hi';
import { RiSettingsLine } from 'react-icons/ri';

export const firstGroup = [
  {
    _id: `Dashboard ${String(Math.random())}`,
    icon: MdSpaceDashboard,
    text: 'Dashboard',
    path: '/dashboard',
  },
  {
    _id: `Estatísticas ${String(Math.random())}`,
    icon: IoStatsChart,
    text: 'Estatísticas',
    path: '/stats',
  },
  {
    _id: `Quadro de tarefas ${String(Math.random())}`,
    icon: BiTask,
    text: 'Quadro de tarefas',
    path: '/tasks',
  },
  {
    _id: `Estoque ${String(Math.random())}`,
    icon: MdOutlineInventory2,
    text: 'Estoque',
    path: '/stock',
  },
];

export const secondGroup = [
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
    _id: `Planos de treino ${String(Math.random())}`,
    icon: HiOutlineBookOpen,
    text: 'Planos de treino',
    path: '/workouts',
  },
  {
    _id: `Assinaturas ${String(Math.random())}`,
    icon: BsTags,
    text: 'Assinaturas',
    path: '/subscriptions',
  },
];

export const thirdGroup = [
  {
    _id: `Configurações ${String(Math.random())}`,
    icon: RiSettingsLine,
    text: 'Configurações',
    path: '/settings',
  },
  {
    _id: `Ajuda ${String(Math.random())}`,
    icon: IoMdHelpCircleOutline,
    text: 'Ajuda',
    path: '/help',
  },
];
