import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  height: 100vh;
  width: 100%;
  background: #00000040;
`;

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.blue[300]};
`;
