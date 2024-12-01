import type { Meta, StoryObj } from "@storybook/react";
import { ColorPreview } from "./ColorPreview";

const mockProps = [
  { name: "red", value: 0.076, color: "red" },
  { name: "red-yellow", value: 0.005, color: "orange" },
  { name: "yellow", value: 0.002, color: "yellow" },
  { name: "yellow-green", value: 0.001, color: "lime" },
  { name: "green", value: 0.0, color: "green" },
  { name: "green-cyan", value: 0.003, color: "teal" },
  { name: "cyan", value: 0.385, color: "cyan" },
  { name: "cyan-blue", value: 0.368, color: "sky" },
  { name: "blue", value: 0.084, color: "blue" },
  { name: "blue-purple", value: 0.015, color: "indigo" },
  { name: "purple", value: 0.017, color: "purple" },
  { name: "purple-red", value: 0.045, color: "pink" },
];

const meta: Meta<typeof ColorPreview> = {
  title: "Components/ColorPreview",
  component: ColorPreview,
  parameters: {
    layout: "centered"
  }
}

export default meta;

type Story = StoryObj<typeof ColorPreview>;

export const Primary: Story = {
  render: args => {
    return (
      <ColorPreview
        className="w-96 h-96"
        chartData={{ data: mockProps, centralValue: 0.1 }}
      />
    );
  }
}
