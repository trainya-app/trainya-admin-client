// import { useCallback, useState } from 'react';
import { useState } from 'react';

import { FaAngleRight } from 'react-icons/fa';
import { motion, useAnimation } from 'framer-motion';
import { useRouter } from 'next/router';
import { Button } from 'components/Button';
import { useUser } from 'hooks/useUser';
import { Logo } from '../Logo';
import { Container, CloseBtn, Content, MenuBtn } from './styles';

import { firstGroup } from './data';

export const SideBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  const controls = useAnimation();
  const router = useRouter();

  const { handleLogout } = useUser();

  async function handleToggleSidebarVisibility() {
    if (isVisible) {
      controls.start({ position: 'absolute', left: 'calc(-280px)' });
      setIsVisible(false);
    } else {
      controls.start({ left: 0, position: 'relative' });

      setIsVisible(true);
    }
  }

  const handleNavigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <Container as={motion.div} animate={controls} data-testid="sidebar">
      <CloseBtn onClick={handleToggleSidebarVisibility}>
        <FaAngleRight />
      </CloseBtn>
      <Logo />
      <Content>
        <ul className="menu-group h-full">
          {firstGroup.map(({ _id, icon: Icon, text, path }) => (
            <MenuBtn
              type="button"
              key={_id}
              onClick={() => handleNavigateTo(path as string)}
              isActive={router?.asPath === path}
            >
              <Icon className="icon" />
              <span>{text}</span>
            </MenuBtn>
          ))}
          <Button
            className="mt-auto h-[3.6rem]"
            variant="danger"
            onClick={() => handleLogout()}
          >
            Sair
          </Button>
        </ul>
      </Content>
    </Container>
  );
};
