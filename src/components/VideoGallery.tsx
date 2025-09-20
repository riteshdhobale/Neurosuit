import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { VideoPlayer } from './VideoPlayer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PlayCircle, Film, Sparkles, BookOpen } from 'lucide-react';

// Define video structure
interface Video {
    id: string;
    title: string;
    description: string;
    src: string;
    poster?: string; // Thumbnail image
    category: string;
    featured?: boolean;
}

interface VideoGalleryProps {
    videos: Video[];
    className?: string;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring" as const,
            stiffness: 100,
            damping: 15
        }
    }
};

export const VideoGallery: React.FC<VideoGalleryProps> = ({ videos, className = '' }) => {
    const [activeTab, setActiveTab] = useState('all');
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    // Get unique categories
    const categories = ['all', ...Array.from(new Set(videos.map(video => video.category)))];

    // Filter videos by category
    const filteredVideos = activeTab === 'all'
        ? videos
        : videos.filter(video => video.category === activeTab);

    // Get featured video if available, otherwise use the first video
    const featuredVideo = videos.find(video => video.featured) || videos[0];

    return (
        <div className={className}>
            <motion.div
                ref={ref}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={containerVariants}
                className="space-y-8"
            >
                {/* Main featured video section */}
                {featuredVideo && !selectedVideo && (
                    <motion.div variants={itemVariants} className="mb-8">
                        <div className="flex items-center gap-2 mb-4">
                            <Film className="w-5 h-5 text-primary" />
                            <h2 className="text-2xl font-bold">Featured Video</h2>
                        </div>
                        <VideoPlayer
                            src={featuredVideo.src}
                            poster={featuredVideo.poster}
                            title={featuredVideo.title}
                            description={featuredVideo.description}
                            className="w-full"
                        />
                    </motion.div>
                )}

                {/* Selected video (when user clicks on a thumbnail) */}
                {selectedVideo && (
                    <motion.div
                        variants={itemVariants}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mb-8"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Film className="w-5 h-5 text-primary" />
                                <h2 className="text-2xl font-bold">{selectedVideo.title}</h2>
                            </div>
                            <button
                                onClick={() => setSelectedVideo(null)}
                                className="text-sm text-primary hover:underline"
                            >
                                Back to gallery
                            </button>
                        </div>
                        <VideoPlayer
                            src={selectedVideo.src}
                            poster={selectedVideo.poster}
                            title={selectedVideo.title}
                            description={selectedVideo.description}
                            className="w-full"
                        />
                    </motion.div>
                )}

                {/* Tabs for filtering */}
                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                    <div className="flex justify-center mb-6">
                        <TabsList>
                            {categories.map((category) => (
                                <TabsTrigger key={category} value={category} className="capitalize">
                                    {category}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    {/* Video gallery grid */}
                    <TabsContent value={activeTab} className="mt-0">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {filteredVideos.map((video, idx) => (
                                <motion.div
                                    key={video.id}
                                    variants={itemVariants}
                                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                    className="cursor-pointer"
                                    onClick={() => setSelectedVideo(video)}
                                >
                                    <Card className="overflow-hidden bg-card/80 backdrop-blur-sm border-border/80 hover:border-primary/50 transition-colors">
                                        <div className="aspect-video relative overflow-hidden bg-muted">
                                            {video.poster ? (
                                                <img
                                                    src={video.poster}
                                                    alt={video.title}
                                                    className="object-cover w-full h-full"
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center h-full bg-gradient-to-br from-muted/50 to-muted">
                                                    <Film className="w-12 h-12 text-muted-foreground/40" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                                <PlayCircle className="w-16 h-16 text-white/90" />
                                            </div>
                                        </div>
                                        <CardContent className="p-4">
                                            <h3 className="font-medium text-lg line-clamp-1">{video.title}</h3>
                                            <p className="text-muted-foreground text-sm line-clamp-2 mt-1">
                                                {video.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    </TabsContent>
                </Tabs>

                {/* Help section */}
                <motion.div
                    variants={itemVariants}
                    className="mt-12 p-6 border border-primary/20 rounded-xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10"
                >
                    <div className="flex flex-col md:flex-row items-start gap-6">
                        <div className="p-3 rounded-full bg-primary/20 text-primary">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Need help with your videos?</h3>
                            <p className="text-muted-foreground mb-4">
                                Looking to upload more videos or customize your video experience? Check out our
                                comprehensive guide on video management and best practices.
                            </p>
                            <a href="/videos" className="inline-flex px-5 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors items-center gap-2">
                                <BookOpen className="w-4 h-4" />
                                <span>View Videos</span>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};