import { useGetUserQuery } from "../features/user/userApiSlice";
import { Link } from "react-router-dom";
import { Video } from "../types/video";
import Image from "./Image";
import { pluralizeAndAbbreviateNumber } from "../util/number";
import { timeAgoOrDate } from "../util/date";
import { convertDurationToTime } from "../util/time";

interface Props {
  video: Video;
}

const Card = ({ video }: Props) => {
  const { data: user } = useGetUserQuery(video.userId);

  return (
    <Link
      to={`/video/${video._id}`}
      className="grid grid-cols-2 gap-2 sm:grid-cols-1"
    >
      <div className="relative h-24 overflow-hidden rounded-lg sm:h-40">
        <Image src={video.imageUrl} alt={video.title} />

        <div className="absolute bottom-2 right-2 rounded-lg bg-black/75 p-1 text-xs">
          {convertDurationToTime(video.duration)}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="text-sm font-medium line-clamp-2" title={video.title}>
          {video.title}
        </h2>
        <span className="truncate text-sm">{user?.name}</span>
        <div className="flex gap-2 text-xs">
          <span>{pluralizeAndAbbreviateNumber("view", video.views)}</span>
          <span>•</span>
          <span>{timeAgoOrDate(video.createdAt)}</span>
        </div>
      </div>
    </Link>
  );
};

export default Card;
