import clsx from "clsx";
import { BookOpen, ChatTeardropDots } from "phosphor-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import LikeButton from "../../components/LikeButton";
import { Video } from "../../types/video";
import Comments from "../comments/Comments";
import { selectCurrentUserId } from "../user/userSlice";
import { useLikeVideoMutation, useUnlikeVideoMutation } from "./videoApiSlice";
import VideoInfoTab from "./VideoInfoTab";

interface Props {
  video: Video;
}

const VideoInfo: React.FC<Props> = ({ video }) => {
  const currentUserId = useSelector(selectCurrentUserId);

  const [likeVideo] = useLikeVideoMutation();
  const [unlikeVideo] = useUnlikeVideoMutation();

  const tabs = [
    { icon: BookOpen, text: "Info" },
    { icon: ChatTeardropDots, text: "Comments" },
  ];
  const [activeTab, setActiveTab] = useState("Info");

  const handleLike = async () => {
    try {
      await likeVideo({ currentUserId, videoId: video._id }).unwrap();
      toast.success("Video liked.");
    } catch (error) {
      toast.error("Could not like video.");
    }
  };

  const handleUnlike = async () => {
    try {
      await unlikeVideo({ currentUserId, videoId: video._id }).unwrap();
      toast.success("Video disliked.");
    } catch (error) {
      toast.error("Could not dislike video.");
    }
  };

  const Tabs = (
    <>
      {tabs.map((tab, index) => {
        const isTabActive = activeTab === tab.text;
        return (
          <div className="flex flex-col items-center gap-2" key={index}>
            <button
            aria-label={`${tab.text} tab`}
              className={clsx({
                "btn-circle btn": true,
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
