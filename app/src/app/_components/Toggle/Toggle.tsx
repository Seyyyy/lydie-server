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

    const selectedIndex = props.list.findIndex(item => item.value === props.value);
    const translateX = selectedIndex * 104; // ボタンの幅に応じて調整

    return (
        <div role="group" className="relative bg-light-base-color-light h-12 flex items-center gap-1 px-1 rounded-full w-fit">
            <div
                className="absolute h-10 w-[100px] rounded-full bg-light-base-color-dark transition-transform duration-300"
                style={{ transform: `translateX(${translateX}px)` }}
            />
            {
                props.list.map((v, index) => (
                    <button
                        key={index}
                        className={clsx("relative z-10 px-2 rounded-full min-w-[100px] h-10 font-semibold font-sans transition-colors duration-300", {
                            "bg-light-base-color-dark": props.value === v.value,
                            "hover:bg-light-base-color-dark/45": props.value !== v.value,
                            "active:bg-light-base-color-dark/45": props.value !== v.value,
                        })}
                        onClick={(event) => handleClick(event, v.value)}
                    >
                        {v.label}
                    </button>
                ))
            }
        </div>
    );
};