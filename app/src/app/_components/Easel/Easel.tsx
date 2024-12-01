import { ComponentProps } from "react";
import Image from "next/image";
import clsx from "clsx";

type Props = {} & ComponentProps<"input">;

export const Easel = (props: Props) => {
  return (
    <div className={clsx(`bg-bgBack relative`, props.className)}>
      <div className="absolute w-full h-full flex justify-center">
        {props.src ? (
          <Image
            // https://nextjs.org/docs/pages/api-reference/components/image#responsive-images
            src={props.src}
            alt={props.alt || "empty image"}
            className="w-full h-full object-cover"
            sizes="200px"
            fill
          />
        ) : (
          <div className="w-full flex flex-col items-center justify-center bg-light-base-color-dark">
            <p className={`textButton text-gray-500`}>{`Please input file`}</p>
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
