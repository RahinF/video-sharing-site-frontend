import Avatar from "../../components/Avatar";
import SubscribeButton from "../../components/SubscribeButton";
import { useGetUserQuery } from "../user/userApiSlice";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUserId } from "../user/userSlice";
import { pluralizeAndAbbreviateNumber } from "../../util/number";
import useModal from "../modal/useModal";
import Modal from "../modal/Modal";
import EditVideo from "./EditVideo";
import { PencilSimple } from "phosphor-react";

interface Props {
  userId: string;
}
const VideoChannel = ({ userId }: Props) => {
  const { data: user } = useGetUserQuery(userId);

  const currentUserId = useSelector(selectCurrentUserId);
  const { isOpen, openModal, closeModal } = useModal();

  const isChannelOwner = currentUserId === user?._id;
  const isLoggedIn = currentUserId;

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-4">
        <Link to={`/user/${user?._id}`} aria-label={`${user?.name} profile`}>
          <Avatar src={user?.image} alt={user?.name} />
        </Link>
        <div className="flex flex-col gap-1">
          <Link to={`/user/${user?._id}`}>
            <span className="font-medium">{user?.name}</span>
          </Link>
          <span className="text-xs">
            {pluralizeAndAbbreviateNumber("subscriber", user?.subscribers || 0)}
          </span>
        </div>
      </div>

      {isChannelOwner ? (
        <button onClick={openModal} className="btn gap-2">
          <PencilSimple size={24} />
          Edit Video
        </button>
      ) : (
        isLoggedIn && <SubscribeButton videoOwnerId={user?._id} />
      )}

      <>
        <Modal isOpen={isOpen} handleClose={closeModal} title="Edit Video">
          <EditVideo handleModalClose={closeModal} />
        </Modal>
      </>
    </div>
  );
};

export default VideoChannel;
