import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import Videos from '../../../components/Videos/Videos';
import { useGetVideosByTagsQuery } from '../../video/videoApiSlice';

const Tags: FC = () => {
  const [searchParams] = useSearchParams();
  const tag = searchParams.get('tags');

  const { data: videos, isLoading } = useGetVideosByTagsQuery(tag);

  return (
    <Videos
      videos={videos}
      isLoading={isLoading}
    />
  );
};

export default Tags;
