import { Story, Meta } from "@storybook/react";
import MaterialIcon, { MaterialIconProps } from "./MaterialIcon";

export default {
  title: MaterialIcon.name,
  component: MaterialIcon,
} as Meta;

export const AddPhotoAlternate: Story<MaterialIconProps> = () => (
  <MaterialIcon icon={"add_photo_alternate"} />
);

export const Close: Story<MaterialIconProps> = () => (
  <MaterialIcon icon={"close"} />
);
