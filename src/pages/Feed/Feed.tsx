import { useQuery } from 'react-query';
import { useEffect } from 'react';
import { useAuthHeader } from 'react-auth-kit';

import Navbar from '@/components/Navbar';
import VideosList from '@/components/VideosList';
import { fetchFeed } from '@/services/videos';
import { Video } from '@/types/entities/video.entity';

const Feed = () => {
  const authHeader = useAuthHeader();
  const videosQuery = useQuery<Video[]>('feed', () => fetchFeed(authHeader()));

  return (
    <div>
      <Navbar />
      <VideosList videos={videosQuery.data || []} />
    </div>
  );
};

export default Feed;
