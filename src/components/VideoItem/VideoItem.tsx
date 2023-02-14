import { useEffect, useRef, useState } from 'react';
import {
  BsPlayFill,
  BsPauseFill,
  BsVolumeDownFill,
  BsVolumeMuteFill,
} from 'react-icons/bs';
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
  const [isMuted, setIsMuted] = useState(false);

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

  const toggleVolume = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <div className={styles.item}>
      {isPlaying || videoRef.current ? (
        <video
          ref={videoRef}
          className={styles.video}
          src={video.videoUrl}
          muted={isMuted}
          onClick={togglePause}
          loop
          data-video
        />
      ) : (
        <img src={video.thumbnailUrl} className={styles.video} />
      )}
      <CSSTransition
        in={!isActuallyPlaying}
        timeout={200}
        classNames={pauseFadeStyles}
        unmountOnExit
      >
        <button type="button" className={styles.stateBtn}>
          {isActuallyPlaying ? (
            <BsPauseFill
              size={iconSize}
              color={iconColor}
              onClick={togglePause}
            />
          ) : (
            <BsPlayFill
              size={iconSize}
              color={iconColor}
              onClick={togglePause}
            />
          )}
        </button>
      </CSSTransition>
      <Social video={video} />
      <Info video={video} />
      <button type="button" className={styles.volumeBtn} onClick={toggleVolume}>
        {isMuted ? (
          <BsVolumeMuteFill color="#fff" size={28} />
        ) : (
          <BsVolumeDownFill color="#fff" size={28} />
        )}
      </button>
    </div>
  );
};

export default VideoItem;
