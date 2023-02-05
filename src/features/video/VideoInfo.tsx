import clsx from 'clsx';
import { BookOpen, ChatTeardropDots } from 'phosphor-react';
import { FC, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAppSelector } from '../../app/hooks';
import LikeButton from '../../components/LikeButton';
import { Video } from '../../types/video';
import Comments from '../comments/Comments';
import { selectCurrentUserId } from '../user/userSlice';
import { useLikeVideoMutation, useUnlikeVideoMutation } from './videoApiSlice';
import VideoInfoTab from './VideoInfoTab';

interface Props {
  video: Video;
}

const VideoInfo: FC<Props> = ({ video }) => {
  const currentUserId = useAppSelector(selectCurrentUserId);

  const [likeVideo] = useLikeVideoMutation();
  const [unlikeVideo] = useUnlikeVideoMutation();

  const tabs = [
    { icon: BookOpen, text: 'Info' },
    { icon: ChatTeardropDots, text: 'Comments' },
  ];
  const [activeTab, setActiveTab] = useState('Info');

  async function handleLike() {
    try {
      await likeVideo({ currentUserId, videoId: video._id }).unwrap();
      toast.success('Video liked.');
    } catch (error) {
      toast.error('Could not like video.');
    }
  }

  async function handleUnlike() {
    try {
      await unlikeVideo({ currentUserId, videoId: video._id }).unwrap();
      toast.success('Video disliked.');
    } catch (error) {
      toast.error('Could not dislike video.');
    }
  }

  const Tabs = (
    <>
      {tabs.map((tab, index) => {
        const isTabActive = activeTab === tab.text;
        return (
          <button
            key={index}
            aria-label={`${tab.text} tab`}
            className={clsx({
              'btn gap-2': true,
              [isTabActive ? 'btn-primary' : 'btn-ghost']: true,
            })}
            onClick={() => setActiveTab(tab.text)}
          >
            <tab.icon
              size={24}
              weight={isTabActive ? 'fill' : 'regular'}
            />
            <span className="text-sm">{tab.text}</span>
          </button>
        );
      })}
    </>
  );

  return (
    <div className="mb-6 pb-4">
      <h1 className="my-4 text-lg font-medium">{video.title}</h1>

      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-4">
          {Tabs}
          <LikeButton
            likes={video.likes}
            handleLike={handleLike}
            handleUnlike={handleUnlike}
            type='video'
          />
        </div>
      </div>

      {activeTab === 'Info' && <VideoInfoTab video={video} />}
      {activeTab === 'Comments' && <Comments videoId={video._id} />}
    </div>
  );
};

export default VideoInfo;
