import { FC } from 'react';
import useGlobalContext from '../../context/GlobalContext';

const NavigationSkipped: FC = () => {
  const { skipNavigationRef } = useGlobalContext();
  return (
    <span
      ref={skipNavigationRef}
      tabIndex={-1}
      className="sr-only"
    />
  );
};

export default NavigationSkipped;
