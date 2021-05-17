import { Story, Meta } from "@storybook/react";
import MaterialIcon, { MaterialIconProps } from "./MaterialIcon";

export default {
  title: MaterialIcon.displayName,
  component: MaterialIcon,
} as Meta<MaterialIconProps>;

export const AddPhotoAlternate: Story<MaterialIconProps> = () => (
  <MaterialIcon>add_photo_alternate</MaterialIcon>
);

export const Close: Story<MaterialIconProps> = () => (
  <MaterialIcon>close</MaterialIcon>
);
