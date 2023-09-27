import { useState, useEffect } from 'react';

type Settings = {
  isMute?: boolean;
  delay?: 1000;
} & Record<string, string | number | boolean>;

const useSetting = (
  initialSettings: Settings = { isMute: false, delay: 1000 }
) => {
  // Get the settings from local storage and merge them with initialSettings
  const storedSettings = JSON.parse(
    localStorage.getItem('settings') || '{}'
  ) as Settings;
  const mergedSettings = { ...initialSettings, ...storedSettings };

  const [settings, setSettings] = useState<Settings>(mergedSettings);

  // Update local storage whenever settings change
  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  // Function to set the whole settings object
  const setAllSettings = (newSettings: Settings) => {
    setSettings(newSettings);
  };

  // Function to set an individual setting
  const setSetting = (
    key: 'isMute' | 'delay',
    value: string | number | boolean
  ) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [key]: value,
    }));
  };

  return { settings, setAllSettings, setSetting };
};

export default useSetting;
