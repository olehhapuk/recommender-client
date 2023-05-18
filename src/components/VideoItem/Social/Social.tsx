import { Link } from 'react-router-dom';
import {
  AiFillHeart,
  AiOutlineComment,
  AiOutlineShareAlt,
  AiOutlinePlus,
} from 'react-icons/ai';
import numeral from 'numeral';
import { useAuthUser, useAuthHeader } from 'react-auth-kit';

import styles from './Social.module.css';
import { Video } from '@/types/entities/video.entity';
import { likeVideo, unlikeVideo } from '@/services/videos';
import { User } from '@/types/entities/user.entity';

interface SocialProps {
  video: Video;
  onLiked: (video: Video) => void;
}

const plusIconSize = 18;
const normalIconSize = 40;
const iconColor = '#fff';

const Social = ({ video, onLiked }: SocialProps) => {
  const user = useAuthUser()() as User;
  const authHeader = useAuthHeader()();

  const isLiked = !!video.likedBy.find((userLiked) => userLiked.id === user.id);

  return (
    <div className={styles.controls}>
      <Link to={`/profile/${video.author.id}`} className={styles.profileBtn}>
        <img src={video.author.avatarUrl} alt="Profile" />
        <div className={styles.followStatus}>
          <AiOutlinePlus color={iconColor} size={plusIconSize} />
        </div>
      </Link>
      <button
        type="button"
        className={styles.btn}
        onClick={async () => {
          let response: Video;
          if (isLiked) {
            response = await unlikeVideo(video.id, authHeader);
          } else {
            response = await likeVideo(video.id, authHeader);
          }
          onLiked(response);
        }}
      >
        <AiFillHeart
          color={isLiked ? 'red' : iconColor}
          size={normalIconSize}
        />
        <span className={styles.btnLabel}>
          {numeral(video.likedBy.length).format('0.0a')}
        </span>
      </button>
      <button type="button" className={styles.btn}>
        <AiOutlineComment color={iconColor} size={normalIconSize} />
        <span className={styles.btnLabel}>{numeral(30000).format('0.0a')}</span>
      </button>
      <button type="button" className={styles.btn}>
        <AiOutlineShareAlt color={iconColor} size={normalIconSize} />
        <span className={styles.btnLabel}>{numeral(30000).format('0.0a')}</span>
      </button>
    </div>
  );
};

export default Social;
