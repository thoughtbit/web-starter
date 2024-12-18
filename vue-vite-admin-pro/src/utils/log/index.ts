import { Log } from "./types";

const logSet = new Set();

const log: Log = {
  warn(componentName, message): void {
    console.warn(`App ${componentName} Warn: ${message}`);
  },
  warnOnce(componentName, message): void {
    const msgContent = `App ${componentName} Warn: ${message}`;
    if (logSet.has(msgContent)) return;
    logSet.add(msgContent);
    console.warn(msgContent);
  },
  error(componentName, message): void {
    console.error(`App ${componentName} Error: ${message}`);
  },
  errorOnce(componentName, message): void {
    const msgContent = `App ${componentName} Error: ${message}`;
    if (logSet.has(msgContent)) return;
    logSet.add(msgContent);
    console.error(msgContent);
  },
  info(componentName, message): void {
    console.info(`App ${componentName} Info: ${message}`);
  },
};

export default log;
