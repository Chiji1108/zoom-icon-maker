import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import ModalFooter, { ModalFooterProps } from "./ModalFooter";
import ModalContainer from "../ModalContainer";
// import { ModalMockProps } from "../Modal.stories";
import { Button } from "../../Button";
import { ModalContextProps } from "../ModalContext";

const ModalMockProps: ModalContextProps = {
  open: true,
  title: "HogeHoge",
  onClose: () => action("onClose")(),
  onApply: () => action("onApply")(),
  onCancel: () => action("onCancel")(),
  renderApplyButton: (onApply) => <Button onClick={onApply}>適用</Button>,
};

export default {
  title: "modal/" + ModalFooter.name,
  component: ModalFooter,
  args: ModalMockProps,
} as Meta;

export const Usage: Story<ModalFooterProps> = (args) => (
  <ModalContainer {...ModalMockProps} {...args}>
    <ModalFooter />
  </ModalContainer>
);
