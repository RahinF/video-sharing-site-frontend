import clsx from "clsx";
import { useEffect, useState } from "react";
import { PlayCircle } from "phosphor-react";

interface Props {
  src: string | undefined;
  alt: string | undefined;
}

const Image = ({ src, alt }: Props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!src) {
      setLoading(false);
    }
  }, [src]);

  if (!src)
    return (
      <div className="grid h-full place-items-center bg-base-300">
        <PlayCircle size={60} weight="thin" className="text-base-content" />
      </div>
    );

  return (
    <>
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoading(false)}
        className={clsx("object-cover", {
          hidden: loading,
        })}
      />

      {loading && <div className="h-full animate-pulse bg-slate-200" />}
    </>
  );
};

export default Image;
