import { useParams, Link } from 'react-router-dom';
import { BsArrowLeftShort } from 'react-icons/bs';

import styles from './Profile.module.css';
import VideosList from '@/components/VideosList';
import { Video } from '@/types/entities/video.entity';

interface UserVideosProps {
  profileId: number;
  videos: Video[];
  onLiked: (video: Video) => void;
}

interface UserVideosRouteParams {
  videoIndex: string;
}

const UserVideos = ({ profileId, videos, onLiked }: UserVideosProps) => {
  const params = useParams<
    keyof UserVideosRouteParams
  >() as UserVideosRouteParams;

  return (
    <div className={styles.videosList}>
      <VideosList
        videos={videos}
        initialIndex={+params.videoIndex}
        onLiked={onLiked}
      />
      <Link to={`/profile/${profileId}`} className={styles.backBtn}>
        <BsArrowLeftShort color="#fff" size={28} />
      </Link>
    </div>
  );
};

export default UserVideos;
