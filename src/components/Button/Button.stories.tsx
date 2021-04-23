import { Story, Meta } from "@storybook/react";
import Button, { ButtonProps } from "./Button";

export default {
  title: Button.name,
  component: Button,
} as Meta;

export const Primary: Story<ButtonProps> = () => <Button>Primary</Button>;

export const Disabled: Story<ButtonProps> = () => (
  <Button disabled>Disabled</Button>
);
