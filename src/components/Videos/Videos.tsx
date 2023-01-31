import clsx from 'clsx';
import { FC } from 'react';
import { Video } from '../../types/video';
import Card from '../Card/Card';
import Skeleton from '../skeletons/Skeleton';

interface Props {
  videos: Video[] | undefined;
  isLoading: boolean;
  placeholder?: number;
}

const Videos: FC<Props> = ({ videos, isLoading, placeholder = 8 }) => {
  const noVideos: boolean = !!!videos?.length;

  return (
    <div
      className={clsx('grid', {
        'grid-cols-1 items-start gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4':
          !noVideos || isLoading,
      })}
    >
      {isLoading ? (
        <Skeleton
          type="card"
          count={placeholder}
        />
      ) : noVideos ? (
        <p>No videos found.</p>
      ) : (
        videos?.map((video) => (
          <Card
            key={video._id}
            video={video}
          />
        ))
      )}
    </div>
  );
};

export default Videos;
