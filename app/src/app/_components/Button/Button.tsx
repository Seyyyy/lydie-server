import { ComponentProps } from "react";
import clsx from "clsx";

type Props = {} & ComponentProps<"button">;

export const Button = (props: Props) => {
  return (
    <button
      {...props}
      type="button"
      className={clsx(
        "bg-light-main-color text-light-base-color font-bold px-4 rounded-3xl",
        props.className
      )}
    />
  );
};
