import React, { useState, useRef, useEffect, FC, useCallback } from 'react';
import ReactPlayer from 'react-player';
import { saveAs } from 'file-saver';
import { Button } from '@/components/ui';

import { VIDEO_DURATION_DEFINITION, VIDEO_START_TIME } from './constants';
import { IVideoPlayerProps, IAnalytics } from './types';
import './styles.scss';

export const VideoPlayer: FC<IVideoPlayerProps> = (props) => {
  const { videoUrl } = props;

  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(VIDEO_START_TIME);
  const [duration, setDuration] = useState<number>(0);
  const [isSeekingDone, setIsSeekingDone] = useState<boolean>(false);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [analytics, setAnalytics] = useState<IAnalytics>({
    playCount: 0,
    pauseCount: 0,
    totalWatchTime: 0,
    lastPlayedTime: 0,
    sectionsWatched: [],
  });
  
  const playerRef = useRef<ReactPlayer>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const watchStartTime = useRef<number | null>(null);

  useEffect(() => {
    setStartTime(duration > VIDEO_DURATION_DEFINITION ? duration - VIDEO_DURATION_DEFINITION : VIDEO_START_TIME);
  }, [duration]);

  useEffect(() => {
    if (playerRef.current && startTime > 0 && !isSeekingDone) {
      playerRef.current.seekTo(startTime, 'seconds');
      setIsSeekingDone(true);
    }
  }, [startTime, isSeekingDone]);

  useEffect(() => {
    setBlobUrl(videoUrl.startsWith('blob:') ? videoUrl : null);
  }, [videoUrl]);

  const handleRateChange = useCallback((rate: number) => {
    setPlaybackRate(rate);
  }, []);

  const handlePause = useCallback(() => {
    setIsPaused(true);
    captureFrame();

    if (watchStartTime.current !== null) {
      const watchedTime = (playerRef.current?.getCurrentTime() || 0) - watchStartTime.current;
      setAnalytics((prev) => ({
        ...prev,
        totalWatchTime: prev.totalWatchTime + watchedTime,
        sectionsWatched: [
          ...prev.sectionsWatched,
          { start: watchStartTime.current, end: playerRef.current?.getCurrentTime() || 0 },
        ],
        pauseCount: prev.pauseCount + 1,
      }));
      watchStartTime.current = null;
    }
  }, []);

  const handlePlay = useCallback(() => {
    setIsPaused(false);
    setAnalytics((prev) => ({
      ...prev,
      playCount: prev.playCount + 1,
    }));
    watchStartTime.current = playerRef.current?.getCurrentTime() || null;
  }, []);

  const handleSeek = useCallback((seconds: number) => {
    console.log(`Video seeked to ${seconds} seconds`);
  }, []);

  const handleProgress = useCallback(() => {
    // Capture current playback progress for detailed analytics
  }, []);

  const captureFrame = useCallback(() => {
    if (playerRef.current && canvasRef.current) {
      const videoElement = playerRef.current.getInternalPlayer() as HTMLVideoElement;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  const saveFrameAsImage = useCallback((format: 'jpeg' | 'png') => {
    if (canvasRef.current) {
      try {
        canvasRef.current.toBlob((blob) => {
          if (blob) {
            saveAs(blob, `frame.${format}`);
          }
        }, `image/${format}`);
      } catch (error) {
        console.error('Failed to capture frame:', error);
        alert('Failed to capture frame. This might be due to cross-origin issues.');
      }
    }
  }, []);

  const handleDuration = useCallback((totalDuration: number) => {
    setDuration(totalDuration);
  }, []);

  const handleDownloadCompressedVideo = useCallback(() => {
    if (videoUrl.startsWith('blob:')) {
      saveAs(videoUrl, 'compressed_video.mp4');
    } else {
      alert('Video is not a blob URL, download not possible.');
    }
  }, [videoUrl]);

  return (
    <div className="video-player-container">
      <ReactPlayer
        ref={playerRef}
        url={blobUrl || videoUrl}
        controls
        playbackRate={playbackRate}
        width="100%"
        height="400px"
        onPause={handlePause}
        onPlay={handlePlay}
        onSeek={handleSeek}
        onProgress={handleProgress}
        onDuration={handleDuration}
        config={{
          file: {
            attributes: {
              crossOrigin: 'anonymous',
            },
          },
        }}
      />
      <div className="controls-container">
        {[0.5, 1, 1.5, 2].map((rate) => (
          <Button key={rate} variant="primary" size="small" onClick={() => handleRateChange(rate)}>
            {rate}x {rate === 1 && <span>&nbsp;(Normal)</span>}
          </Button>
        ))}
      </div>
      <div className="save-frame-container">
        <Button
          disabled={!isPaused}
          variant="secondary"
          size="small"
          onClick={() => saveFrameAsImage('jpeg')}
        >
          Save Frame as JPEG
        </Button>
        <Button
          disabled={!isPaused}
          variant="secondary"
          size="small"
          onClick={() => saveFrameAsImage('png')}
        >
          Save Frame as PNG
        </Button>
      </div>
      {blobUrl && (
        <div className="download-container">
          <Button variant="primary" size="medium" onClick={handleDownloadCompressedVideo}>
            Download Video
          </Button>
        </div>
      )}
      <canvas ref={canvasRef} className="capture-canvas" width={640} height={360}></canvas>
      {/* Analytics Summary */}
      <div className="analytics-container">
        <h3>Video Analytics</h3>
        <p>Play Count: {analytics.playCount}</p>
        <p>Pause Count: {analytics.pauseCount}</p>
        <p>Total Watch Time: {Math.round(analytics.totalWatchTime)} seconds</p>
        <p>Sections Watched: </p>
        <ul>
          {analytics.sectionsWatched.map((section, index) => (
            <li key={index}>
              {`From ${Math.round(section.start)}s to ${Math.round(section.end)}s`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
