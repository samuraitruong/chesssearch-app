import useSetting from '../Hooks/useSettings';

export const ViewerSetting = () => {
  const { settings, setSetting } = useSetting({
    isMute: false,
    delay: 1000,
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    const newValue = name === 'isMute' ? e.target.checked : value;
    setSetting(name, newValue);
  };

  return (
    <div className="bg-white p-2 rounded shadow lg:min-w-3/4 min-w-[300px] w-full mt-2">
      <h2 className="text-xl font-semibold mb-4">View settings</h2>
      <div className="mb-4">
        <label htmlFor="isMute" className="block text-gray-600 font-semibold">
          Is Mute:
        </label>
        <input
          type="checkbox"
          id="isMute"
          name="isMute"
          checked={settings.isMute}
          onChange={handleInputChange}
          className="mt-1 text-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="delay" className="block text-gray-600 font-semibold">
          Delay (ms):
        </label>
        <input
          type="number"
          id="delay"
          name="delay"
          value={settings.delay}
          onChange={handleInputChange}
          className="mt-1 p-1 text-blue-500"
        />
      </div>
    </div>
  );
};

export default ViewerSetting;
