import Videos from '../../components/Videos/Videos';
import { useGetVideosQuery } from '../video/videoApiSlice';

interface Props {
  type: string;
}

const Home = ({ type }: Props) => {
  const { data: videos, isLoading } = useGetVideosQuery(type);

  return (
    <Videos
      videos={videos}
      isLoading={isLoading}
    />
  );
};

export default Home;
