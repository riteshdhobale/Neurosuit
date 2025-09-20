import React, { useEffect, useState } from 'react';
import BlackGreyDNAHelix from '@/components/BlackGreyDNAHelix';
import TabNavigation from '@/components/ui/tab-navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Brain, Activity, Sparkles, ArrowUpRight, ArrowDownRight, Zap, Star, Clock, BarChart3, Calendar, Settings, Waves, Users, TrendingUp } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { NEUROTRANSMITTERS, BRAIN_REGIONS } from '@/types/neurochemical';
import { DopaminePoint, ACTIVITY_PRESETS } from '@/types/dopamine';

// Sample data for our dashboard visualizations
const generateDopamineData = () => {
    // Generate a realistic dopamine curve over a day
    const data: DopaminePoint[] = [];
    const now = new Date();
    const currentHour = now.getHours();

    // Generate data for the past 24 hours
    for (let i = 0; i < 24; i++) {
        const hour = (currentHour - 23 + i + 24) % 24;
        const timeString = `${hour.toString().padStart(2, '0')}:00`;

        // Base level that varies throughout day
        let baseLevel = 100; // Baseline dopamine level

        // Morning rise
        if (hour >= 6 && hour < 10) {
            baseLevel += 20 + (hour - 6) * 10;
        }

        // Afternoon slump
        if (hour >= 14 && hour < 17) {
            baseLevel -= 15;
        }

        // Evening recovery
        if (hour >= 19 && hour < 22) {
            baseLevel += 10;
        }

        // Night decline
        if (hour >= 22 || hour < 5) {
            baseLevel -= 20;
        }

        // Add some randomness
        const randomVariance = Math.random() * 30 - 15;
        const level = Math.max(50, Math.min(200, baseLevel + randomVariance));

        // Determine if this is a key activity time
        let activity: string | undefined = undefined;
        let type: 'spike' | 'crash' | 'baseline' | 'decline' | undefined = undefined;

        if (hour === 7) {
            activity = 'Morning Exercise';
            type = 'spike';
        } else if (hour === 10) {
            activity = 'Deep Work Session';
            type = 'spike';
        } else if (hour === 13) {
            activity = 'Mindful Lunch';
            type = 'baseline';
        } else if (hour === 16) {
            activity = 'Social Media Break';
            type = 'crash';
        } else if (hour === 19) {
            activity = 'Evening Meditation';
            type = 'spike';
        } else if (hour === 22) {
            activity = 'Screen Time';
            type = 'decline';
        }

        data.push({
            time: timeString,
            level,
            activity,
            type
        });
    }

    return data;
};

const dopamineData = generateDopamineData();

// Weekly overview data
const weeklyOverview = [
    { day: 'Mon', score: 72, goal: 70 },
    { day: 'Tue', score: 65, goal: 70 },
    { day: 'Wed', score: 78, goal: 70 },
    { day: 'Thu', score: 82, goal: 70 },
    { day: 'Fri', score: 85, goal: 70 },
    { day: 'Sat', score: 92, goal: 70 },
    { day: 'Sun', score: 88, goal: 70 },
];

// Neurotransmitter balance data
const neurotransmitterData = [
    { name: 'Dopamine', value: 78, color: '#FFD700', strokeColor: '#BF9B30' },
    { name: 'Serotonin', value: 65, color: '#3B82F6', strokeColor: '#1D4ED8' },
    { name: 'GABA', value: 60, color: '#10B981', strokeColor: '#047857' },
    { name: 'Glutamate', value: 72, color: '#EF4444', strokeColor: '#B91C1C' },
    { name: 'Acetylcholine', value: 85, color: '#A855F7', strokeColor: '#7E22CE' },
    { name: 'Norepinephrine', value: 68, color: '#F97316', strokeColor: '#C2410C' },
];

