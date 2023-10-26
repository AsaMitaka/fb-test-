import CommentItem from './commentitem';

interface CommentFeedProps {
  comments?: Record<string, any>[];
  postId: string;
  userId?: string;
}

const CommentFeed: React.FC<CommentFeedProps> = ({ comments = [], postId, userId }) => {
  return (
    <>
      {comments.map((comment) => (
        <CommentItem data={comment} key={comment.id} postId={postId} userId={userId} />
      ))}
    </>
  );
};

export default CommentFeed;
