import { useGetVideosByTagsQuery, useGetVideosQuery } from "./videoApiSlice";
import Videos from "../../components/Videos";
import { useEffect, useState } from "react";
import { Video } from "../../types/video";

interface Props {
  tags: string[] | undefined;
  currentVideoId: string | undefined;
}

const Recommendation = ({ tags, currentVideoId }: Props) => {
  const {
    data: tagVideos,
    isLoading: tagLoading,
    isSuccess: tagSuccess,
  } = useGetVideosByTagsQuery(tags);

  const {
    data: trendingVideos,
    isLoading: trendingLoading,
    isSuccess: trendingSuccess,
  } = useGetVideosQuery("trending");

  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    if (!tagSuccess) return;

    // recommended videos always return the current video
    const filtered = tagVideos.filter((video) => video._id !== currentVideoId);

    if (filtered.length) return setVideos(filtered);

    if (trendingSuccess) {
      setVideos(trendingVideos);
    }
  }, [tagVideos, tagSuccess, currentVideoId, trendingVideos, trendingSuccess]);

  return (
    <>
      <h1 className="mb-4 text-2xl">
        <span className="text-primary">Related </span>Videos
      </h1>

      <Videos videos={videos} isLoading={tagLoading || trendingLoading} />
    </>
  );
};

export default Recommendation;
