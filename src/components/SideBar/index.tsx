import { useCallback, useState } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import { motion, useAnimation } from 'framer-motion';
import { Logo } from 'components/Logo';
import { useRouter } from 'next/router';
import { Container, CloseBtn, Content, MenuBtn } from './styles';

import { firstGroup, secondGroup, thirdGroup } from './data';

export const SideBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  const controls = useAnimation();
  const router = useRouter();

  async function handleToggleSidebarVisibility() {
    if (isVisible) {
      controls.start({ position: 'absolute', left: 'calc(-280px)' });
      setIsVisible(false);
    } else {
      controls.start({ left: 0, position: 'relative' });

      setIsVisible(true);
    }
  }

  const handleNavigateTo = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router]
  );

  return (
    <Container as={motion.div} animate={controls}>
      <CloseBtn onClick={handleToggleSidebarVisibility}>
        <FaAngleRight />
      </CloseBtn>
      <Logo />
      <Content>
        <ul className="menu-group">
          {firstGroup.map(({ _id, icon: Icon, text, path }) => (
            <MenuBtn
              type="button"
              key={_id}
              onClick={() => handleNavigateTo(path as string)}
              isActive={router.asPath === path}
            >
              <Icon className="icon" />
              <span>{text}</span>
            </MenuBtn>
          ))}
        </ul>

        <ul className="menu-group">
          {secondGroup.map(({ _id, icon: Icon, text, path }) => (
            <MenuBtn
              type="button"
              key={_id}
              onClick={() => handleNavigateTo(path as string)}
              isActive={router.asPath === path}
            >
              <Icon className="icon" />
              <span>{text}</span>
            </MenuBtn>
          ))}
        </ul>

        <hr />

        <ul className="menu-group">
          {thirdGroup.map(({ _id, icon: Icon, text, path }) => (
            <MenuBtn
              type="button"
              key={_id}
              onClick={() => handleNavigateTo(path as string)}
              isActive={router.asPath === path}
            >
              <Icon className="icon" />
              <span>{text}</span>
            </MenuBtn>
          ))}
        </ul>
      </Content>
    </Container>
  );
};
