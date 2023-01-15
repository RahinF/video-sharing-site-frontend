import { FC } from "react";
import useGlobalContext from "../../context/GlobalContext";

const SkipNavigationButton: FC = () => {
  const { skipNavigationOnClick } = useGlobalContext();
  return (
    <button
      onClick={skipNavigationOnClick}
      className="sr-only focus:not-sr-only"
    >
      skip navigation
    </button>
  );
};

export default SkipNavigationButton;
