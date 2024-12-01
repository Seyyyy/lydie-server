import React, { useState } from "react";
import { Toggle } from "./Toggle";

const Template = () => {
    const [value, setValue] = useState("Hue")

    const list = [
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

    const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, value: string) => {
        setValue(value)
    }

    return (
        <Toggle list={list} value={value} onClick={onClick} />
    )
}

export default {
    title: "Components/Toggle",
    component: Toggle,
    parameters: {
        layout: "fullscreen"
    }
}

export const Prototype = () => <Template />;