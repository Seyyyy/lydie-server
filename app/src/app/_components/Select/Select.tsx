import { ComponentProps } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

type Props = {
  options: string[];
  value: string;
} & ComponentProps<"select">;

export const Select = (props: Props) => {
  const { t } = useTranslation();
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
              {t(option)}
            </option>
          );
        })}
      </select>
    </form>
  );
};
