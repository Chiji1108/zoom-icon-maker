import { Button } from "../Button";
import { ModalContextProps } from "./ModalContext";
import { action } from "@storybook/addon-actions";

export const ModalMockProps = {
  open: true,
  title: "HogeHoge",
  onClose: () => action("onClose")(),
  onApply: () => action("onApply")(),
  onCancel: () => action("onCancel")(),
  renderApplyButton: (onApply) => <Button onClick={onApply}>適用</Button>,
};
