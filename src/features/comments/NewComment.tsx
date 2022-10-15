import { useState } from "react";
import { useSelector } from "react-redux";
import { usePostCommentMutation } from "./commentsApiSlice";
import { selectCurrentUserId } from "../user/userSlice";
import clsx from "clsx";

interface Props {
  videoId: string | undefined;
}

const NewComment = ({ videoId }: Props) => {
  const [postComment] = usePostCommentMutation();
  const currentUserId = useSelector(selectCurrentUserId);

  const [newComment, setNewComment] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const commentMaxLength = 250;
  const commentIsTooLong = newComment.length > commentMaxLength;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await postComment({
      userId: currentUserId,
      videoId,
      description: newComment,
    });

    setIsFocused(false);
    setNewComment("");
  };

  const handleRemoveFocus = () => {
    setIsFocused(false);
    setNewComment("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className={clsx("textarea", {
          "h-8": !isFocused,
          "h-32": isFocused,
          "textarea-error": commentIsTooLong,
        })}
        aria-label="Add Comment"
        placeholder="Add a comment..."
        value={newComment}
        onChange={(event) => setNewComment(event.target.value)}
        onFocus={() => setIsFocused(true)}
      />

      {isFocused && (
        <div className="mt-4 flex justify-between">
          <span className={clsx("text-sm", { "text-error": commentIsTooLong })}>
            {newComment.length}/{commentMaxLength}
          </span>
          <div className="flex gap-4">
            <button
              className="btn btn-outline btn-primary"
              onClick={handleRemoveFocus}
            >
              Cancel
            </button>

            <button
              disabled={!newComment || commentIsTooLong}
              className="btn btn-primary"
              type="submit"
            >
              Comment
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default NewComment;
