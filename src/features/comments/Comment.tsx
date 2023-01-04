import { DotsThreeVertical } from "phosphor-react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import LikeButton from "../../components/LikeButton";
import { Comment as CommentType } from "../../types/comment";
import { timeAgo } from "../../util/date";
import { useGetUserQuery } from "../user/userApiSlice";
import { selectCurrentUserId } from "../user/userSlice";
import {
  useDeleteCommentMutation,
  useLikeCommentMutation,
  useUnlikeCommentMutation,
} from "./commentsApiSlice";

interface Props {
  comment: CommentType;
}

const Comment = ({ comment }: Props) => {
  const currentUserId = useSelector(selectCurrentUserId);
  const [deleteComment] = useDeleteCommentMutation();
  const [likeComment] = useLikeCommentMutation();
  const [unlikeComment] = useUnlikeCommentMutation();

  const { data: user } = useGetUserQuery(comment.userId);

  const isCommentOwner = currentUserId === comment.userId;

  const handleDelete = async () => {
    try {
      await deleteComment(comment._id).unwrap();
      toast.success("Comment deleted.");
    } catch (error) {
      toast.error("Could not delete comment.");
    }
  };

  const handleLike = async () => {
    await likeComment({ currentUserId, commentId: comment._id });
  };

  const handleUnlike = async () => {
    await unlikeComment({ currentUserId, commentId: comment._id });
  };

  return (
    <div className="flex gap-4">
      <Link to={`/user/${user?._id}`}>
        <Avatar src={user?.image} alt={user?.name} />
      </Link>

      <div className="flex flex-grow flex-col gap-3">
        <div className="flex items-center gap-3">
          <Link to={`/user/${user?._id}`}>
            <span>{user?.name}</span>
          </Link>
          <span className="text-xs">{timeAgo(comment.createdAt)}</span>
        </div>

        <p className="whitespace-pre-line break-all text-sm">
          {comment.description}
        </p>
      </div>

      <div className="flex gap-2 justify-self-end">
        <LikeButton
          likes={comment.likes}
          handleLike={handleLike}
          handleUnlike={handleUnlike}
        />

        {isCommentOwner && (
          <div className="dropdown-end dropdown">
            <label tabIndex={0} className="btn-ghost btn-circle btn">
              <DotsThreeVertical size={24} />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box bg-base-300 p-2"
            >
              <li onClick={handleDelete}>
                <span>Delete</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
