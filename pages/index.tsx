import Form from '@/components/form/form';
import PostFeed from '@/components/post/postfeed';
import Header from '@/components/ui/header';

export default function Home() {
  return (
    <>
      <Header label="Main" />
      <Form placeholder="Tweet" />
      <PostFeed />
    </>
  );
}
