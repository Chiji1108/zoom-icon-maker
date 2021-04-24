import { Story, Meta } from "@storybook/react";
import ZoomIconForm from "./ZoomIconForm";

export default {
  title: ZoomIconForm.displayName,
  component: ZoomIconForm,
} as Meta;

export const Usage: Story = () => <ZoomIconForm />;
