import Head from '../components/Head/Head';
import Nav from '../components/Nav/Nav';
import Feed from '../components/Feed/Feed';

const FeedPage = () => {
  const navMenu = 'artist';
  return (
    <>
      <Head />
      <Nav navMenu={navMenu} />
      <Feed />
    </>
  );
};

export default FeedPage;
