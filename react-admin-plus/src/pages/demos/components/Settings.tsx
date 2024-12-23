import { useZustand } from '@/utils/zustand';
import { store } from '@/store';

const Settings = () => {
  
  const toggleDarkMode = useZustand(store, (s) => s.toggleDarkMode);
  const darkTheme = useZustand(store, (s) => s.darkMode);

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
