import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "./Toggle";

const meta: Meta<typeof Toggle> = {
    title: "Components/Toggle",
    component: Toggle,
    parameters: {
        layout: "centered"
    },
}

export default meta;

type Story = StoryObj<typeof Toggle>;

/**
 * Toggle
 */
export const Primary: Story = {
    args: {
        value: "Hue",
        list: [
            {
                value: "Hue",
                label: "H"
            },
            {
                value: "Saturation",
                label: "S"
            },
            {
                value: "Value",
                label: "V"
            }
        ]
    },
    render: args => {
        const [selected, setSelected] = useState(
            args.value
        );

        const onClick = (_: React.MouseEvent<HTMLButtonElement, MouseEvent>, value: any) => {
            setSelected(value)
        }

        return (
            <Toggle value={selected} list={args.list} onClick={onClick} />
        )
    },
}