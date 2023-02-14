import { useQuery } from 'react-query';

import VideosList from '@/components/VideosList';
import Navbar from '@/components/Navbar';
import { fetchTrending } from '@/services/videos';
import { Video } from '@/types/entities/video.entity';
import styles from './Trending.module.css';

const Trending = () => {
  const videosQuery = useQuery<Video[]>('trending', fetchTrending);

  return (
    <div>
      <Navbar />
      {videosQuery.data && videosQuery.data.length > 0 ? (
        <VideosList videos={videosQuery.data} />
      ) : (
        <div className={styles.container}>
          <p className={styles.centerText}>
            Like more videos to get recommendations
          </p>
        </div>
      )}
    </div>
  );
};

export default Trending;
