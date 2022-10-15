import Card from "./Card";
import { Video } from "../types/video";
import Skeleton from "./skeletons/Skeleton";

interface Props {
  videos: Video[] | undefined;
  isLoading: boolean;
  placeholder?: number;
}

const Videos = ({ videos, isLoading, placeholder = 8 }: Props) => {
  return (
    <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {isLoading ? (
        <Skeleton type="card" count={placeholder} />
      ) : (
        videos?.map((video) => <Card key={video._id} video={video} />)
      )}
    </div>
  );
};

export default Videos;
