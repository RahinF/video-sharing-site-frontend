import clsx from "clsx";
import { Heart } from "phosphor-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUserId } from "../features/user/userSlice";
import { abbreviateNumber } from "../util/number";

interface Props {
  likes: string[];
  handleLike: () => void;
  handleUnlike: () => void;
}

const LikeButton = ({ likes, handleLike, handleUnlike }: Props) => {
  const currentUserId = useSelector(selectCurrentUserId);
  const isLoggedIn = currentUserId;
  const [isLiked, setIsLiked] = useState(false);

  const handleOnClick = () => {
    if (!isLoggedIn) return undefined;
    return likes.includes(currentUserId!) ? handleUnlike() : handleLike();
  };

  useEffect(() => {
    setIsLiked(likes.includes(currentUserId!));
  }, [likes, currentUserId]);

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleOnClick}
        className="btn-ghost btn-circle btn"
        aria-label="like video"
      >
        <Heart
          size={24}
          weight={isLiked ? "fill" : "regular"}
          className={clsx({ "text-primary": isLiked })}
        />
      </button>
      <span className="text-sm">{abbreviateNumber(likes.length)}</span>
    </div>
  );
};

export default LikeButton;
