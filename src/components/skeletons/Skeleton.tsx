import Card from './Card';
import Comment from './Comment';

interface Props {
  type: 'card' | 'comment';
  count: number;
}
const Skeleton = ({ type, count }: Props) => {
  if (type === 'card')
    return (
      <>
        {[...Array(count)].map((_, index) => (
          <Card key={index} />
        ))}
      </>
    );

  if (type === 'comment')
    return (
      <>
        {[...Array(count)].map((_, index) => (
          <Comment key={index} />
        ))}
      </>
    );

  return null;
};

export default Skeleton;
