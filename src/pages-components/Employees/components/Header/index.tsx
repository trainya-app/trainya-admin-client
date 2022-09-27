import { Button } from 'components/Button';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { BsSearch } from 'react-icons/bs';

import { Container, InputContainer, Input } from './styles';

interface HeaderProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  handleOpenCreateEmployeeModal: () => void;
}

export const Header = ({
  search,
  setSearch,
  handleOpenCreateEmployeeModal,
}: HeaderProps) => {
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <Container>
      <InputContainer isFocused={isInputFocused}>
        {!isInputFocused && (
          <label htmlFor="search-input">
            <BsSearch />
          </label>
        )}
        <Input
          placeholder="Busque por nome, documento, etc..."
          id="search-input"
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputContainer>
      <Button
        type="button"
        onClick={() => handleOpenCreateEmployeeModal()}
        className="new-employee-btn"
      >
        Novo Funcionário
      </Button>
    </Container>
  );
};
