import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Modal, { ModalProps } from "./Modal";
import ModalContainer from "./ModalContainer";
import { ModalContextProps } from "./ModalContext";
import { Button } from "../Button";

// export const ModalMockProps: ModalContextProps = {
//   open: true,
//   title: "HogeHoge",
//   onClose: () => action("onClose")(),
//   onApply: () => action("onApply")(),
//   onCancel: () => action("onCancel")(),
//   renderApplyButton: (onApply) => <Button onClick={onApply}>適用</Button>,
// };

export default {
  title: Modal.name,
  component: Modal,
  // args: ModalMockProps,
} as Meta;

export const Usage: Story<ModalProps> = (args) => {
  const props = {
    open: true,
    title: "HogeHoge",
    onClose: () => action("onClose")(),
    onApply: () => action("onApply")(),
    onCancel: () => action("onCancel")(),
    renderApplyButton: (onApply) => <Button onClick={onApply}>適用</Button>,
  };
  return (
    <ModalContainer {...props}>
      <Modal>HogeHogeContent</Modal>
    </ModalContainer>
  );
};
