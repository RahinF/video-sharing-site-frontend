import { DotsThreeVertical } from 'phosphor-react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import Dropdown from '../../components/Dropdown/Dropdown';
import LikeButton from '../../components/LikeButton';
import { Comment as CommentType } from '../../types/comment';
import { timeAgo } from '../../util/date';
import { useGetUserQuery } from '../user/userApiSlice';
import { selectCurrentUserId } from '../user/userSlice';
import {
  useDeleteCommentMutation,
  useLikeCommentMutation,
  useUnlikeCommentMutation,
} from './commentsApiSlice';

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
      toast.success('Comment deleted.');
    } catch (error) {
      toast.error('Could not delete comment.');
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
        <Avatar
          src={user?.image}
          alt={user?.name}
        />
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
        <div>
          <LikeButton
            likes={comment.likes}
            handleLike={handleLike}
            handleUnlike={handleUnlike}
          />
        </div>
      </div>

      <div className="flex gap-2 justify-self-end">
        {isCommentOwner && (
          <Dropdown
            triggerIcon={DotsThreeVertical}
            ariaLabel="comment options"
          >
            <button
              type="button"
              onClick={handleDelete}
            >
              Delete
            </button>
          </Dropdown>
        )}
      </div>
    </div>
  );
};

export default Comment;
