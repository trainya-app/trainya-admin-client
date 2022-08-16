import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { Container, Content, Overlay } from './styles';

export const CreateEmployeeModal = () => {
  console.log('CreateEmployeeModal');
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger />
      <Dialog.Portal>
        <Overlay>
          <Content>
            <form onSubmit={() => console.log('SUBMIT')}>
              {/** some inputs */}
              <button type="submit">Submit</button>
            </form>
          </Content>
        </Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
