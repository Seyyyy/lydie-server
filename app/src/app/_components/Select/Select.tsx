import { ComponentProps } from "react";
import clsx from "clsx";

type Props = {
  options: string[];
  value: string;
} & ComponentProps<"select">;

export const Select = (props: Props) => {
  return (
    <form className="w-full h-full">
      <select
        {...props}
        id="countries"
        className={clsx(
          "border border-light-base-color-dark text-light-main-color text-sm rounded-lg block px-2.5",
          props.className
        )}
        value={props.value}
      >
        {props.options.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </form>
  );
};
