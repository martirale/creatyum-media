import PodcastPlayer from "./PodcastPlayer";

const PodcastPage = () => {
  const rssFeed = "https://anchor.fm/s/a59b2a8/podcast/rss";

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Podcast</h1>
      <PodcastPlayer rssFeed={rssFeed} />
    </div>
  );
};

export default PodcastPage;
