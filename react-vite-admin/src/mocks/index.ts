export const initMocks = () => {
  const modules = import.meta.globEager("./browser.ts");
  const { worker } = modules["./browser.ts"];

  worker.start();
};
