import { Story, Meta } from "@storybook/react";
import Button, { ButtonProps } from "./Button";

export default {
  title: Button.displayName,
  component: Button,
} as Meta<ButtonProps>;

export const Primary: Story<ButtonProps> = () => <Button>Primary</Button>;

export const DisabledPrimary: Story<ButtonProps> = () => (
  <Button disabled>Disabled</Button>
);

export const Secondary: Story<ButtonProps> = () => (
  <Button variant="secondary">Secondary</Button>
);

export const DisabledSecondary: Story<ButtonProps> = () => (
  <Button disabled variant="secondary">
    Disabled
  </Button>
);
