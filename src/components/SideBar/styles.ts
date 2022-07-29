import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.gap.md};
  width: 280px;
  height: 100vh;
`;

export const CloseBtn = styled.button`
  position: absolute;
  background: ${({ theme }) => theme.colors.white};

  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  border-left: 0;
  border-radius: 0px 8px 8px 0;
  top: 50%;
  right: -1.5rem;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.6rem;
  padding: 1.2rem 0rem;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.blue[900]};
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.blue[600]};
  }

  &::before {
    content: '';
    position: absolute;
    width: 1rem;
    height: 1.2rem;
    background: transparent;
    top: 0;
    transform: translateY(-100%);
    left: 0;

    border-radius: 0 0 0 2.5rem;
    box-shadow: 0 5px 0 0 ${({ theme }) => theme.colors.white};
  }

  &::after {
    content: '';
    position: absolute;
    width: 1rem;
    height: 1.2rem;
    background: transparent;
    bottom: 0;
    left: 0;
    transform: translateY(100%);

    border-radius: 2.5rem 0 0 0;
    box-shadow: 0 -5px 0 0 ${({ theme }) => theme.colors.white};
  }
`;
