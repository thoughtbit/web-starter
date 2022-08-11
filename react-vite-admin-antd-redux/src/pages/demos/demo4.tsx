import { useCallback } from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import UserInfoModal from "./components/UserInfoModal";

// NiceModal.register("user-info-modal", UserInfoModal);

export default function Demo4() {
  const modal = useModal(UserInfoModal);
  const showAntdModal = useCallback(() => {
    // Show a modal with arguments passed to the component as props
    // NiceModal.show("user-info-modal", { name: "Nate" });
    modal.show({ name: "Nate" }).then((newValue) => {
      console.log("newValue:", newValue)
    });
  }, [modal]);

  return (
    <div className="app">
      <h1>Nice Modal Examples</h1>
      <div className="demo-buttons">
        <button onClick={showAntdModal}>Antd Modal</button>
      </div>
    </div>
  );
}
