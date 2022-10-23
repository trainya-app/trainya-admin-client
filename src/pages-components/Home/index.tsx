import { Button } from 'components/Button';
import { MainContent } from 'layouts/MainContent';
import { useState } from 'react';
import { ScanQrCode } from './components/QrCode';

export const Home = () => {
  const [isScanOpen, setIsScanOpen] = useState(false);
  function handleOpenScan() {
    setIsScanOpen(true);
  }

  return (
    <MainContent>
      <Button className="h-[4.8rem] px-10" onClick={() => handleOpenScan()}>
        Entrada/Saída do membro
      </Button>
      {isScanOpen && (
        <ScanQrCode isOpen={isScanOpen} setIsOpen={setIsScanOpen} />
      )}
    </MainContent>
  );
};
