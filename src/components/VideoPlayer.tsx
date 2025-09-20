import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
    src: string;
    poster?: string;
    title?: string;
    autoPlay?: boolean;
    className?: string;
    description?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
    src,
    poster,
    title,
    autoPlay = false,
    className = '',
    description
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [isMuted, setIsMuted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const controlsTimeout = useRef<NodeJS.Timeout | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Initialize video
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updateDuration = () => setDuration(video.duration);

        video.addEventListener('loadedmetadata', updateDuration);

        return () => {
            video.removeEventListener('loadedmetadata', updateDuration);
        };
    }, []);

    // Update play state
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (isPlaying) {
            video.play().catch(err => {
                console.error("Error playing video:", err);
                setIsPlaying(false);
            });
        } else {
            video.pause();
        }
    }, [isPlaying]);

    // Update muted state
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = isMuted;
        }
    }, [isMuted]);

    // Handle fullscreen changes
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    // Update progress
    const handleTimeUpdate = () => {
        if (!videoRef.current) return;

        const currentTime = videoRef.current.currentTime;
        const duration = videoRef.current.duration;

        setCurrentTime(currentTime);
        setProgress((currentTime / duration) * 100);
    };

    const togglePlay = () => {
        setIsPlaying(prev => !prev);
    };

    const toggleMute = () => {
        setIsMuted(prev => !prev);
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!videoRef.current) return;

        const progressBar = e.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const clickPosition = (e.clientX - rect.left) / rect.width;
        const newTime = clickPosition * videoRef.current.duration;

        videoRef.current.currentTime = newTime;
        setCurrentTime(newTime);
        setProgress(clickPosition * 100);
    };

    const toggleFullscreen = () => {
        if (!containerRef.current) return;

        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleMouseEnter = () => {
        setIsHovering(true);
        if (controlsTimeout.current) {
            clearTimeout(controlsTimeout.current);
        }
    };

    const handleMouseLeave = () => {
        if (controlsTimeout.current) {
            clearTimeout(controlsTimeout.current);
        }

        controlsTimeout.current = setTimeout(() => {
            setIsHovering(false);
        }, 2000);
    };

    return (
        <div className={cn("relative group", className)}>
            <div
                ref={containerRef}
                className="relative overflow-hidden rounded-lg bg-black shadow-lg"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Video Element */}
                <video
                    ref={videoRef}
                    src={src}
                    poster={poster}
                    className="w-full h-auto"
                    onClick={togglePlay}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={() => setIsPlaying(false)}
                    playsInline
                />

                {/* Title Overlay - Only visible when hovering */}
                {title && isHovering && (
                    <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent">
                        <h3 className="text-white font-medium">{title}</h3>
                    </div>
                )}

                {/* Controls - Only visible when hovering or paused */}
                <div
                    className={`absolute inset-0 flex flex-col justify-end transition-opacity duration-300 ${isHovering || !isPlaying ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    {/* Play/Pause Button Overlay - Center of video */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <button
                            onClick={togglePlay}
                            className="p-4 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors"
                        >
                            {isPlaying ? (
                                <Pause className="w-8 h-8 text-white" />
                            ) : (
                                <Play className="w-8 h-8 text-white" />
                            )}
                        </button>
                    </div>

                    {/* Progress Bar and Controls */}
                    <div className="bg-gradient-to-t from-black/70 to-transparent p-4">
                        {/* Progress Bar */}
                        <div
                            className="w-full h-1.5 bg-white/30 rounded-full mb-4 cursor-pointer"
                            onClick={handleProgressClick}
                        >
                            <div
                                className="h-full bg-primary rounded-full"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        {/* Control Bar */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <button onClick={togglePlay} className="text-white hover:text-primary transition-colors">
                                    {isPlaying ? (
                                        <Pause className="w-5 h-5" />
                                    ) : (
                                        <Play className="w-5 h-5" />
                                    )}
                                </button>
                                <button onClick={toggleMute} className="text-white hover:text-primary transition-colors">
                                    {isMuted ? (
                                        <VolumeX className="w-5 h-5" />
                                    ) : (
                                        <Volume2 className="w-5 h-5" />
                                    )}
                                </button>
                                <span className="text-white text-xs">
                                    {formatTime(currentTime)} / {formatTime(duration)}
                                </span>
                            </div>
                            <button onClick={toggleFullscreen} className="text-white hover:text-primary transition-colors">
                                {isFullscreen ? (
                                    <Minimize className="w-5 h-5" />
                                ) : (
                                    <Maximize className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Video Description - Below the player */}
            {description && (
                <div className="mt-2 text-sm text-muted-foreground">
                    {description}
                </div>
            )}
        </div>
    );
};