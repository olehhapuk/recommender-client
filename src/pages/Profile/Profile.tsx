import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  Link,
  useParams,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { BsThreeDots } from 'react-icons/bs';
import { BsPlay } from 'react-icons/bs';
import numeral from 'numeral';
import { useAuthUser, useIsAuthenticated, useAuthHeader } from 'react-auth-kit';

import styles from './Profile.module.css';
import {
  fetchUserById,
  fetchUserVideos,
  follow,
  unfollow,
} from '@/services/users';
import { User } from '@/types/entities/user.entity';
import { Video } from '@/types/entities/video.entity';
import Stats from './Stats';
import UserVideos from './UserVideos';
import { useMemo } from 'react';

interface ProfileRouteParams {
  profileId: string;
}

const Profile = () => {
  const { profileId } = useParams<
    keyof ProfileRouteParams
  >() as ProfileRouteParams;
  const location = useLocation();
  const navigate = useNavigate();
  const authHeader = useAuthHeader();
  const queryClient = useQueryClient();

  const userQuery = useQuery<User>('user', () => fetchUserById(+profileId));
  const userVideosQuery = useQuery<Video[]>('userVideos', () =>
    fetchUserVideos(+profileId)
  );
  const followMutation = useMutation(
    (data: { id: number; authHeader: string }) =>
      follow(data.id, data.authHeader),
    {
      onSuccess: (data) => {
        queryClient.setQueryData('user', data);
      },
    }
  );
  const unfollowMutation = useMutation(
    (data: { id: number; authHeader: string }) =>
      unfollow(data.id, data.authHeader),
    {
      onSuccess: (data) => {
        queryClient.setQueryData('user', data);
      },
    }
  );

  const isAuthenticated = useIsAuthenticated()();
  const user = useAuthUser()() as User;

  const isFollowing = useMemo(
    () =>
      userQuery.data &&
      !!userQuery.data.followers.find(({ id }) => id === user.id),
    [userQuery]
  );

  return (
    <div className={styles.profile}>
      {!userQuery.isLoading && !userQuery.isError && userQuery.data && (
        <>
          <div className={styles.navbar}>
            <span className={styles.displayName}>
              {userQuery.data.username}
            </span>

            {isAuthenticated && user.id === userQuery.data.id && (
              <Link
                to={`${location.pathname}/settings`}
                className={styles.settings}
              >
                <BsThreeDots size={24} />
              </Link>
            )}
          </div>

          <div className={styles.info}>
            <img
              className={styles.avatar}
              src={userQuery.data.avatarUrl}
              alt={userQuery.data.username}
            />
            <p className={styles.username}>@{userQuery.data.username}</p>

            <Stats following={90000} followers={90000} likes={2500000} />

            {isAuthenticated && user.id === userQuery.data.id && (
              <button type="button" className={styles.editBtn}>
                Edit profile
              </button>
            )}

            {isAuthenticated &&
              user.id !== userQuery.data.id &&
              (isFollowing ? (
                <button
                  type="button"
                  className={styles.followBtn}
                  onClick={() =>
                    unfollowMutation.mutate({
                      id: +profileId,
                      authHeader: authHeader(),
                    })
                  }
                  disabled={unfollowMutation.isLoading}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  type="button"
                  className={styles.followBtn}
                  onClick={() =>
                    followMutation.mutate({
                      id: +profileId,
                      authHeader: authHeader(),
                    })
                  }
                  disabled={followMutation.isLoading}
                >
                  Follow
                </button>
              ))}

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
                    onClick={() => {
                      const videoIndex = userVideosQuery.data.findIndex(
                        ({ id }) => id === video.id
                      );
                      navigate(`${location.pathname}/videos/${videoIndex}`);
                    }}
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

          {userVideosQuery.data && (
            <Routes>
              <Route
                path="/videos/:videoIndex"
                element={
                  <UserVideos
                    profileId={+profileId}
                    videos={userVideosQuery.data}
                  />
                }
              />
            </Routes>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
