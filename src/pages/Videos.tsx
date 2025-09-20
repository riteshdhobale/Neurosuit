import React from 'react';
import TabNavigation from '@/components/ui/tab-navigation';
import { VideoGallery } from '@/components/VideoGallery';
import { motion } from 'framer-motion';
import { Film, Upload, HelpCircle, Share2 } from 'lucide-react';

// Your actual video data with real video files
const sampleVideos = [
    {
        id: '3',
        title: 'Animated Tutorial Creation',
        description: 'How to create engaging animated tutorials explaining complex neuroscience concepts.',
        src: '/videos/Animated Tutorial Video Creation.mp4',
        poster: '/placeholder.svg',
        category: 'tutorials',
        featured: true
    },
    {
        id: '2',
        title: 'The Critical Timing of Dopamine',
        description: 'Learn the precise neurochemical timing that drives human behavior and motivation.',
        src: '/videos/Dopamine Timing Research Video.mp4',
        poster: '/placeholder.svg',
        category: 'research'
    },
    {
        id: '1',
        title: 'The Action-Motivation Myth',
        description: 'Discover why waiting for motivation is a scientific misconception and how to overcome it.',
        src: '/videos/Action Motivation Myth Video.mp4',
        poster: '/placeholder.svg',
        category: 'education'
    }
];

const Videos = () => {
    return (
        <div className="min-h-screen bg-background">
            {/* Navigation Tabs */}
            <TabNavigation />

            {/* Content */}
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Header */}
                <motion.div
                    className="text-center mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-purple-400 to-blue-500 bg-clip-text text-transparent">
                        Video Learning Center
                    </h1>
                    <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
                        Explore our collection of neuroscience videos about dopamine, motivation, and building better habits
                    </p>
                </motion.div>

                {/* Instructions for integrating videos */}
                <motion.div
                    className="mb-10 p-6 border border-blue-500/20 rounded-xl bg-blue-500/5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <div className="flex flex-col md:flex-row items-start gap-6">
                        <div className="p-3 rounded-full bg-blue-500/20 text-blue-400">
                            <HelpCircle className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2">Adding Your Videos</h3>
                            <p className="text-muted-foreground mb-4">
                                To add your own videos to this gallery, place your video files in the <code className="bg-muted px-1.5 py-0.5 rounded">/public/videos/</code> directory and update the video paths in the <code className="bg-muted px-1.5 py-0.5 rounded">Videos.tsx</code> component.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                                <div className="p-4 bg-card rounded-lg border border-border">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 rounded-full bg-blue-500/20 text-blue-400">
                                            <Upload className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-1">1. Upload Videos</h4>
                                            <p className="text-sm text-muted-foreground">Place video files in the public/videos folder</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 bg-card rounded-lg border border-border">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 rounded-full bg-blue-500/20 text-blue-400">
                                            <Film className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-1">2. Create Thumbnails</h4>
                                            <p className="text-sm text-muted-foreground">Add thumbnail images for better previews</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 bg-card rounded-lg border border-border">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 rounded-full bg-blue-500/20 text-blue-400">
                                            <Share2 className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-1">3. Update Component</h4>
                                            <p className="text-sm text-muted-foreground">Edit the video array in the Videos.tsx file</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Video Gallery */}
                <VideoGallery videos={sampleVideos} />
            </div>
        </div>
    );
};

export default Videos;