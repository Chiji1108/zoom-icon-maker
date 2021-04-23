import { Story, Meta } from "@storybook/react";
import Slider, { SliderProps } from "./Slider";

export default {
  title: Slider.name,
  component: Slider,
} as Meta;

export const Usage: Story<SliderProps> = () => <Slider />;
