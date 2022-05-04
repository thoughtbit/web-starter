import { h, render } from "vue";
import { nanoid } from "nanoid";
import Modal from "./index.vue";

const createContainer = () => {
  const modalContainer = document.createElement("div");
  modalContainer.className = "modal-container";
  modalContainer.id = nanoid();
  document.body.appendChild(modalContainer);
  return modalContainer;
};

const modal = (dialogVisible: boolean) => {
  const root = createContainer();
  const VNode = h(Modal, {
    modelValue: dialogVisible,
    "onUpdate:modelValue": (value: any) => {
      console.log("---------->", value);
      if (document.body.contains(root)) {
        document.body.removeChild(root);
      }
    },
  });

  render(VNode, root);
};

export { modal };
