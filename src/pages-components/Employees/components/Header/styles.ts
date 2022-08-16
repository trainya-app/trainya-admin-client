import styled, { css } from 'styled-components';

export const Container = styled.header`
  display: flex;
  gap: 1.6rem;

  .new-employee-btn {
    height: 4.2rem;
    padding: 0 2.4rem;
  }
`;

export const InputContainer = styled.div<{ isFocused: boolean }>`
  background: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  flex: 1;
  overflow: hidden;

  height: 4.2rem;
  border-radius: ${({ theme }) => theme.radius.sm};

  ${({ isFocused }) =>
    isFocused &&
    css`
      outline: 2px solid ${({ theme }) => theme.colors.blue[500]};
    `}

  label {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 1.6rem;
  }
`;

export const Input = styled.input`
  background: none;
  border: 0;
  flex: 1;
  height: 4.2rem;
  padding: 0 1.6rem;
  outline: 0;

  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray[800]};
`;
