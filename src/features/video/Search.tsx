import { useLocation } from "react-router-dom";
import Videos from "../../components/Videos";
import { useGetVideosBySearchQuery } from "./videoApiSlice";

const Search = () => {
  const { search } = useLocation();
  const { data: videos, isLoading } = useGetVideosBySearchQuery(search);

  return <Videos videos={videos} isLoading={isLoading} />;
};

export default Search;
