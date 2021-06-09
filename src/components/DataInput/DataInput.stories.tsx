import { Box } from "@chakra-ui/layout";
import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";
import DataInput, { DataInputProps } from "./DataInput";

//TODO: use msw to no use Environment Variable

export default {
  title: "Input/" + DataInput.displayName,
  component: DataInput,
  args: {
    onChange: action("onChange"),
  },
  decorators: [
    (Story) => (
      <Box bg="rgb(36,36,36)" p="2">
        <Story />
      </Box>
    ),
  ],
} as Meta<DataInputProps>;

export const Usage: Story<DataInputProps> = (args) => <DataInput {...args} />;
