import { useState } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import { motion, useAnimation } from 'framer-motion';
import { Container, CloseBtn } from './styles';

import sideBarVariants from '../../framer-motion-variants/sideBar';

export const SideBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  const controls = useAnimation();

  async function handleToggleSidebarVisibility() {
    if (isVisible) {
      // await controls.start({ x: 'calc(-100%)', opacity: 0 });
      // controls.start({ display: 'none' });
      controls.start({ position: 'absolute', left: 'calc(-280px)' });
      setIsVisible(false);
    } else {
      controls.start({ left: 0, position: 'relative' });

      setIsVisible(true);
    }
  }

  return (
    <Container as={motion.div} variants={sideBarVariants} animate={controls}>
      <CloseBtn onClick={handleToggleSidebarVisibility}>
        <FaAngleRight />
      </CloseBtn>
      <p>Side bar</p>
    </Container>
  );
};
