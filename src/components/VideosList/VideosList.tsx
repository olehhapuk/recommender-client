import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './VideosList.module.css';
import VideoItem from '@/components/VideoItem';
import { Video } from '@/types/entities/video.entity';

interface VideosListProps {
  videos: Video[];
  initialIndex?: number;
}

const VideosList = ({ videos, initialIndex }: VideosListProps) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);

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
          <VideoItem video={video} isPlaying={i === currentVideoIndex} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default VideosList;
