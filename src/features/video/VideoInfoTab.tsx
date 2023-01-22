import { FC } from "react";
import { Link } from "react-router-dom";
import { Video } from "../../types/video";
import { timeAgoOrDate } from "../../util/date";
import { pluralizeAndFormatNumber } from "../../util/number";
import VideoChannel from "./VideoChannel";

interface Props {
  video: Video;
}

const VideoInfoTab: FC<Props> = ({ video }) => {
  return (
    <div>
      <div className="flex gap-2 text-sm">
        <span>{pluralizeAndFormatNumber("view", video.views)}</span>
        <span>•</span>
        <span>{timeAgoOrDate(video.createdAt)}</span>
      </div>

      <VideoChannel userId={video.userId} />

      <div className="grid gap-4">
        <div>
          <h2 className="font-medium">Description</h2>
          <p className="whitespace-pre-line text-sm">
            {video.description || "no description"}
          </p>
        </div>

        <div>
          <h3 className="mb-2 font-medium">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {video.tags.map((tag, index) => (
              <Link
                to={`/tags?tags=${tag}`}
                className="btn-sm btn"
                key={index}
                aria-label={`${tag} tag`}
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoInfoTab;
