import { FC } from 'react';
import Videos from '../../../components/Videos/Videos';
import { useGetVideosQuery } from '../../video/videoApiSlice';
import { Props } from './Home.types';

const Home: FC<Props> = ({ type }) => {
  const { data: videos, isLoading } = useGetVideosQuery(type);

  return (
    <Videos
      videos={videos}
      isLoading={isLoading}
    />
  );
};

export default Home;
