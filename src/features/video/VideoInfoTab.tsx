import { timeAgoOrDate } from "../../util/date";
import VideoChannel from "./VideoChannel";
import { Video } from "../../types/video";
import { pluralizeAndFormatNumber } from "../../util/number";
import { Link } from "react-router-dom";

interface Props {
  video: Video;
}

const VideoInfoTab = ({ video }: Props) => {
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
          <p className="text-sm whitespace-pre-line">{video.description || "no description"}</p>
        </div>

        <div>
          <h3 className="mb-2 font-medium">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {video.tags.map((tag, index) => (
              <Link to={`/tags?tags=${tag}`} className="btn btn-sm" key={index}>
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
