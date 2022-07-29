import { useTheme } from 'hooks/useTheme';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, Container } from './styles';

export const SideBar = () => {
  const [mounted, setMounted] = useState(false);

  useTheme();

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  // I need to know if the component was mounted to get the document object
  // Next.js has the node server to create page, and this is server side
  // And document only exists in browser

  return mounted
    ? createPortal(
        <Overlay>
          <Container>
            <p>Side bar</p>
          </Container>
        </Overlay>,
        document?.getElementById('modal-root') as any
      )
    : null;
};
