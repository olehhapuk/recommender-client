import { QueryClient } from 'react-query';

import { Video } from '@/types/entities/video.entity';

export function updateVideosQuery(
  queryClient: QueryClient,
  queryKey: string,
  likedVideo: Video
) {
  queryClient.setQueryData(queryKey, (videos: Video[] | undefined) => {
    return videos
      ? videos.map((video) => (video.id === likedVideo.id ? likedVideo : video))
      : [];
  });
}
