import { useState } from 'react';
import { GrUserSettings } from 'react-icons/gr';
import StockfishOptionsComponent from './StockfishOptions';
import { Modal } from './Modal';

export function Setting() {
  const [showSetting, setShowSetting] = useState(false);
  const toggleSetting = () => {
    setShowSetting(!showSetting);
  };
  return (
    <div className="absolute top-5 right-5 p-1">
      <GrUserSettings onClick={toggleSetting} />

      {showSetting && (
        <Modal onClose={() => setShowSetting(false)}>
          <div className="p-3">
            <StockfishOptionsComponent />
          </div>
        </Modal>
      )}
    </div>
  );
}
