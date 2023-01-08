import { useQuery } from 'react-query';

import Navbar from '@/components/Navbar';
import VideosList from '@/components/VideosList';
import { fetchFeed } from '@/services/videos';
import { Video } from '@/types/entities/video.entity';

const Feed = () => {
  const videosQuery = useQuery<Video[]>('feed', fetchFeed);
  
  return (
    <div>
      <Navbar />
      <VideosList videos={videosQuery.data || []} />
    </div>
  );
};

export default Feed;
