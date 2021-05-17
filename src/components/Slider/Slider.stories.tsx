import { Story, Meta } from "@storybook/react";
import Slider, { SliderProps } from "./Slider";

export default {
  title: Slider.displayName,
  component: Slider,
} as Meta<SliderProps>;

export const Usage: Story<SliderProps> = () => <Slider />;
