import { useParams, Link } from 'react-router-dom';
import { BsArrowLeftShort } from 'react-icons/bs';

import styles from './Profile.module.css';
import VideosList from '@/components/VideosList';
import { Video } from '@/types/entities/video.entity';

interface UserVideosProps {
  profileId: number;
  videos: Video[];
}

interface UserVideosRouteParams {
  videoIndex: string;
}

const UserVideos = ({ profileId, videos }: UserVideosProps) => {
  const params = useParams<
    keyof UserVideosRouteParams
  >() as UserVideosRouteParams;

  const videoIndex = +params.videoIndex;

  return (
    <div className={styles.videosList}>
      <VideosList videos={videos} />
      <Link to={`/profile/${profileId}`} className={styles.backBtn}>
        <BsArrowLeftShort color="#fff" size={28} />
      </Link>
    </div>
  );
};

export default UserVideos;
