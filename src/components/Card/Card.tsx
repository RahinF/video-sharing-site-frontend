import humanizeDuration from "humanize-duration";
import { Link } from "react-router-dom";
import { useGetUserQuery } from "../../features/user/userApiSlice";
import { Video } from "../../types/video";
import { timeAgo, timeAgoOrDate } from "../../util/date";
import { pluralizeAndAbbreviateNumber } from "../../util/number";
import { convertDurationToTime } from "../../util/time";
import Image from "./Image";

interface Props {
  video: Video;
}

const Card: React.FC<Props> = ({ video }) => {
  const { data: user } = useGetUserQuery(video.userId);

  const readableDuration = humanizeDuration(video.duration * 1000, {
    delimiter: " and ",
    round: true,
    largest: 2,
  });

  const ariaLabel = `
  ${video.title} by ${user?.name},
  ${timeAgo(video.createdAt)},
  ${readableDuration},
  ${video.views} views`;

  return (
    <Link
      to={`/video/${video._id}`}
      className="grid grid-cols-2 gap-2 sm:grid-cols-1"
      aria-label={ariaLabel}
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
          <span aria-hidden>•</span>
          <span>{timeAgoOrDate(video.createdAt)}</span>
        </div>
      </div>
    </Link>
  );
};

export default Card;
