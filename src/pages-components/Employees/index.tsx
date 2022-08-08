/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { useState } from 'react';
import { Select } from 'components/Select';
import { FaSort } from 'react-icons/fa';

import { Header } from './Header';
import { Container, NavButtons } from './styles';
import { EmployeesTable } from './EmployeesTable';

// const filterList = [
//   'Filtrar',
//   'Option 1',
//   'Option 2',
//   'Option 3',
//   'Option 4',
//   'Option 5',
// ];

const sortList = [
  'Ordenar',
  'Nome',
  'Cargo',
  'Telefone',
  'Salário',
  'Data de Pag.',
];

export const Employees = () => {
  // const [isFilterSelectOpen, setIsFilterSelectOpen] = useState(false);
  // const [filterSelected, setFilterSelected] = useState(0);

  const [isSortSelectOpen, setIsSortSelectOpen] = useState(false);
  const [sortColumnSelected, setSortColumnSelected] = useState(0);

  const sort = sortList[sortColumnSelected];

  return (
    <Container>
      <Header />
      <NavButtons>
        {/* <Select
          options={filterList}
          setIsOpen={setIsFilterSelectOpen}
          isOpen={isFilterSelectOpen}
          setSelectedOption={setFilterSelected}
          btnIcon={AiFillFilter}
          selectedOption={filterSelected}
        /> */}
        <Select
          options={sortList}
          setIsOpen={setIsSortSelectOpen}
          isOpen={isSortSelectOpen}
          selectedOption={sortColumnSelected}
          setSelectedOption={setSortColumnSelected}
          btnIcon={FaSort}
        />
      </NavButtons>
      <EmployeesTable />
    </Container>
  );
};
