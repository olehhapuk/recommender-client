import { useQuery } from 'react-query';
import { useAuthHeader } from 'react-auth-kit';

import Navbar from '@/components/Navbar';
import VideosList from '@/components/VideosList';
import { fetchFeed } from '@/services/videos';
import { Video } from '@/types/entities/video.entity';
import styles from './Feed.module.css';

const Feed = () => {
  const authHeader = useAuthHeader();
  const videosQuery = useQuery<Video[]>('feed', () => fetchFeed(authHeader()));

  return (
    <div>
      <Navbar />
      {videosQuery.data && videosQuery.data.length > 0 ? (
        <VideosList videos={videosQuery.data} />
      ) : (
        <div className={styles.container}>
          <p className={styles.centerText}>
            Follow more people to see new videos here
          </p>
        </div>
      )}
    </div>
  );
};

export default Feed;
