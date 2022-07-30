import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.gap.l};
  width: 280px;
  height: 100vh;
  display: flex;
  flex-direction: column;
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
  z-index: 10;
  overflow: visible;

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

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap['3xl']};
  margin-top: ${({ theme }) => theme.gap['2xl']};
  height: 100%;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 0.6rem;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.gray[300]};
    border-radius: 99rem;
    &:hover {
      background: ${({ theme }) => theme.colors.gray[400]};
    }
  }

  .menu-group {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.gap.l};
  }

  hr {
    margin-right: 1.6rem;
    background: ${({ theme }) => theme.colors.gray[200]};
    border-color: ${({ theme }) => theme.colors.gray[100]};
  }
`;

export const MenuBtn = styled.button<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.gap.sm};
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.blue[500] : theme.colors.gray[500]};
  cursor: pointer;
  background: none;
  border: 0;

  .icon {
    font-size: 2rem;
  }

  span {
    font-weight: 700;
  }
`;
