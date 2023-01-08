import { Link } from 'react-router-dom';
import {
  AiFillHeart,
  AiOutlineComment,
  AiOutlineShareAlt,
  AiOutlinePlus,
} from 'react-icons/ai';

import styles from './Social.module.css';
import { Video } from '@/types/entities/video.entity';

interface SocialProps {
  video: Video;
}

const plusIconSize = 18;
const normalIconSize = 40;
const iconColor = '#fff';

const Social = ({ video }: SocialProps) => {
  return (
    <div className={styles.controls}>
      <Link to={`/profile/${video.author.id}`} className={styles.profileBtn}>
        <img src={video.author.avatarUrl} alt="Profile" />
        <div className={styles.followStatus}>
          <AiOutlinePlus color={iconColor} size={plusIconSize} />
        </div>
      </Link>
      <button type="button" className={styles.btn}>
        <AiFillHeart color={iconColor} size={normalIconSize} />
      </button>
      <button type="button" className={styles.btn}>
        <AiOutlineComment color={iconColor} size={normalIconSize} />
      </button>
      <button type="button" className={styles.btn}>
        <AiOutlineShareAlt color={iconColor} size={normalIconSize} />
      </button>
    </div>
  );
};

export default Social;
