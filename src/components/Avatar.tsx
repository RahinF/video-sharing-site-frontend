import clsx from "clsx";
import { useState } from "react";

interface Props {
  src: string | undefined | null;
  alt: string | undefined;
  size?: "sm" | "md" | "lg" | "xl";
}

const Avatar = ({ src, alt, size }: Props) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="avatar">
      <div
        className={clsx({
          "rounded-full": true,
          "h-8 w-8": size === "sm",
          "h-16 w-16 ": !size || size === "md", // default
          "h-24 w-24": size === "lg",
          "h-32 w-32": size === "xl",
          "animate-pulse bg-zinc-700": !loaded,
          "bg-base-300": !src,
        })}
      >
        {src && (
          <img
            src={src}
            alt={`${alt} avatar`}
            onLoad={() => setLoaded(true)}
            aria-hidden
          />
        )}
      </div>
    </div>
  );
};

export default Avatar;
