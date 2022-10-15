import { useParams } from "react-router-dom";
import Videos from "../../components/Videos";
import { useGetUserQuery } from "./userApiSlice";
import { useGetVideosByUserQuery } from "..//video/videoApiSlice";
import { useSelector } from "react-redux";
import Modal from "../modal/Modal";
import EditUser from "./EditUser";
import { selectCurrentUserId } from "./userSlice";
import useModal from "../modal/useModal";
import pluralize from "pluralize";
import SubscribeButton from "../../components/SubscribeButton";
import Avatar from "../../components/Avatar";
import { useEffect, useState } from "react";
import { Video } from "../../types/video";
import clsx from "clsx";
import { PencilSimple } from "phosphor-react";
import { pluralizeAndAbbreviateNumber } from "../../util/number";

type Filters = "latest" | "most viewed" | "top rated";

const User = () => {
  const { id } = useParams();
  const { data: user, isLoading } = useGetUserQuery(id);
  const { data, isSuccess } = useGetVideosByUserQuery(id);
  const currentUserId = useSelector(selectCurrentUserId);

  const [videos, setVideos] = useState<Video[]>([]);
  const [likes, setLikes] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState<Filters>("latest");

  const isChannelOwner = currentUserId === id;
  const isLoggedIn = currentUserId;

  const { isOpen, openModal, closeModal } = useModal();

  const filters: Filters[] = ["latest", "most viewed", "top rated"];

  useEffect(() => {
    if (isSuccess) {
      const likesCount = data
        .map((video) => video.likes.length)
        .reduce((prev, curr) => prev + curr, 0);
      setLikes(likesCount);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (!isSuccess) return;

    let videos;

    switch (selectedFilter) {
      case "latest":
        videos = data
          .slice()
          .sort(
            (a, b) =>
              new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
          );
        return setVideos(videos);

      case "most viewed":
        videos = data.slice().sort((a, b) => b.views - a.views);
        return setVideos(videos);

      case "top rated":
        videos = data.slice().sort((a, b) => b.likes.length - a.likes.length);
        return setVideos(videos);

      default:
        break;
    }
  }, [selectedFilter, data, isSuccess]);

  return (
    <>
      <div className="grid gap-6">
        <div className="flex items-center gap-6">
          <Avatar src={user?.image} alt={user?.name} size="xl" />

          <div className="flex flex-col gap-1">
            <span className="text-xl font-medium">{user?.name}</span>

            <div className="mt-4">
              {isChannelOwner ? (
                <button onClick={openModal} className="btn gap-2">
                  <PencilSimple size={24} />
                  Edit User
                </button>
              ) : (
                isLoggedIn && <SubscribeButton videoOwnerId={user?._id} />
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <span className="text-sm">
            {pluralize("subscriber", user?.subscribers || 0, true)}
          </span>

          <span className="text-sm">
            {pluralize("subscription", user?.subscriptions.length || 0, true)}
          </span>

          <span className="text-sm">
            {pluralizeAndAbbreviateNumber("like", likes)}
          </span>
        </div>

        <p className="whitespace-pre-line">{user?.bio || "no bio"}</p>
      </div>

      <Modal isOpen={isOpen} handleClose={closeModal} title="Edit User">
        <EditUser handleModalClose={closeModal} />
      </Modal>

      <div className="divider" />

      <div className="my-6 flex flex-col-reverse items-center justify-between gap-4 md:flex-row">
        <h1 className="text-2xl">
          <span className="capitalize text-primary">{selectedFilter} </span>
          <span>{pluralize("video", videos.length)}</span>
        </h1>

        <div className="btn-group">
          {filters.map((filter) => (
            <button
              key={filter}
              className={clsx({
                "btn btn-sm": true,
                "btn-primary ": selectedFilter === filter,
              })}
              onClick={() => setSelectedFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <Videos videos={videos} isLoading={isLoading} />
    </>
  );
};

export default User;
