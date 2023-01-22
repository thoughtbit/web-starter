import { useStore } from "@/store";


const Settings = () => {
  const toggleDarkMode = useStore((state) => state.toggleDarkMode);
  const darkTheme = useStore((state) => state.darkMode);

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
