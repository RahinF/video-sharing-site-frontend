import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectCurrentUserId,
  selectCurrentUserSubscriptions,
} from "../features/user/userSlice";
import {
  useSubscribeMutation,
  useUnsubscribeMutation,
} from "../features/user/userApiSlice";

interface Props {
  videoOwnerId: string | undefined;
}

const SubscribeButton = ({ videoOwnerId }: Props) => {
  const [isSubscribed, setisSubscribed] = useState(false);
  const currentUserId = useSelector(selectCurrentUserId);
  const subscriptions = useSelector(selectCurrentUserSubscriptions);
  const [subscribe] = useSubscribeMutation();
  const [unsubscribe] = useUnsubscribeMutation();

  useEffect(() => {
    if (subscriptions) {
      if (!videoOwnerId) return;
      const result = subscriptions.includes(videoOwnerId);
      setisSubscribed(result);
    }
  }, [subscriptions, videoOwnerId]);

  const handleSubscribe = async () => {
    if (isSubscribed) {
      await unsubscribe({ currentUserId, videoOwnerId });
    } else {
      await subscribe({ currentUserId, videoOwnerId });
    }
  };

  return (
    <button onClick={handleSubscribe} className="btn btn-primary">
      {isSubscribed ? "subscribed" : "subscribe"}
    </button>
  );
};

export default SubscribeButton;
