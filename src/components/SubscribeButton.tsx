import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAppSelector } from "../app/hooks";
import {
  useSubscribeMutation,
  useUnsubscribeMutation,
} from "../features/user/userApiSlice";
import {
  selectCurrentUserId,
  selectCurrentUserSubscriptions,
} from "../features/user/userSlice";

interface Props {
  videoOwnerId: string | undefined;
}

const SubscribeButton = ({ videoOwnerId }: Props) => {
  const [isSubscribed, setisSubscribed] = useState(false);
  const currentUserId = useAppSelector(selectCurrentUserId);
  const subscriptions = useAppSelector(selectCurrentUserSubscriptions);
  const [subscribe] = useSubscribeMutation();
  const [unsubscribe] = useUnsubscribeMutation();

  useEffect(() => {
    if (!videoOwnerId) return;

    const result = subscriptions.includes(videoOwnerId);
    
    setisSubscribed(result);
  }, [subscriptions, videoOwnerId]);

  const handleSubscribe = async () => {
    if (isSubscribed) {
      try {
        await unsubscribe({ currentUserId, videoOwnerId }).unwrap();
        toast.success("Removed from subscriptions.");
      } catch (error) {
        toast.error("Could not remove user from subscriptions.");
      }
    } else {
      try {
        await subscribe({ currentUserId, videoOwnerId }).unwrap();
        toast.success("Added to subscriptions.");
      } catch (error) {
        toast.error("Could not subscribe to user.");
      }
    }
  };

  return (
    <button onClick={handleSubscribe} className="btn-primary btn">
      {isSubscribed ? "subscribed" : "subscribe"}
    </button>
  );
};

export default SubscribeButton;
