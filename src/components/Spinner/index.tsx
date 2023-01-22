import { motion } from "framer-motion";
import { CircleDashed } from "phosphor-react";
import { FC } from "react";

const animate = {
  rotate: 360,
  transition: { duration: 1, ease: "easeInOut", repeat: Infinity },
};

const Spinner: FC = () => {
  const MotionSpinner = motion(CircleDashed);

  return (
    <div className="grid w-full place-items-center gap-2" role="presentation">
      <MotionSpinner size={48} animate={animate} />
      <span className="text-sm">Loading...</span>
    </div>
  );
};

export default Spinner;
