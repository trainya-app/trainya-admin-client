import { MainContent } from 'layouts/MainContent';
import styled from 'styled-components';

export const Container = styled(MainContent)``;

export const NavButtons = styled.div`
  display: flex;
  margin-top: 3.2rem;
  gap: 1.6rem;
  justify-content: flex-start;
`;

export const Dropdown = styled.div`
  position: relative;

  .dropdown-btn {
    height: 4.2rem;
    background: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.gap.sm};
    border: 0;
    width: 12.5rem;
    color: ${({ theme }) => theme.colors.blue[500]};
    font-weight: 700;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.97);
    }
  }

  .dropdown-options {
    background: ${({ theme }) => theme.colors.white};
    position: absolute;
    bottom: 0;
    transform: translateY(calc(100% + 0.8rem));

    flex-direction: column;
    width: 20rem;
    gap: 0.8rem;
    padding: 0.8rem;
    border-radius: ${({ theme }) => theme.radius.sm};

    li {
      cursor: pointer;
      padding: 0.4rem;
      border-radius: ${({ theme }) => theme.gap.ssm};
      &:hover {
        background: ${({ theme }) => theme.colors.blue[100]};
      }
    }
  }
`;
