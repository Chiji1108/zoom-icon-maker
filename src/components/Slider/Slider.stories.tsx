import { Story, Meta } from "@storybook/react";
import Slider, { SliderProps } from "./Slider";

export default {
  title: Slider.name,
  component: Slider,
} as Meta;

const Template: Story<SliderProps> = (args) => <Slider {...args} />;

export const Default = Template.bind({});
Default.args = {};
