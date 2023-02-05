import { FC } from 'react';
import { useAppSelector } from '../../app/hooks';
import Skeleton from '../../components/skeletons/Skeleton';
import { pluralizeAndFormatNumber } from '../../util/number';
import { selectCurrentUserId } from '../user/userSlice';
import Comment from './Comment';
import { useGetCommentsQuery } from './commentsApiSlice';
import NewComment from './NewComment';

interface Props {
  videoId: string;
}

const Comments:FC<Props> = ({ videoId }) => {
  const { data: comments, isLoading } = useGetCommentsQuery(videoId);
  const isLoggedIn = useAppSelector(selectCurrentUserId);

  return (
    <div className="grid gap-6">
      {isLoggedIn && <NewComment videoId={videoId} />}
      <span>{pluralizeAndFormatNumber('Comment', comments?.length || 0)}</span>
      <div className="flex flex-col gap-4">
        {isLoading ? (
          <Skeleton
            count={3}
            type="comment"
          />
        ) : (
          comments?.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;
