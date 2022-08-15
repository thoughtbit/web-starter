import { useTheme } from "./hooks";

function isChecked(colorScheme: string): boolean {
  return colorScheme === "light";
}

const Demo2 = () => {
  const [theme, handleChange] = useTheme();
  return (
    <div>
      <label htmlFor="theme-switch">
        <input
          checked={isChecked(theme)}
          id="theme-switch"
          name="theme-switch"
          onChange={handleChange}
          type="checkbox"
        />
        {theme === "light" ? (<span>亮</span>) : (<span>暗</span>)}
      </label>
    </div>
  );
};

export default Demo2;
