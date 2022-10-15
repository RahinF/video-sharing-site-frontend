import { useSearchParams } from "react-router-dom";
import Videos from "../../components/Videos";
import { useGetVideosByTagsQuery } from "./videoApiSlice";

const Tags = () => {
  const [searchParams] = useSearchParams();
  const tag = searchParams.get("tags");

  const { data: videos, isLoading } = useGetVideosByTagsQuery(tag);

  return <Videos videos={videos} isLoading={isLoading} />;
};

export default Tags;
