/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import { useClickOutside } from 'hooks/useClickOutside';
import { Dispatch, SetStateAction } from 'react';
import { Container, Option } from './styles';

interface SelectProps {
  options: any[];
  btnIcon?: any;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedOption: Dispatch<SetStateAction<number>>;
  selectedOption: number;
}

export const Select = ({
  options,
  btnIcon: BtnIcon,
  isOpen,
  setIsOpen,
  setSelectedOption,
  selectedOption,
}: SelectProps) => {
  // Event handler for keydowns
  const handleKeyDown = (index: number) => (e: any) => {
    switch (e.key) {
      case ' ':
      case 'SpaceBar':
      case 'Enter':
        e.preventDefault();
        setSelectedOption(index);
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const filterRef = useClickOutside(() => {
    setIsOpen(false);
  });

  return (
    <Container>
      <button
        type="button"
        className="dropdown-btn"
        aria-haspopup="listbox"
        onClick={() => setIsOpen(true)}
      >
        {options[selectedOption]}
        {BtnIcon && <BtnIcon className="icon" />}
      </button>
      <ul
        className="dropdown-options"
        role="listbox"
        style={{
          display: isOpen ? 'flex' : 'none',
        }}
        ref={filterRef}
        tabIndex={-1}
      >
        {options.map((option, index) => (
          <Option
            key={option}
            onKeyDown={handleKeyDown(index)}
            onClick={() => {
              setSelectedOption(index);
              setIsOpen(false);
            }}
            role="listbox"
            className="dropdown-option"
            tabIndex={0}
            isActive={index + 1 === selectedOption}
          >
            {option}
          </Option>
        ))}
      </ul>
    </Container>
  );
};
