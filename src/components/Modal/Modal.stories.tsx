import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Modal, { ModalFooter, ModalProps } from "./Modal";
import { useRef } from "react";
import { Button } from "../Button";

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
    onClose: action("onClose"),
  },
} as Meta<ModalProps>;

export const UsageWithButtons: Story<ModalProps> = (args) => {
  const ref = useRef();
  return (
    <Modal {...args} initialFocusRef={ref}>
      HogeHogeContent
      <ModalFooter>
        <Button variant="secondary" onClick={action("onCancel")}>
          キャンセル
        </Button>
        <Button ref={ref} onClick={action("onApply")}>
          Apply
        </Button>
      </ModalFooter>
    </Modal>
  );
};
