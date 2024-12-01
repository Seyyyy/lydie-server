import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Easel } from "./Easel";

const meta: Meta<typeof Easel> = {
  title: "Components/Easel",
  component: Easel,
  parameters: {
    layout: "centered"
  }
}

export default meta;

type Story = StoryObj<typeof Easel>;

export const Primary: Story = {
  render: args => {
    const [file, setFile] = useState<File | null>(null);

    const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setFile(e.target.files[0]);
      }
    };
    return (
      <Easel
        className="w-96 h-96"
        onChange={handleChangeImage}
        src={file ? URL.createObjectURL(file) : ""}
      />
    );
  }
}
