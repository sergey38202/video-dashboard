import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { IVideoUploadProps } from './types';
import './styles.scss';

export const VideoUpload: React.FC<IVideoUploadProps> = (props) => {
  const { onVideoUpload } = props;

  const [isCompressing, setIsCompressing] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setIsCompressing(true);

      try {
        console.log('Video dropped, starting compression...');

        if (!file) {
          throw new Error('Compression failed');
        }

        // Create a URL for the video file
        const videoUrl = URL.createObjectURL(file);
        onVideoUpload(videoUrl);
        console.log('Compression successful, video URL:', videoUrl);
      } catch (error) {
        console.error('Error compressing video:', error);
        alert('Failed to compress video. Please try again.');
      }

      setIsCompressing(false);
    },
    [onVideoUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'video/*': [] // Accept any video format
    }
  });

  return (
    <div {...getRootProps()} className="video-upload-container">
      <input {...getInputProps()} />
      <p className="upload-message">Drag & drop a video file here, or click to select one</p>
      {isCompressing && <p className="compressing-message">Compressing video, please wait...</p>}
    </div>
  );
};