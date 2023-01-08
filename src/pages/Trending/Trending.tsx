import { useQuery } from 'react-query';

import VideosList from '@/components/VideosList';
import Navbar from '@/components/Navbar';
import { fetchTrending } from '@/services/videos';
import { Video } from '@/types/entities/video.entity';

const Trending = () => {
  const videosQuery = useQuery<Video[]>('trending', fetchTrending);

  return (
    <div>
      <Navbar />
      <VideosList videos={videosQuery.data || []} />
    </div>
  );
};

export default Trending;
