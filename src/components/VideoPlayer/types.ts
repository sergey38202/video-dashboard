export interface IVideoPlayerProps {
    videoUrl: string;
};

export interface IAnalytics {
    playCount: number;
    pauseCount: number;
    totalWatchTime: number;
    lastPlayedTime: number;
    sectionsWatched: { start: number; end: number }[];
};