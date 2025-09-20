import React, { useEffect, useState } from 'react';
import BlackGreyDNAHelix from '@/components/BlackGreyDNAHelix';
import TabNavigation from '@/components/ui/tab-navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import {
    Activity, Brain, Zap, Trophy, Calendar, Clock,
    Plus, Search, Filter, ArrowUpRight, ChevronRight,
    Star, BarChart3, Sparkles, Users, Lock, Settings,
    X, Smile, Frown, UserRound, ThumbsUp, ThumbsDown,
    Badge
} from 'lucide-react';
import { ACTIVITY_PRESETS, Activity as ActivityType } from '@/types/dopamine';
import { NEUROTRANSMITTERS } from '@/types/neurochemical';

// Generate a unique ID
const generateId = () => Math.random().toString(36).substring(2, 9);

// Convert activity presets to an array of activities with IDs
const generateActivitiesWithTimeAndId = () => {
    const activities: ActivityType[] = [];
    const now = new Date();

    // Add some past activities
    Object.entries(ACTIVITY_PRESETS).forEach(([key, preset], index) => {
        if (index % 3 === 0) { // Only select some activities
            const pastTime = new Date(now);
            pastTime.setHours(pastTime.getHours() - Math.floor(Math.random() * 48)); // Within last 48 hours

            activities.push({
                id: generateId(),
                name: preset.name,
                duration: preset.duration,
                time: `${pastTime.getHours().toString().padStart(2, '0')}:${pastTime.getMinutes().toString().padStart(2, '0')}`,
                type: preset.type,
                dopamineImpact: { ...preset.dopamineImpact }
            });
        }
    });

    return activities.sort((a, b) => {
        const [aHours, aMinutes] = a.time.split(':').map(Number);
        const [bHours, bMinutes] = b.time.split(':').map(Number);
        return (bHours * 60 + bMinutes) - (aHours * 60 + aMinutes);
    });
};

// Prepare activity categories
const activityCategories = [
    { name: "Physical", count: 12, icon: Activity, color: "bg-blue-500/10 text-blue-500" },
    { name: "Mindfulness", count: 8, icon: Brain, color: "bg-purple-500/10 text-purple-500" },
    { name: "Social", count: 5, icon: Users, color: "bg-amber-500/10 text-amber-500" },
    { name: "Creative", count: 7, icon: Sparkles, color: "bg-green-500/10 text-green-500" },
    { name: "Intellectual", count: 10, icon: Trophy, color: "bg-rose-500/10 text-rose-500" },
    { name: "Digital Detox", count: 6, icon: X, color: "bg-slate-500/10 text-slate-500" },
];

// Generate challenge data
const challenges = [
    {
        title: "Morning Flow",
        description: "Start your day with 5 consecutive days of morning meditation and exercise",
        progress: 3,
        total: 5,
        reward: "+20 baseline",
        category: "Mindfulness",
        color: "bg-purple-500/10 text-purple-500 border-purple-500/20"
    },
    {
        title: "Digital Minimalist",
        description: "Limit social media use to 30 minutes per day for 7 days",
        progress: 5,
        total: 7,
        reward: "+15 baseline",
        category: "Digital Detox",
        color: "bg-slate-500/10 text-slate-500 border-slate-500/20"
    },
    {
        title: "Cold Exposure Mastery",
        description: "Complete 10 cold showers (minimum 2 minutes each)",
        progress: 4,
        total: 10,
        reward: "+30 baseline",
        category: "Physical",
        color: "bg-blue-500/10 text-blue-500 border-blue-500/20"
    },
];

// Generate premium challenges
const premiumChallenges = [
    {
        title: "Dopamine Reset Protocol",
        description: "Complete our 21-day scientifically-designed dopamine reset program",
        reward: "+50 baseline permanently",
        category: "Premium",
        locked: true,
        color: "bg-amber-500/10 text-amber-500 border-amber-500/20"
    },
    {
        title: "Deep Work Mastery",
        description: "Build to 4-hour deep work sessions with structured dopamine regulation",
        reward: "+35 reward sensitivity",
        category: "Premium",
        locked: true,
        color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
    },
];

// Generate trending activities
const trendingActivities = [
    { name: "Cold Exposure", impact: "Very High", category: "Physical", growth: "+23%" },
    { name: "Deep Meditation", impact: "High", category: "Mindfulness", growth: "+15%" },
    { name: "Digital Detox Day", impact: "Very High", category: "Digital Detox", growth: "+42%" },
    { name: "Nature Immersion", impact: "Medium", category: "Mindfulness", growth: "+18%" },
];

