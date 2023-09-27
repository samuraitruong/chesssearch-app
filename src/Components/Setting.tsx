import { useState } from 'react';
import { GrUserSettings } from 'react-icons/gr';
import StockfishOptionsComponent from './StockfishOptions';
import { Modal } from './Modal';
import ViewerSetting from './ViewerSetting';

export function Setting() {
  const [showSetting, setShowSetting] = useState(false);
  const toggleSetting = () => {
    setShowSetting(!showSetting);
  };
  return (
    <div className="absolute top-5 right-5 p-5">
      <GrUserSettings onClick={toggleSetting} />

      {showSetting && (
        <Modal onClose={() => setShowSetting(false)}>
          <div className="p-3">
            <StockfishOptionsComponent />

            <ViewerSetting />
          </div>
        </Modal>
      )}
    </div>
  );
}
