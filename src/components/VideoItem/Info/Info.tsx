import { useState } from 'react';

import { Tag } from '@/types/entities/tag.entity';
import { Video } from '@/types/entities/video.entity';
import styles from './Info.module.css';

interface InfoProps {
  video: Video;
}

const Info = ({ video }: InfoProps) => {
  const [descriptionVisible, setDescriptionVisible] = useState<boolean>(false);

  function toggleDescription() {
    setDescriptionVisible((prev) => !prev);
  }

  const shortDescription = video.description.slice(0, 80).trim().concat('...');

  return (
    <div className={styles.info}>
      <p className={styles.username}>@{video.author.username}</p>

      <div>
        <p className={styles.description}>
          {descriptionVisible || video.description.length < 80
            ? video.description
            : shortDescription}
        </p>
        {video.description.length >= 80 && (
          <button
            type="button"
            className={styles.moreDescriptionBtn}
            onClick={toggleDescription}
          >
            {descriptionVisible ? 'less' : 'more'}
          </button>
        )}
      </div>

      <div className={styles.tagsList}>
        {video.tags.map((tag: Tag) => (
          <span key={tag.id} className={styles.tagItem}>
            #{tag.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Info;
