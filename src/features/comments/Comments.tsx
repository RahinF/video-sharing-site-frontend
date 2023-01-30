import Comment from "./Comment";
import NewComment from "./NewComment";
import { useGetCommentsQuery } from "./commentsApiSlice";
import Skeleton from "../../components/skeletons/Skeleton";
import { useSelector } from "react-redux";
import { selectCurrentUserId } from "../user/userSlice";
import { pluralizeAndFormatNumber } from "../../util/number";

interface Props {
  videoId: string | undefined;
}

const Comments = ({ videoId }: Props) => {
  const { data: comments, isLoading } = useGetCommentsQuery(videoId);
  const userIsLoggedIn = useSelector(selectCurrentUserId);

  return (
    <div className="grid gap-6">
      {userIsLoggedIn && <NewComment videoId={videoId} />}
      <span>{pluralizeAndFormatNumber("Comment", comments?.length || 0)}</span>
      <div className="flex flex-col gap-4">
        {isLoading ? (
          <Skeleton count={3} type="comment" />
        ) : (
          comments?.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;
