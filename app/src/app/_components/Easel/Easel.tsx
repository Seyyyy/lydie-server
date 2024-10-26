import { ComponentProps } from "react";
import Image from "next/image";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

type Props = {} & ComponentProps<"input">;

export const Easel = (props: Props) => {
  const { t } = useTranslation();

  return (
    <div className={clsx(`bg-bgBack rounded-lg relative`, props.className)}>
      <div className="absolute w-full h-full flex justify-center">
        {props.src ? (
          <Image
            // https://nextjs.org/docs/pages/api-reference/components/image#responsive-images
            src={props.src}
            alt={props.alt || "empty image"}
            className="w-full h-full object-cover rounded-lg"
            sizes="200px"
            fill
          />
        ) : (
          <div className="m-4 w-[calc(100%-12px)] flex flex-col items-center justify-center border-2 border-dashed border-slate-400 rounded-lg">
            <p className={`textButton text-gray-500`}>{t('Please input file')}</p>
          </div>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        {...props}
        className="absolute w-full h-full opacity-0"
      />
    </div>
  );
};
