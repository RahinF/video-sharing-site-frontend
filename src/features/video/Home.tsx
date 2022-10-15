import Videos from "../../components/Videos";
import { useGetVideosQuery } from "./videoApiSlice";

interface Props {
  type: string;
}

const Home = ({ type }: Props) => {
  const { data: videos, isLoading } = useGetVideosQuery(type);

  return <Videos videos={videos} isLoading={isLoading} />;
};

export default Home;
