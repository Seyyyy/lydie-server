import React from "react";
import clsx from "clsx";

type Props<T> = {
    value: T;
    list: {
        value: T,
        label: string
    }[];
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, value: T) => void;
}

export const Toggle = <T,>(props: Props<T>) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, value: T) => {
        props.onClick(event, value);
    };

    return (
        <div role="group" className="bg-light-base-color-light h-12 flex items-center gap-1 px-1 rounded-full w-fit">
            {
                props.list.map((v, index) => (
                    <button
                        key={index}
                        className={clsx("px-2 rounded-full min-w-[100px] h-10 font-semibold font-sans", {
                            "bg-light-base-color-dark": props.value === v.value,
                        })}
                        onClick={(event) => handleClick(event, v.value)}
                    >
                        {v.label}
                    </button>
                ))
            }
        </div>
    )
}