import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Modal, { ModalProps } from "./Modal";

// export const ModalMockProps: ModalContextProps = {
// open: true,
// title: "HogeHoge",
// onClose: () => action("onClose")(),
// onApply: () => action("onApply")(),
// onCancel: () => action("onCancel")(),
//   renderApplyButton: (onApply) => <Button onClick={onApply}>適用</Button>,
// };

export default {
  title: Modal.displayName,
  component: Modal,
  args: {
    open: true,
    title: "HogeHoge",
    onClose: () => action("onClose")(),
    onApply: () => action("onApply")(),
    onCancel: () => action("onCancel")(),
  },
} as Meta;

export const Usage: Story<ModalProps> = (args) => {
  return <Modal {...args}>HogeHogeContent</Modal>;
};
