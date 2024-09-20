import React, { FC, useState, useCallback } from 'react';

import { VideoUpload, VideoPlayer } from '@/components';

import './styles.scss';

export const Home: FC = () => {
  const [uploadedVideo, setUploadedVideo] = useState<string | null>(null);

  const handleVideoUpload = useCallback((videoUrl: string) => {
    setUploadedVideo(videoUrl);
  }, []);

  return (
    <main className="app-container">
      <h1 className="app-header">Video Dashboard</h1>
      <section className="app-content">
        {!uploadedVideo ? (
          <div className="video-container">
            <VideoUpload onVideoUpload={handleVideoUpload} />
          </div>
        ) : (
          <div className="video-container">
            <VideoPlayer videoUrl={uploadedVideo} />
          </div>
        )}
      </section>
    </main>
  );
};
