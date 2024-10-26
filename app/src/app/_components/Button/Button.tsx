import { ComponentProps } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

type Props = {} & ComponentProps<"button">;

export const Button = (props: Props) => {
  const { t } = useTranslation();
  return (
    <button
      {...props}
      type="button"
      className={clsx(
        "bg-light-main-color text-light-base-color font-bold px-4 rounded-3xl",
        props.className
      )}
    >
      {t('button')}
    </button>
  );
};
