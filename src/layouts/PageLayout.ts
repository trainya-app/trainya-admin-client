import styled from 'styled-components';

export const PageLayout = styled.div`
  display: flex;
  width: auto;
  overflow-x: hidden;
  min-height: 100vh;
  height: 100%;
  background: ${({ theme }) => theme.colors.blue[100]};

  /* div + div {
    flex: 1;
  } */
`;
