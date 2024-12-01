import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "centered"
  }
}

export default meta;

type Story = StoryObj<typeof Select>;

export const Primary: Story = {
  args: {
    options: ["red", "blue", "green"],
    value: "red",
  },
  render: args => {
    const [selected, setSelected] = useState(
      args.value
    );

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelected(e.target.value)
    }

    return (
      <Select options={args.options} value={selected} onChange={onChange} />
    )
  }
}
