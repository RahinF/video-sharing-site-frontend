import { useParams } from "react-router-dom";
import Recommendation from "./Recommendation";
import VideoInfo from "./VideoInfo";
import { useAddViewMutation, useGetVideoQuery } from "./videoApiSlice";

const Video = () => {
  const { id } = useParams();

  const { data: video } = useGetVideoQuery(id);
  const [addView] = useAddViewMutation();

  return (
    <div>
      <video
        className="aspect-video rounded-lg"
        width={1280}
        src={video?.videoUrl}
        controls
        autoPlay
        onEnded={() => addView(video?._id)}
      />
      {video?._id && <VideoInfo video={video} />}

      <Recommendation tags={video?.tags} currentVideoId={id} />
    </div>
  );
};

export default Video;