// Activity impact data
const activityImpactData = [
    { name: 'Exercise', positive: 85, negative: 0 },
    { name: 'Meditation', positive: 65, negative: 0 },
    { name: 'Deep Work', positive: 75, negative: 0 },
    { name: 'Social Media', positive: 5, negative: 65 },
    { name: 'Gaming', positive: 15, negative: 55 },
    { name: 'Screen Time', positive: 10, negative: 40 },
];

// Top recommended activities
const recommendedActivities = [
    { name: 'Morning Cardio', impact: 'High', time: '20 min', type: 'physical' },
    { name: 'Deep Meditation', impact: 'Medium', time: '15 min', type: 'mindfulness' },
    { name: 'Cold Exposure', impact: 'Very High', time: '5 min', type: 'physical' },
    { name: 'Creative Work', impact: 'High', time: '45 min', type: 'creative' }
];

// Key metrics
const keyMetrics = [
    {
        title: "Current Baseline",
        value: "78%",
        trend: "+12%",
        status: "positive",
        icon: TrendingUp,
        description: "Your dopamine baseline is healthy and stable"
    },
    {
        title: "Recovery Rate",
        value: "85%",
        trend: "+5%",
        status: "positive",
        icon: Zap,
        description: "Neural recovery after dopamine spikes"
    },
    {
        title: "Reward Sensitivity",
        value: "62%",
        trend: "-8%",
        status: "negative",
        icon: Sparkles,
        description: "Sensitivity to natural rewards and activities"
    },
    {
        title: "Streak",
        value: "6 days",
        trend: "",
        status: "neutral",
        icon: Star,
        description: "Consecutive days of balanced activity"
    }
];

