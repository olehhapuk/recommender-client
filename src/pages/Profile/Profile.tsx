import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { BsThreeDots } from 'react-icons/bs';
import { BsPlay, BsArrowLeftShort } from 'react-icons/bs';
import numeral from 'numeral';

import styles from './Profile.module.css';
import { fetchUserById, fetchUserVideos } from '@/services/users';
import { User } from '@/types/entities/user.entity';
import { Video } from '@/types/entities/video.entity';
import Stats from './Stats';
import VideosList from '@/components/VideosList';
import { useState } from 'react';

interface ProfileRouteParams {
  profileId: string;
}

const Profile = () => {
  const { profileId } = useParams<
    keyof ProfileRouteParams
  >() as ProfileRouteParams;

  const userQuery = useQuery<User>('user', () => fetchUserById(+profileId));
  const userVideosQuery = useQuery<Video[]>('userVideos', () =>
    fetchUserVideos(+profileId)
  );

  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  return (
    <div className={styles.profile}>
      {!userQuery.isLoading && !userQuery.isError && userQuery.data && (
        <>
          <div className={styles.navbar}>
            <span className={styles.displayName}>
              {userQuery.data.username}
            </span>

            <Link to="/profile/1/settings" className={styles.settings}>
              <BsThreeDots size={24} />
            </Link>
          </div>

          <div className={styles.info}>
            <img
              className={styles.avatar}
              src={userQuery.data.avatarUrl}
              alt={userQuery.data.username}
            />
            <p className={styles.username}>@{userQuery.data.username}</p>
            <Stats following={90000} followers={90000} likes={2500000} />
            <button type="button" className={styles.editBtn}>
              Edit profile
            </button>
            <p className={styles.description}>
              {userQuery.data.description.slice(0, 80)}
            </p>
          </div>
          {!userVideosQuery.isLoading &&
            !userVideosQuery.isError &&
            userVideosQuery.data && (
              <div className={styles.videosGrid}>
                {userVideosQuery.data.map((video: Video) => (
                  <div
                    key={video.id}
                    className={styles.videoItem}
                    onClick={() => setIsPlaying(true)}
                  >
                    <video
                      src={video.videoUrl}
                      className={styles.videoItemVideo}
                    />
                    <div className={styles.videoItemViewsBox}>
                      <BsPlay size={24} />
                      <span className={styles.videoItemViewsCount}>
                        {numeral(video.views).format('0.0a')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

          {userVideosQuery.data && isPlaying && (
            <div className={styles.videosList}>
              <VideosList videos={userVideosQuery.data} />
              <button
                type="button"
                className={styles.backBtn}
                onClick={() => setIsPlaying(false)}
              >
                <BsArrowLeftShort color="#fff" size={28} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
