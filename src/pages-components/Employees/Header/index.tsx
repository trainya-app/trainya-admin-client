import { Button } from 'components/Button';
import { useCallback, useState } from 'react';
import { BsSearch } from 'react-icons/bs';

import { Container, InputContainer, Input } from './styles';

export const Header = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleOpenAddNewEmployeeModal = useCallback(() => {
    // Open modal
  }, []);

  const handleSearchEmployees = useCallback((search: string) => {
    console.log(search);
  }, []);

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
          onChange={(e) => handleSearchEmployees(e.target.value)}
        />
      </InputContainer>
      <Button
        type="button"
        onClick={() => handleOpenAddNewEmployeeModal()}
        className="new-employee-btn"
      >
        Novo Funcionário
      </Button>
    </Container>
  );
};
