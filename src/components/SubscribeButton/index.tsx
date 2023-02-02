import { FC, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAppSelector } from '../../app/hooks';
import {
  useSubscribeMutation,
  useUnsubscribeMutation,
} from '../../features/user/userApiSlice';
import {
  selectCurrentUserId,
  selectCurrentUserSubscriptions,
} from '../../features/user/userSlice';
import User from '../../types/user';

interface Props {
  videoOwner: User | undefined;
}

const SubscribeButton: FC<Props> = ({ videoOwner }) => {
  const [isSubscribed, setisSubscribed] = useState(false);
  const currentUserId = useAppSelector(selectCurrentUserId);
  const subscriptions = useAppSelector(selectCurrentUserSubscriptions);
  const [subscribe] = useSubscribeMutation();
  const [unsubscribe] = useUnsubscribeMutation();

  useEffect(() => {
    if (!videoOwner) return;

    const result = subscriptions.includes(videoOwner._id);

    setisSubscribed(result);
  }, [subscriptions, videoOwner]);

  async function subscribeToUser() {
    if (!videoOwner) return;

    try {
      await subscribe({
        currentUserId,
        videoOwnerId: videoOwner._id,
      }).unwrap();
      toast.success('Added to subscriptions.');
    } catch (error) {
      toast.error('Could not subscribe to user.');
    }
  }
  async function unsubscribeFromUser() {
    if (!videoOwner) return;

    try {
      await unsubscribe({
        currentUserId,
        videoOwnerId: videoOwner._id,
      }).unwrap();
      toast.success('Removed from subscriptions.');
    } catch (error) {
      toast.error('Could not remove user from subscriptions.');
    }
  }

  const handleSubscribe = async () => {
    isSubscribed ? await unsubscribeFromUser() : await subscribeToUser();
  };

  return (
    <button
      onClick={handleSubscribe}
      className="btn-primary btn"
      aria-label={
        isSubscribed
          ? `unsubscribe from ${videoOwner?.name}`
          : `subscribe to ${videoOwner?.name}`
      }
    >
      {isSubscribed ? 'subscribed' : 'subscribe'}
    </button>
  );
};

export default SubscribeButton;
