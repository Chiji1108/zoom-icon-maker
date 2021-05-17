import { Story, Meta } from "@storybook/react";
import Checkbox, { CheckboxProps } from "./Checkbox";

export default {
  title: Checkbox.displayName,
  component: Checkbox,
} as Meta<CheckboxProps>;

export const Primary: Story<CheckboxProps> = () => <Checkbox />;
