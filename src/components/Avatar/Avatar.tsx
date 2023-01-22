import clsx from "clsx";
import { FC, useState } from "react";
import { z } from "zod";

const sizes = z.enum(["sm", "md", "lg", "xl"]);
type Sizes = z.infer<typeof sizes>;

interface Props {
  src?: string;
  alt?: string;
  size?: Sizes;
}

const Avatar: FC<Props> = ({ src, alt, size }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      className={clsx({
        "overflow-hidden rounded-full": true,
        "h-8 w-8": size === sizes.enum.sm,
        "h-16 w-16": !size || size === sizes.enum.md, // default
        "h-24 w-24": size === sizes.enum.lg,
        "h-32 w-32": size === sizes.enum.xl,
        "animate-pulse bg-zinc-700": !loaded,
        "bg-primary-dark": !src,
      })}
    >
      {src && (
        <img
          data-testid="avatar"
          className="h-full w-full object-cover"
          src={src}
          alt={`${alt} avatar`}
          onLoad={() => setLoaded(true)}
          aria-hidden
        />
      )}
    </div>
  );
};

export default Avatar;
