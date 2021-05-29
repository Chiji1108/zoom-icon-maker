import { Story, Meta } from "@storybook/react";
import Form from "./Form";

export default {
  title: "Organisms/" + Form.displayName,
  component: Form,
} as Meta;

export const Usage: Story = () => <Form />;
