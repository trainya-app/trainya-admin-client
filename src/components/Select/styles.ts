import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  z-index: 999;

  .dropdown-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    height: 4.2rem;
    background: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.gap.sm};
    border: 0;
    padding: 0 2.4rem;
    color: ${({ theme }) => theme.colors.blue[500]};
    font-weight: 700;
    transition: filter 0.2s;
    box-shadow: 0 0.2rem 0.3rem ${({ theme }) => `${theme.colors.gray[800]}10`};

    &:hover {
      filter: brightness(0.97);
    }

    .icon {
      margin-top: 0.2rem;
      font-size: 1.8rem;
    }
  }

  .dropdown-options {
    background: ${({ theme }) => theme.colors.white};
    position: absolute;
    bottom: 0;
    transform: translateY(calc(100% + 0.8rem));
    box-shadow: 0 0.2rem 0.3rem ${({ theme }) => `${theme.colors.gray[800]}10`};

    flex-direction: column;
    min-width: 20rem;
    max-width: 30rem;
    gap: 0.8rem;
    padding: 0.8rem;
    border-radius: ${({ theme }) => theme.radius.sm};
  }
`;

export const Option = styled.li<{ isActive: boolean }>`
  cursor: pointer;
  padding: 0.6rem;
  border-radius: ${({ theme }) => theme.gap.ssm};
  background: ${({ theme, isActive }) =>
    isActive ? theme.colors.blue[100] : 'transparent'};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray[700]};

  &:first-child {
    color: ${({ theme }) => theme.colors.gray[400]};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.blue[100]};
  }

  &:focus {
    background: ${({ theme }) => theme.colors.blue[100]};
  }
`;
