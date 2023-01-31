import { useAppSelector } from '../../../app/hooks';
import { selectCurrentToken } from '../../auth/authSlice';
import { selectCurrentUserSubscriptions } from '../../user/userSlice';
import Subscription from './Subscription';

interface Props {
  closeMenu: () => void;
}

const Subscriptions: React.FC<Props> = ({ closeMenu }) => {
  const subscriptions = useAppSelector(selectCurrentUserSubscriptions);
  const isLoggedIn = useAppSelector(selectCurrentToken);

  const hasSubscriptions = !!subscriptions.length;

  if (!isLoggedIn) return null;

  return (
    <>
      <p className="px-2">Subscriptions</p>
      {hasSubscriptions ? (
        <ul className="menu rounded-box p-2">
          {subscriptions.map((userId) => (
            <Subscription
              key={userId}
              userId={userId}
              closeMenu={closeMenu}
            />
          ))}
        </ul>
      ) : (
        <p className="px-2 text-sm">
          Accounts you have subscribed to will appear here.
        </p>
      )}
    </>
  );
};

export default Subscriptions;
