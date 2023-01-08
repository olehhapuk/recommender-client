import { useEffect, useRef, useState } from 'react';
import { BsPlayFill, BsPauseFill } from 'react-icons/bs';
import { CSSTransition } from 'react-transition-group';

import styles from './VideoItem.module.css';
import pauseFadeStyles from './pauseFade.module.css';
import Social from './Social';
import Info from './Info';
import { Video } from '@/types/entities/video.entity';

interface VideoItemProps {
  isPlaying: boolean;
  video: Video;
}

const iconSize = 120;
const iconColor = 'rgba(255, 255, 255, 0.5)';

const VideoItem = ({ isPlaying, video }: VideoItemProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isActuallyPlaying, setIsActuallyPlaying] = useState<boolean>(
    isPlaying || !videoRef.current?.paused
  );

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    function handleVideoPlay() {
      setIsActuallyPlaying(isPlaying);
    }

    function handleVideoPause() {
      setIsActuallyPlaying(false);
    }

    videoRef.current.addEventListener('play', handleVideoPlay);
    videoRef.current.addEventListener('pause', handleVideoPause);

    return () => {
      if (!videoRef.current) {
        return;
      }

      videoRef.current.removeEventListener('play', handleVideoPlay);
      videoRef.current.removeEventListener('pause', handleVideoPause);
    };
  }, [videoRef.current, isPlaying]);

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    if (isPlaying) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isPlaying]);

  const togglePause = () => {
    if (!videoRef.current) {
      return;
    }

    !videoRef.current.paused
      ? videoRef.current.pause()
      : videoRef.current.play();
  };

  return (
    <div className={styles.item}>
      <video
        ref={videoRef}
        className={styles.video}
        src={video.videoUrl}
        muted
        onClick={togglePause}
        loop
        data-video
      />
      <CSSTransition
        in={!isActuallyPlaying}
        timeout={200}
        classNames={pauseFadeStyles}
        unmountOnExit
      >
        <button type="button" className={styles.stateBtn}>
          {isActuallyPlaying ? (
            <BsPauseFill size={iconSize} color={iconColor} />
          ) : (
            <BsPlayFill size={iconSize} color={iconColor} />
          )}
        </button>
      </CSSTransition>
      <Social video={video} />
      <Info video={video} />
    </div>
  );
};

export default VideoItem;
