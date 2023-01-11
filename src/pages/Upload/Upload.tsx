import { useMemo, useState } from 'react';
import { useFormik } from 'formik';
import { useAuthHeader, useAuthUser } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

import styles from './Upload.module.css';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import { uploadVideoFile, createVideo } from '@/services/videos';
import { User } from '@/types/entities/user.entity';

const Upload = () => {
  const authHeader = useAuthHeader();
  const getUser = useAuthUser();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoFileData, setVideoFileData] = useState<{
    videoName: string;
    thumbnailUrl: string;
  } | null>(null);

  const formik = useFormik({
    initialValues: {
      description: '',
      tags: '',
    },
    onSubmit: (values) => {
      if (!videoFileData) {
        return;
      }

      setIsLoading(true);
      createVideo(authHeader(), {
        description: values.description,
        tags: values.tags.split(','),
        thumbnailUrl: videoFileData.thumbnailUrl,
        videoUrl: `${import.meta.env.VITE_API_URL}/${videoFileData.videoName}`,
      })
        .then(() => {
          const user = getUser() as User;
          navigate(`/profile/${user.id}`);
        })
        .finally(() => setIsLoading(false));
    },
  });

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];
    setVideoFile(file);

    setIsLoading(true);
    uploadVideoFile(authHeader(), file)
      .then((res) => {
        setVideoFileData(res);
      })
      .finally(() => setIsLoading(false));
  }

  const videoFileUrl = useMemo(
    () => (videoFile ? URL.createObjectURL(videoFile) : null),
    [videoFile]
  );

  return (
    <div className={styles.container}>
      {!videoFileData ? (
        <div>
          <input
            type="file"
            name="video"
            accept="video/*"
            onChange={handleFileSelect}
            id="videoUploadInput"
            style={{ display: 'none' }}
            disabled={isLoading}
          />
          <label htmlFor="videoUploadInput" className={styles.btnGhost}>
            {isLoading ? 'Loading...' : 'Select video'}
          </label>
        </div>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.fields}>
            {videoFileUrl && (
              <video
                src={videoFileUrl}
                controls
                className={styles.videoPreview}
              />
            )}
            <TextArea
              placeholder="Describe your video"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Input
              type="text"
              placeholder="Add hashtags"
              name="tags"
              value={formik.values.tags}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <button type="submit" className={styles.btn} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Upload'}
          </button>
        </form>
      )}
    </div>
  );
};

export default Upload;
