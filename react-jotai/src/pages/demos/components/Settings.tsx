import { useStore } from 'zustand';
import { store } from '@/store';

const Settings = () => {
  const toggleDarkMode = useStore(store, (s) => s.toggleDarkMode);
  const darkTheme = useStore(store, (s) => s.darkMode);

  return (
    <div>
      <h3>User Settings</h3>
      <button onClick={() => toggleDarkMode()}>
        Change to {darkTheme ? "light" : "dark"} theme
      </button>
    </div>
  );
};

export default Settings;
