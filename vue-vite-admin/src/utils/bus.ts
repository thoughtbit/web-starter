import mitt from "mitt";

const emitter = mitt();
export const bus = {
  on: emitter.on,
  off: emitter.off,
  emit: emitter.emit,
};
