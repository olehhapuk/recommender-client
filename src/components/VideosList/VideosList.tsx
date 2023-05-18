import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './VideosList.module.css';
import VideoItem from '@/components/VideoItem';
import { Video } from '@/types/entities/video.entity';

interface VideosListProps {
  videos: Video[];
  initialIndex?: number;
  onLiked: (video: Video) => void;
}

const VideosList = ({ videos, initialIndex, onLiked }: VideosListProps) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);

  useEffect(() => {
    document.body.style.overflowY = 'hidden';

    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, []);

  return (
    <Swiper
      initialSlide={initialIndex}
      slidesPerView={1}
      direction="vertical"
      height={window.innerHeight - 54}
      onSlideChange={(swiper) => {
        setCurrentVideoIndex(swiper.activeIndex);
      }}
      className={styles.list}
      shortSwipes={true}
      longSwipes={true}
      longSwipesRatio={0.3}
      longSwipesMs={500}
    >
      {videos.map((video, i) => (
        <SwiperSlide key={video.id}>
          <VideoItem
            video={video}
            isPlaying={i === currentVideoIndex}
            onLiked={onLiked}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default VideosList;