const Dashboard = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = Math.min(scrolled / maxScroll, 1);
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);

        // Simulate loading for a premium feel
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timer);
        };
    }, []);

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
                        <p className="mt-4 text-primary font-medium">Loading neural data...</p>
                    </div>
                </div>
            ) : (
                /* Dashboard Content */
                <div className="container mx-auto p-6 max-w-7xl">
                    {/* Dashboard Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-purple-400 to-accent bg-clip-text text-transparent">
                                Neural Command Center
                            </h1>
                            <p className="text-muted-foreground mt-1">
                                Monitor your brain's neurochemical balance and optimize your dopamine cycle
                            </p>
                        </div>

                        <div className="flex items-center gap-3 mt-4 md:mt-0">
                            <div className="flex items-center bg-card rounded-lg px-3 py-1.5 border border-border">
                                <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                                <span className="text-sm font-medium">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                            <button className="p-2 rounded-lg bg-card border border-border hover:bg-accent/10 transition-colors">
                                <Settings className="w-4 h-4 text-muted-foreground" />
                            </button>
                        </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {keyMetrics.map((metric, i) => (
                            <Card key={i} className="bg-card/80 backdrop-blur-sm border-border/80 overflow-hidden group hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                                            <div className="flex items-baseline mt-1 gap-2">
                                                <h3 className="text-2xl font-bold">{metric.value}</h3>
                                                {metric.trend && (
                                                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${metric.status === 'positive' ? 'bg-emerald-500/10 text-emerald-500' :
                                                        metric.status === 'negative' ? 'bg-rose-500/10 text-rose-500' :
                                                            'bg-blue-500/10 text-blue-500'
                                                        }`}>
                                                        {metric.trend}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
                                        </div>
                                        <div className={`p-2 rounded-lg ${metric.status === 'positive' ? 'bg-emerald-500/10 text-emerald-500' :
                                            metric.status === 'negative' ? 'bg-rose-500/10 text-rose-500' :
                                                'bg-blue-500/10 text-blue-500'
                                            } group-hover:scale-110 transition-transform`}>
                                            <metric.icon className="w-5 h-5" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Main Chart & Recommendations */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                        {/* Main Dopamine Chart */}
                        <Card className="col-span-1 lg:col-span-2 bg-card/80 backdrop-blur-sm border-border/80 overflow-hidden">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <div>
                                    <CardTitle className="text-lg font-semibold">Dopamine Dynamics</CardTitle>
                                    <CardDescription>24-hour neurochemical activity</CardDescription>
                                </div>
                                <div className="flex gap-2">
                                    <button className="px-2.5 py-1 text-xs bg-primary/10 text-primary rounded-md">24H</button>
                                    <button className="px-2.5 py-1 text-xs bg-transparent hover:bg-muted rounded-md">7D</button>
                                    <button className="px-2.5 py-1 text-xs bg-transparent hover:bg-muted rounded-md">30D</button>
                                </div>
                            </CardHeader>
                            <CardContent className="pb-4">
                                <div className="h-[350px] mt-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={dopamineData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="dopamineGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.8} />
                                                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.2} />
                                                </linearGradient>
                                                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                                    <feGaussianBlur stdDeviation="4" result="blur" />
                                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                                </filter>
                                            </defs>
                                            <XAxis
                                                dataKey="time"
                                                axisLine={{ stroke: '#444' }}
                                                tickLine={false}
                                                tick={{ fontSize: 12, fill: "#ffffff" }}
                                                tickFormatter={(value) => value}
                                            />
                                            <YAxis
                                                axisLine={{ stroke: '#444' }}
                                                tickLine={false}
                                                tick={{ fontSize: 12, fill: "#ffffff" }}
                                                domain={[50, 250]}
                                                tickFormatter={(value) => value.toString()}
                                                stroke="#888"
                                                tickCount={5}
                                            />
                                            <ChartTooltip
                                                content={({ active, payload, label }) => {
                                                    if (active && payload && payload.length) {
                                                        const data = payload[0].payload;
                                                        return (
                                                            <div className="bg-black/80 backdrop-blur-md border border-purple-500/30 p-3 rounded-lg shadow-lg shadow-purple-500/20">
                                                                <p className="font-medium text-white">{label}</p>
                                                                <p className="text-sm text-gray-300 mt-1">
                                                                    Level: <span className="font-medium text-white">{data.level}</span>
                                                                </p>
                                                                {data.activity && (
                                                                    <p className="text-sm text-gray-300 mt-1">
                                                                        Activity: <span className="font-medium text-white">{data.activity}</span>
                                                                    </p>
                                                                )}
                                                                {data.type && (
                                                                    <div className="flex items-center mt-1.5">
                                                                        <span className={`text-xs px-1.5 py-0.5 rounded-full ${data.type === 'spike' ? 'bg-emerald-500/40 text-emerald-300 border border-emerald-500/50' :
                                                                                data.type === 'crash' ? 'bg-rose-500/40 text-rose-300 border border-rose-500/50' :
                                                                                    data.type === 'baseline' ? 'bg-blue-500/40 text-blue-300 border border-blue-500/50' :
                                                                                        'bg-amber-500/40 text-amber-300 border border-amber-500/50'
                                                                            }`}>
                                                                            {data.type.charAt(0).toUpperCase() + data.type.slice(1)}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );
                                                    }
                                                    return null;
                                                }}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="level"
                                                stroke="#8B5CF6"
                                                fill="url(#dopamineGradient)"
                                                strokeWidth={3}
                                                filter="url(#glow)"
                                                activeDot={{
                                                    r: 8,
                                                    stroke: '#111',
                                                    strokeWidth: 3,
                                                    fill: '#8B5CF6',
                                                    filter: 'drop-shadow(0 0 4px rgba(139, 92, 246, 0.8))'
                                                }}
                                                dot={{
                                                    r: 0,
                                                    strokeWidth: 0
                                                }}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>

                                {/* Legend */}
                                <div className="flex flex-wrap gap-4 mt-4 justify-center p-3 bg-black/30 backdrop-blur-sm rounded-lg border border-purple-500/30 shadow-inner shadow-purple-500/10">
                                    <div className="flex items-center gap-1.5">
                                        <span className="block w-4 h-4 rounded-full bg-emerald-500 border-2 border-emerald-700 shadow-lg shadow-emerald-500/50"></span>
                                        <span className="text-xs font-medium text-white">Spike</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="block w-4 h-4 rounded-full bg-rose-500 border-2 border-rose-700 shadow-lg shadow-rose-500/50"></span>
                                        <span className="text-xs font-medium text-white">Crash</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="block w-4 h-4 rounded-full bg-blue-500 border-2 border-blue-700 shadow-lg shadow-blue-500/50"></span>
                                        <span className="text-xs font-medium text-white">Baseline</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="block w-4 h-4 rounded-full bg-amber-500 border-2 border-amber-700 shadow-lg shadow-amber-500/50"></span>
                                        <span className="text-xs font-medium text-white">Decline</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recommendations */}
                        <Card className="bg-card/80 backdrop-blur-sm border-border/80 overflow-hidden">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <div>
                                    <CardTitle className="text-lg font-semibold">Neural Optimizer</CardTitle>
                                    <CardDescription>Recommended activities</CardDescription>
                                </div>
                                <button className="p-1.5 rounded-md hover:bg-muted">
                                    <Settings className="h-4 w-4 text-muted-foreground" />
                                </button>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {recommendedActivities.map((activity, i) => (
                                        <div key={i} className="flex items-center gap-3 group">
                                            <div className={`p-2.5 rounded-lg ${activity.type === 'physical' ? 'bg-blue-500/10' :
                                                activity.type === 'mindfulness' ? 'bg-purple-500/10' :
                                                    'bg-amber-500/10'
                                                } group-hover:scale-110 transition-transform`}>
                                                {activity.type === 'physical' ? (
                                                    <Activity className="w-4 h-4 text-blue-500" />
                                                ) : activity.type === 'mindfulness' ? (
                                                    <Waves className="w-4 h-4 text-purple-500" />
                                                ) : (
                                                    <Sparkles className="w-4 h-4 text-amber-500" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium">{activity.name}</p>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <div className="flex items-center">
                                                        <Clock className="w-3 h-3 text-muted-foreground mr-1" />
                                                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                                                    </div>
                                                    <div className="w-1 h-1 bg-muted-foreground/30 rounded-full"></div>
                                                    <div className="flex items-center">
                                                        <Zap className="w-3 h-3 text-muted-foreground mr-1" />
                                                        <span className="text-xs text-muted-foreground">{activity.impact}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="p-2 rounded-full hover:bg-muted">
                                                <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                                            </button>
                                        </div>
                                    ))}

                                    <button className="w-full flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary py-2 px-3 rounded-md font-medium text-sm mt-4 transition-colors">
                                        <span>View all recommendations</span>
                                        <ArrowUpRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Bottom Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Weekly Overview */}
                        <Card className="bg-card/80 backdrop-blur-sm border-border/80 overflow-hidden">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <div>
                                    <CardTitle className="text-lg font-semibold">Weekly Overview</CardTitle>
                                    <CardDescription>Dopamine baseline trend</CardDescription>
                                </div>
                                <BarChart3 className="w-4 h-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="h-[220px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={weeklyOverview} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="weeklyBarGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="#60A5FA" stopOpacity={1} />
                                                    <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.8} />
                                                </linearGradient>
                                                <filter id="barGlow" x="-50%" y="-50%" width="200%" height="200%">
                                                    <feGaussianBlur stdDeviation="3" result="blur" />
                                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                                </filter>
                                            </defs>
                                            <XAxis
                                                dataKey="day"
                                                axisLine={{ stroke: '#444' }}
                                                tickLine={false}
                                                tick={{ fontSize: 12, fill: "#ffffff" }}
                                            />
                                            <YAxis
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fontSize: 12, fill: "#ffffff" }}
                                                domain={[0, 100]}
                                                tickCount={5}
                                            />
                                            <ChartTooltip
                                                cursor={{ fill: 'rgba(120, 120, 120, 0.2)' }}
                                                content={({ active, payload, label }) => {
                                                    if (active && payload && payload.length) {
                                                        return (
                                                            <div className="bg-black/80 backdrop-blur-md border border-blue-500/30 p-3 rounded-lg shadow-lg shadow-blue-500/20">
                                                                <p className="font-medium text-white">{label}</p>
                                                                <p className="text-sm text-gray-300 mt-1">
                                                                    Score: <span className="font-medium text-blue-300">{payload[0].value}</span>
                                                                </p>
                                                                <p className="text-sm text-gray-300 mt-1">
                                                                    Goal: <span className="font-medium text-gray-300">{payload[1].value}</span>
                                                                </p>
                                                            </div>
                                                        );
                                                    }
                                                    return null;
                                                }}
                                            />
                                            <Bar
                                                dataKey="score"
                                                fill="url(#weeklyBarGradient)"
                                                radius={[4, 4, 0, 0]}
                                                barSize={24}
                                                stroke="#1D4ED8"
                                                strokeWidth={1}
                                                filter="url(#barGlow)"
                                            />
                                            <Bar
                                                dataKey="goal"
                                                fill="rgba(255, 255, 255, 0.2)"
                                                radius={[4, 4, 0, 0]}
                                                barSize={24}
                                                strokeDasharray="3 3"
                                                stroke="#FFFFFF"
                                                strokeWidth={1}
                                                fillOpacity={0.3}
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Neurotransmitter Balance */}
                        <Card className="bg-card/80 backdrop-blur-sm border-border/80 overflow-hidden">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <div>
                                    <CardTitle className="text-lg font-semibold">Neural Balance</CardTitle>
                                    <CardDescription>Key neurotransmitter levels</CardDescription>
                                </div>
                                <Brain className="w-4 h-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="h-[220px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={neurotransmitterData}
                                            layout="vertical"
                                            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                                        >
                                            <defs>
                                                {neurotransmitterData.map((entry, index) => (
                                                    <filter key={`glow-${index}`} id={`glow-${entry.name}`} x="-20%" y="-20%" width="140%" height="140%">
                                                        <feGaussianBlur stdDeviation="2" result="blur" />
                                                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                                    </filter>
                                                ))}
                                            </defs>
                                            <XAxis
                                                type="number"
                                                axisLine={{ stroke: '#444' }}
                                                tickLine={false}
                                                tick={{ fontSize: 12, fill: "#ffffff" }}
                                                domain={[0, 100]}
                                                tickCount={5}
                                            />
                                            <YAxis
                                                dataKey="name"
                                                type="category"
                                                axisLine={{ stroke: '#444' }}
                                                tickLine={false}
                                                tick={{ fontSize: 12, fill: "#ffffff", fontWeight: 500 }}
                                                width={110}
                                            />
                                            <ChartTooltip
                                                cursor={{ fill: 'rgba(120, 120, 120, 0.2)' }}
                                                content={({ active, payload, label }) => {
                                                    if (active && payload && payload.length) {
                                                        const data = payload[0].payload;
                                                        return (
                                                            <div className="bg-black/80 backdrop-blur-md border border-gray-500/30 p-3 rounded-lg shadow-lg" style={{ borderColor: `${data.color}50` }}>
                                                                <p className="font-medium text-white">{label}</p>
                                                                <p className="text-sm text-gray-300 mt-1">
                                                                    Level: <span className="font-medium" style={{ color: data.color }}>{payload[0].value}%</span>
                                                                </p>
                                                            </div>
                                                        );
                                                    }
                                                    return null;
                                                }}
                                            />
                                            <Bar
                                                dataKey="value"
                                                radius={[0, 6, 6, 0]}
                                                barSize={20}
                                                label={{
                                                    position: 'right',
                                                    fill: '#ffffff',
                                                    formatter: (value) => `${value}%`,
                                                    fontSize: 12,
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                {neurotransmitterData.map((entry, index) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={entry.color}
                                                        stroke={entry.strokeColor}
                                                        strokeWidth={1.5}
                                                        filter={`url(#glow-${entry.name})`}
                                                    />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Activity Impact */}
                        <Card className="bg-card/80 backdrop-blur-sm border-border/80 overflow-hidden">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <div>
                                    <CardTitle className="text-lg font-semibold">Activity Impact</CardTitle>
                                    <CardDescription>Reward system effects</CardDescription>
                                </div>
                                <Activity className="w-4 h-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="h-[220px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={activityImpactData}
                                            margin={{ top: 20, right: 0, left: -20, bottom: 0 }}
                                            barGap={0}
                                            barCategoryGap={8}
                                        >
                                            <defs>
                                                <linearGradient id="positiveGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="#34D399" stopOpacity={1} />
                                                    <stop offset="100%" stopColor="#10B981" stopOpacity={0.8} />
                                                </linearGradient>
                                                <linearGradient id="negativeGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="#F87171" stopOpacity={1} />
                                                    <stop offset="100%" stopColor="#EF4444" stopOpacity={0.8} />
                                                </linearGradient>
                                                <filter id="positiveGlow" x="-20%" y="-20%" width="140%" height="140%">
                                                    <feGaussianBlur stdDeviation="2" result="blur" />
                                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                                </filter>
                                                <filter id="negativeGlow" x="-20%" y="-20%" width="140%" height="140%">
                                                    <feGaussianBlur stdDeviation="2" result="blur" />
                                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                                </filter>
                                            </defs>
                                            <XAxis
                                                dataKey="name"
                                                axisLine={{ stroke: '#444' }}
                                                tickLine={false}
                                                tick={{ fontSize: 12, fill: "#ffffff" }}
                                            />
                                            <YAxis
                                                axisLine={{ stroke: '#444' }}
                                                tickLine={false}
                                                tick={{ fontSize: 12, fill: "#ffffff" }}
                                                domain={[0, 100]}
                                                tickCount={5}
                                            />
                                            <ChartTooltip
                                                cursor={{ fill: 'rgba(120, 120, 120, 0.2)' }}
                                                content={({ active, payload, label }) => {
                                                    if (active && payload && payload.length) {
                                                        return (
                                                            <div className="bg-black/80 backdrop-blur-md border border-gray-500/30 p-3 rounded-lg shadow-lg">
                                                                <p className="font-medium text-white">{label}</p>
                                                                {Number(payload[0].value) > 0 && (
                                                                    <p className="text-sm text-gray-300 mt-1">
                                                                        Positive: <span className="font-medium text-emerald-400">{payload[0].value}%</span>
                                                                    </p>
                                                                )}
                                                                {Number(payload[1].value) > 0 && (
                                                                    <p className="text-sm text-gray-300 mt-1">
                                                                        Negative: <span className="font-medium text-rose-400">{payload[1].value}%</span>
                                                                    </p>
                                                                )}
                                                            </div>
                                                        );
                                                    }
                                                    return null;
                                                }}
                                            />
                                            <Bar
                                                dataKey="positive"
                                                fill="url(#positiveGradient)"
                                                stroke="#047857"
                                                strokeWidth={1}
                                                radius={[4, 4, 0, 0]}
                                                barSize={18}
                                                filter="url(#positiveGlow)"
                                            />
                                            <Bar
                                                dataKey="negative"
                                                fill="url(#negativeGradient)"
                                                stroke="#B91C1C"
                                                strokeWidth={1}
                                                radius={[0, 0, 4, 4]}
                                                barSize={18}
                                                filter="url(#negativeGlow)"
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
