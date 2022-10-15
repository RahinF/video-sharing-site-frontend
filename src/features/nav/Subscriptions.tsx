import Subscription from "./Subscription";
import { useSelector } from "react-redux";
import { selectCurrentUserSubscriptions } from "../user/userSlice";

interface Props {
  closeMenu: () => void;
}

const Subscriptions = ({ closeMenu }: Props) => {
  const subscriptions = useSelector(selectCurrentUserSubscriptions);

  return (
    <>
      <p className="px-2">Subscriptions</p>
      {!subscriptions.length && (
        <p className="px-2 text-sm">
          Accounts you have subscribed to will appear here
        </p>
      )}

      <ul className="menu rounded-box p-2">
        {subscriptions.map((userId) => (
          <Subscription key={userId} userId={userId} closeMenu={closeMenu}/>
        ))}
      </ul>
    </>
  );
};

export default Subscriptions;
