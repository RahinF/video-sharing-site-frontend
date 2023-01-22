import clsx from "clsx";
import { motion, Variants } from "framer-motion";
import { FC, useState } from "react";

interface Props {
  src: string;
  alt: string;
}

const variants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

const Image: FC<Props> = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={clsx("h-full bg-zinc-700", {
        "animate-pulse": !loaded,
      })}
    >
      <motion.img
        data-testid="image"
        src={src}
        alt={alt}
        initial="initial"
        animate={loaded && "animate"}
        variants={variants}
        onLoad={() => setLoaded(true)}
        className="h-full w-full object-cover"
      />
    </div>
  );
};

export default Image;
