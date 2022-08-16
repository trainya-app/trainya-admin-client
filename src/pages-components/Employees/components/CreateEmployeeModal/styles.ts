import styled from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';

export const Container = styled.div``;

export const Content = styled(Dialog.Content)`
  min-width: 200px;
  height: 100px;
  padding: 32px;
  background: red;
`;

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: 'flex';
  justify-content: center;
  align-items: center;
  background-color: #00000050;
`;
