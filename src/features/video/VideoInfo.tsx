import LikeButton from "../../components/LikeButton";
import { useUnlikeVideoMutation, useLikeVideoMutation } from "./videoApiSlice";
import { selectCurrentUserId } from "../user/userSlice";
import { Video } from "../../types/video";
import { useState } from "react";
import clsx from "clsx";
import Comments from "../comments/Comments";
import { useSelector } from "react-redux";
import VideoInfoTab from "./VideoInfoTab";
import { BookOpen, ChatTeardropDots } from "phosphor-react";

interface Props {
  video: Video;
}

const VideoInfo = ({ video }: Props) => {
  const currentUserId = useSelector(selectCurrentUserId);

  const [likeVideo] = useLikeVideoMutation();
  const [unlikeVideo] = useUnlikeVideoMutation();

  const tabs = [
    { icon: BookOpen, text: "Info" },
    { icon: ChatTeardropDots, text: "Comments" },
  ];
  const [activeTab, setActiveTab] = useState("Info");

  const handleLike = async () => {
    await likeVideo({ currentUserId, videoId: video._id });
  };

  const handleUnlike = async () => {
    await unlikeVideo({ currentUserId, videoId: video._id });
  };

  const Tabs = (
    <>
      {tabs.map((tab, index) => {
        const isTabActive = activeTab === tab.text;
        return (
          <div className="flex flex-col items-center gap-2"  key={index}>
            <button
              className={clsx({
                "btn btn-circle": true,
                [isTabActive ? "btn-primary" : "btn-ghost"]: true,
              })}
              onClick={() => setActiveTab(tab.text)}
            >
              <tab.icon size={24} weight={isTabActive ? "fill" : "regular"} />
            </button>
            <span className="text-sm">{tab.text}</span>
          </div>
        );
      })}
    </>
  );

  return (
    <div className="mb-6 pb-4">
      <h1 className="my-4 text-lg font-medium">{video.title}</h1>

      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-4">
          {Tabs}
          <LikeButton
            likes={video.likes}
            handleLike={handleLike}
            handleUnlike={handleUnlike}
          />
        </div>
      </div>

      {activeTab === "Info" && <VideoInfoTab video={video} />}
      {activeTab === "Comments" && <Comments videoId={video._id} />}
    </div>
  );
};

export default VideoInfo;
