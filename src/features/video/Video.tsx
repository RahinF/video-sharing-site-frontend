import { useParams } from "react-router-dom";
import Recommendation from "./Recommendation";
import { useAddViewMutation, useGetVideoQuery } from "./videoApiSlice";
import VideoInfo from "./VideoInfo";

const Video: React.FC = () => {
  const { id } = useParams();

  const { data: video } = useGetVideoQuery(id);
  const [addView] = useAddViewMutation();

  const handleEnded = async () => {
    if (video?._id) {
      await addView(video._id);
    }
  };

  return (
    <div>
      <video
        className="aspect-video rounded-lg"
        width={1280}
        src={video?.videoUrl}
        controls
        autoPlay
        onEnded={handleEnded}
      />
      {video?._id && <VideoInfo video={video} />}

      <Recommendation tags={video?.tags} currentVideoId={id} />
    </div>
  );
};

export default Video;
