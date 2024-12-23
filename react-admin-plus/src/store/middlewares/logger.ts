const enum CONSOLE_COLOR {
  GRAY = "#999",
  BLUE = "#2e9fff",
  GREEN = "#41b838",
  RED = "#f75757",
}

const consoleStyle = (color: CONSOLE_COLOR) => `color:${color}; font-weight: bold`;

const logger = (config: any, name?: string) => (set: any, get: any, api: any) =>
  config(
    (args: any) => {
      const prefix = name ? `[${name}]` : "  ";
      console.log(
        `%c${prefix}%c  prev state`,
        consoleStyle(CONSOLE_COLOR.RED),
        consoleStyle(CONSOLE_COLOR.GRAY),
        get()
      );
      console.log(`%c${prefix}%c  action  `, consoleStyle(CONSOLE_COLOR.RED), consoleStyle(CONSOLE_COLOR.BLUE), args);
      set(args);
      console.log(
        `%c${prefix}%c  next state`,
        consoleStyle(CONSOLE_COLOR.RED),
        consoleStyle(CONSOLE_COLOR.GREEN),
        get()
      );
    },
    get,
    api
  );

export default logger;
