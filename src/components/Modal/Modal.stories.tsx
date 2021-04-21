import { Story, Meta } from "@storybook/react";
import Modal, { ModalProps } from "./Modal";
import { ImageEditor } from "../ImageEditor";

export default {
  title: Modal.name,
  component: Modal,
} as Meta;

const Template: Story<ModalProps> = (args) => <Modal {...args} />;

export const NotOpen = Template.bind({});
NotOpen.args = {
  open: false,
  onClose: () => console.log("Close"),
  children: <div>HogeHoge</div>,
};

export const Open = NotOpen.bind({});
Open.args = {
  open: true,
  onClose: () => console.log("Close"),
  children: <div>HogeHoge</div>,
};

export const withImageEditor = NotOpen.bind({});
withImageEditor.args = {
  children: (
    <ImageEditor
      originalImage="https://source.unsplash.com/random"
      onComplete={(i) => console.log(i)}
      onError={(e) => console.log(e)}
    />
  ),
  open: true,
  onClose: () => console.log("Close"),
};