// Generate Personalized recommendations
const personalizedRecommendations = [
    {
        name: "45-min Flow State Work",
        description: "Based on your previous deep work success pattern",
        impact: "High",
        accuracy: "92%",
        category: "Intellectual"
    },
    {
        name: "5-min Cold Shower",
        description: "Optimal based on your sensitivity profile",
        impact: "Very High",
        accuracy: "89%",
        category: "Physical"
    },
    {
        name: "20-min Nature Walk",
        description: "Recommended following your screen time pattern",
        impact: "Medium",
        accuracy: "95%",
        category: "Mindfulness"
    },
];

// Community activities
const communityActivities = [
    {
        name: "30-Day Cold Shower",
        participants: 2458,
        success: "78%",
        neurotransmitter: "Dopamine",
        color: "#FFD700"
    },
    {
        name: "Digital Minimalism",
        participants: 1789,
        success: "65%",
        neurotransmitter: "Serotonin",
        color: "#3B82F6"
    },
    {
        name: "Morning Meditation",
        participants: 3256,
        success: "82%",
        neurotransmitter: "GABA",
        color: "#10B981"
    },
];

const Activities = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [userActivities, setUserActivities] = useState<ActivityType[]>([]);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = Math.min(scrolled / maxScroll, 1);
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);

        // Simulate loading data
        const timer = setTimeout(() => {
            setUserActivities(generateActivitiesWithTimeAndId());
            setIsLoading(false);
        }, 800);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timer);
        };
    }, []);

    // Filter activities by category and search query
    const filteredActivities = userActivities.filter(activity => {
        const matchesCategory = !selectedCategory || activity.name.toLowerCase().includes(selectedCategory.toLowerCase());
        const matchesSearch = !searchQuery || activity.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-background relative">
            {/* Black/Grey DNA Helix */}
            <BlackGreyDNAHelix scrollProgress={scrollProgress} />

            {/* Navigation Tabs */}
            <TabNavigation />

            {/* Loading State */}
            {isLoading ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                    <div className="flex flex-col items-center">
                        <div className="relative w-16 h-16">
                            <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
                            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                        </div>
                        <p className="mt-4 text-primary font-medium">Loading neural activities...</p>
                    </div>
                </div>
            ) : (
                /* Activities Content */
                <div className="container mx-auto p-6 max-w-7xl">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-purple-400 to-accent bg-clip-text text-transparent">
                                Neural Reward System
                            </h1>
                            <p className="text-muted-foreground mt-1">
                                Engineer your activities for optimal dopamine regulation and neural reward
                            </p>
                        </div>

                        <div className="flex items-center gap-3 mt-4 md:mt-0">
                            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                                <Plus className="w-4 h-4" />
                                <span className="font-medium">Log Activity</span>
                            </button>
                        </div>
                    </div>

                    {/* Search & Filter */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search activities..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-lg bg-card/80 border border-border/80 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                            />
                        </div>
                        <div className="flex gap-2 overflow-auto pb-1 no-scrollbar">
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap
                                    ${!selectedCategory
                                        ? 'bg-primary/20 text-primary border border-primary/30'
                                        : 'bg-card border border-border/80 hover:bg-muted/50'}
                                `}
                            >
                                All
                            </button>
                            {activityCategories.map((category, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedCategory(category.name)}
                                    className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 whitespace-nowrap
                                        ${selectedCategory === category.name
                                            ? 'bg-primary/20 text-primary border border-primary/30'
                                            : 'bg-card border border-border/80 hover:bg-muted/50'}
                                    `}
                                >
                                    <category.icon className="w-3.5 h-3.5" />
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content Sections */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Section - Activity Log & AI Recommendations */}
                        <div className="col-span-1 lg:col-span-2 space-y-8">
                            {/* AI Recommendations */}
                            <Card className="bg-card/80 backdrop-blur-sm border-border/80 overflow-hidden">
                                <CardHeader className="pb-3">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                                <Sparkles className="w-5 h-5 text-primary" />
                                                AI Neural Optimizer
                                            </CardTitle>
                                            <CardDescription>Personalized for your dopamine sensitivity profile</CardDescription>
                                        </div>
                                        <div className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full font-medium">
                                            95% Accuracy
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {personalizedRecommendations.map((recommendation, i) => (
                                            <div key={i} className="flex justify-between items-center p-3 rounded-lg border border-border bg-card/60 hover:bg-card/90 transition-colors group">
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-lg ${recommendation.category === 'Physical' ? 'bg-blue-500/10' :
                                                            recommendation.category === 'Mindfulness' ? 'bg-purple-500/10' :
                                                                recommendation.category === 'Intellectual' ? 'bg-rose-500/10' :
                                                                    'bg-amber-500/10'
                                                        } group-hover:scale-110 transition-transform`}>
                                                        {recommendation.category === 'Physical' ? (
                                                            <Activity className="w-5 h-5 text-blue-500" />
                                                        ) : recommendation.category === 'Mindfulness' ? (
                                                            <Brain className="w-5 h-5 text-purple-500" />
                                                        ) : recommendation.category === 'Intellectual' ? (
                                                            <Trophy className="w-5 h-5 text-rose-500" />
                                                        ) : (
                                                            <Sparkles className="w-5 h-5 text-amber-500" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-semibold">{recommendation.name}</p>
                                                        <p className="text-xs text-muted-foreground mt-1">{recommendation.description}</p>
                                                        <div className="flex items-center gap-3 mt-2">
                                                            <div className="flex items-center gap-1">
                                                                <Zap className="w-3.5 h-3.5 text-amber-500" />
                                                                <span className="text-xs font-medium">{recommendation.impact} Impact</span>
                                                            </div>
                                                            <div className="w-1 h-1 bg-muted-foreground/30 rounded-full"></div>
                                                            <div className="flex items-center gap-1">
                                                                <Brain className="w-3.5 h-3.5 text-primary" />
                                                                <span className="text-xs font-medium">{recommendation.accuracy} Match</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button className="p-1.5 rounded-full hover:bg-muted">
                                                        <ThumbsUp className="w-4 h-4 text-muted-foreground" />
                                                    </button>
                                                    <button className="p-1.5 rounded-full hover:bg-muted">
                                                        <ThumbsDown className="w-4 h-4 text-muted-foreground" />
                                                    </button>
                                                    <button className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors ml-2">
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}

                                        <div className="p-3 rounded-lg border border-primary/20 bg-primary/5 mt-4">
                                            <div className="flex items-center gap-2">
                                                <div className="p-2 rounded-full bg-primary/10">
                                                    <Brain className="w-4 h-4 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">Neural Pattern Detection</p>
                                                    <p className="text-xs text-muted-foreground mt-0.5">
                                                        Our AI analyzes your neurochemical response patterns to recommend optimal activities
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Recent Activities */}
                            <Card className="bg-card/80 backdrop-blur-sm border-border/80 overflow-hidden">
                                <CardHeader className="flex flex-row items-center justify-between pb-3">
                                    <div>
                                        <CardTitle className="text-lg font-semibold">Recent Activities</CardTitle>
                                        <CardDescription>Your latest dopamine-impacting activities</CardDescription>
                                    </div>
                                    <div className="flex gap-1">
                                        <button className="p-1.5 rounded-md hover:bg-muted">
                                            <Filter className="h-4 w-4 text-muted-foreground" />
                                        </button>
                                        <button className="p-1.5 rounded-md hover:bg-muted">
                                            <Settings className="h-4 w-4 text-muted-foreground" />
                                        </button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {filteredActivities.map((activity, i) => (
                                            <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg border border-border bg-card/60 hover:bg-card/90 transition-colors">
                                                <div className={`p-2 rounded-lg ${activity.type === 'good'
                                                        ? 'bg-emerald-500/10 text-emerald-500'
                                                        : 'bg-rose-500/10 text-rose-500'
                                                    }`}>
                                                    {activity.type === 'good' ? (
                                                        <Smile className="w-5 h-5" />
                                                    ) : (
                                                        <Frown className="w-5 h-5" />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between items-start">
                                                        <p className="font-semibold truncate">{activity.name}</p>
                                                        <div className="flex items-center gap-1 ml-2">
                                                            <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                                                            <span className="text-xs text-muted-foreground">{activity.time}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3 mt-1">
                                                        <div className="flex items-center gap-1">
                                                            <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                                                            <span className="text-xs text-muted-foreground">{activity.duration} min</span>
                                                        </div>
                                                        <div className="w-1 h-1 bg-muted-foreground/30 rounded-full"></div>
                                                        <div className="flex items-center gap-1">
                                                            <Zap className="w-3.5 h-3.5 text-muted-foreground" />
                                                            <span className="text-xs text-muted-foreground">
                                                                {activity.type === 'good' ? '+' : '-'}{Math.abs(activity.dopamineImpact.baseline)} baseline
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={`text-xs font-medium px-2 py-0.5 rounded-full ${activity.type === 'good'
                                                        ? 'bg-emerald-500/10 text-emerald-500'
                                                        : 'bg-rose-500/10 text-rose-500'
                                                    }`}>
                                                    {activity.type === 'good' ? 'Positive' : 'Negative'}
                                                </div>
                                            </div>
                                        ))}

                                        <button className="w-full flex items-center justify-center gap-2 bg-card/60 hover:bg-card/90 text-muted-foreground py-3 px-4 rounded-lg border border-border font-medium text-sm mt-4 transition-colors">
                                            <span>View all activity history</span>
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Challenges */}
                            <Card className="bg-card/80 backdrop-blur-sm border-border/80 overflow-hidden">
                                <CardHeader className="flex flex-row items-center justify-between pb-3">
                                    <div>
                                        <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                            <Trophy className="w-5 h-5 text-amber-500" />
                                            Neural Challenges
                                        </CardTitle>
                                        <CardDescription>Complete challenges to permanently raise your dopamine baseline</CardDescription>
                                    </div>
                                    <button className="p-1.5 rounded-md hover:bg-muted">
                                        <Filter className="h-4 w-4 text-muted-foreground" />
                                    </button>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {/* Active Challenges */}
                                        {challenges.map((challenge, i) => (
                                            <div key={i} className={`p-4 rounded-lg border ${challenge.color}`}>
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="font-semibold">{challenge.title}</p>
                                                        <p className="text-xs text-muted-foreground mt-1">{challenge.description}</p>
                                                    </div>
                                                    <div className={`px-2 py-0.5 text-xs font-medium rounded-full ${challenge.color}`}>
                                                        {challenge.category}
                                                    </div>
                                                </div>

                                                {/* Progress Bar */}
                                                <div className="mt-4">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <p className="text-xs font-medium">{challenge.progress}/{challenge.total} completed</p>
                                                        <p className="text-xs font-medium text-amber-500">{challenge.reward}</p>
                                                    </div>
                                                    <div className="h-2 w-full bg-border rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full ${challenge.color.replace('border-', '').replace('/20', '/60')}`}
                                                            style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        {/* Premium Challenges */}
                                        <div className="mt-6 space-y-4">
                                            <h3 className="text-sm font-semibold flex items-center gap-2">
                                                <Badge className="w-4 h-4 text-primary" />
                                                Premium Challenges
                                            </h3>

                                            {premiumChallenges.map((challenge, i) => (
                                                <div key={i} className={`p-4 rounded-lg border ${challenge.color} relative`}>
                                                    <div className="absolute top-3 right-3 p-1 rounded-full bg-muted/70 backdrop-blur-sm">
                                                        <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                                                    </div>

                                                    <div>
                                                        <p className="font-semibold">{challenge.title}</p>
                                                        <p className="text-xs text-muted-foreground mt-1">{challenge.description}</p>
                                                    </div>

                                                    <div className="flex justify-between items-center mt-4">
                                                        <div className={`px-2 py-0.5 text-xs font-medium rounded-full ${challenge.color}`}>
                                                            {challenge.category}
                                                        </div>
                                                        <p className="text-xs font-medium text-amber-500">{challenge.reward}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar - Statistics & Community */}
                        <div className="space-y-8">
                            {/* Activity Stats Card */}
                            <Card className="bg-card/80 backdrop-blur-sm border-border/80 overflow-hidden">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg font-semibold">Activity Stats</CardTitle>
                                    <CardDescription>Your neural reward profile</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {/* Dopamine Balance */}
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <p className="text-sm font-medium">Dopamine Balance</p>
                                            <span className="text-sm font-bold">78%</span>
                                        </div>
                                        <div className="h-2 w-full bg-border rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-amber-500 to-primary rounded-full" style={{ width: '78%' }}></div>
                                        </div>
                                    </div>

                                    {/* Reward Sensitivity */}
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <p className="text-sm font-medium">Reward Sensitivity</p>
                                            <span className="text-sm font-bold">62%</span>
                                        </div>
                                        <div className="h-2 w-full bg-border rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-primary to-blue-500 rounded-full" style={{ width: '62%' }}></div>
                                        </div>
                                    </div>

                                    {/* Weekly Activity Balance */}
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <p className="text-sm font-medium">Positive vs Negative Activities</p>
                                        </div>
                                        <div className="flex items-center h-4 w-full">
                                            <div className="h-4 bg-emerald-500 rounded-l-full" style={{ width: '65%' }}></div>
                                            <div className="h-4 bg-rose-500 rounded-r-full" style={{ width: '35%' }}></div>
                                        </div>
                                        <div className="flex justify-between items-center mt-1">
                                            <span className="text-xs text-muted-foreground">65% Positive</span>
                                            <span className="text-xs text-muted-foreground">35% Negative</span>
                                        </div>
                                    </div>

                                    {/* Key Metrics */}
                                    <div className="grid grid-cols-2 gap-4 pt-2">
                                        <div className="bg-muted/50 p-3 rounded-lg">
                                            <p className="text-xs text-muted-foreground">Activities Today</p>
                                            <p className="text-xl font-bold mt-1">5</p>
                                        </div>
                                        <div className="bg-muted/50 p-3 rounded-lg">
                                            <p className="text-xs text-muted-foreground">Streak</p>
                                            <p className="text-xl font-bold mt-1">6 days</p>
                                        </div>
                                        <div className="bg-muted/50 p-3 rounded-lg">
                                            <p className="text-xs text-muted-foreground">Recovery Rate</p>
                                            <p className="text-xl font-bold mt-1">85%</p>
                                        </div>
                                        <div className="bg-muted/50 p-3 rounded-lg">
                                            <p className="text-xs text-muted-foreground">Balance Score</p>
                                            <p className="text-xl font-bold mt-1">A-</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Trending Activities */}
                            <Card className="bg-card/80 backdrop-blur-sm border-border/80 overflow-hidden">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg font-semibold">Trending Activities</CardTitle>
                                    <CardDescription>Popular in the community</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {trendingActivities.map((activity, i) => (
                                            <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-1.5 rounded-lg ${activity.category === 'Physical' ? 'bg-blue-500/10 text-blue-500' :
                                                            activity.category === 'Mindfulness' ? 'bg-purple-500/10 text-purple-500' :
                                                                'bg-slate-500/10 text-slate-500'
                                                        }`}>
                                                        {activity.category === 'Physical' ? (
                                                            <Activity className="w-4 h-4" />
                                                        ) : activity.category === 'Mindfulness' ? (
                                                            <Brain className="w-4 h-4" />
                                                        ) : (
                                                            <X className="w-4 h-4" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium">{activity.name}</p>
                                                        <div className="flex items-center gap-1 mt-0.5">
                                                            <Zap className="w-3 h-3 text-amber-500" />
                                                            <span className="text-xs text-muted-foreground">{activity.impact} Impact</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="text-xs font-medium text-emerald-500">
                                                    {activity.growth}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Community Challenges */}
                            <Card className="bg-card/80 backdrop-blur-sm border-border/80 overflow-hidden">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                        <Users className="w-5 h-5 text-blue-500" />
                                        Community
                                    </CardTitle>
                                    <CardDescription>Join others optimizing their brains</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {communityActivities.map((activity, i) => (
                                            <div key={i} className="p-3 rounded-lg border border-border hover:bg-card/60 transition-colors">
                                                <div className="flex justify-between">
                                                    <p className="font-medium">{activity.name}</p>
                                                    <button className="text-xs font-medium text-primary">Join</button>
                                                </div>
                                                <div className="flex items-center gap-4 mt-2">
                                                    <div className="flex items-center gap-1">
                                                        <Users className="w-3.5 h-3.5 text-muted-foreground" />
                                                        <span className="text-xs text-muted-foreground">{activity.participants.toLocaleString()}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Trophy className="w-3.5 h-3.5 text-muted-foreground" />
                                                        <span className="text-xs text-muted-foreground">{activity.success} Success</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1.5 mt-2">
                                                    <span className="block w-2 h-2 rounded-full" style={{ backgroundColor: activity.color }}></span>
                                                    <span className="text-xs">{activity.neurotransmitter}</span>
                                                </div>
                                            </div>
                                        ))}

                                        <button className="w-full flex items-center justify-center gap-2 bg-card/60 hover:bg-card/90 text-primary py-2 px-3 rounded-lg border border-primary/20 font-medium text-sm mt-4 transition-colors">
                                            <UserRound className="w-4 h-4" />
                                            <span>View community hub</span>
                                        </button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Activities;
