import React, { useEffect, useState } from 'react';
import BlackGreyDNAHelix from '@/components/BlackGreyDNAHelix';
import TabNavigation from '@/components/ui/tab-navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import {
    Calendar, ChevronDown, Download, Filter, Maximize2, Zap,
    Activity, Brain, TrendingUp, ArrowUpRight, ArrowDownRight,
    Search, BarChart3, PieChart, LineChart, Settings, Clock,
    ArrowRight, CalendarDays, CalendarRange, Layers, Sparkles,
    ArrowUp, ArrowDown, AlertTriangle, CheckCircle2
} from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, LineChart as RechartsLineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Scatter, ScatterChart, ZAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { BRAIN_REGIONS, NEUROTRANSMITTERS } from '@/types/neurochemical';
import { DopaminePoint, ACTIVITY_PRESETS } from '@/types/dopamine';

// Chart theme constants for consistent styling across all visualizations
const CHART_THEME = {
    // Background colors
    bgPrimary: 'rgba(17, 17, 17, 0.4)',
    bgSecondary: 'rgba(28, 28, 28, 0.6)',

    // Text and axis colors
    textPrimary: '#ffffff',
    textSecondary: '#a1a1aa',

    // Grid colors
    gridPrimary: 'rgba(82, 82, 91, 0.2)',
    gridSecondary: 'rgba(82, 82, 91, 0.1)',

    // Accent colors
    accent1: '#8B5CF6', // Purple
    accent2: '#3B82F6', // Blue
    accent3: '#10B981', // Green
    accent4: '#F97316', // Orange
    accent5: '#EF4444', // Red

    // Common chart props
    tooltipStyle: {
        contentStyle: {
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            border: '1px solid rgba(82, 82, 91, 0.3)',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)'
        },
        labelStyle: {
            color: '#ffffff',
            fontWeight: '500',
            marginBottom: '4px'
        },
        itemStyle: {
            color: '#d4d4d8',
            fontSize: '12px'
        }
    }
};

// Generate mock brain region activity data
const generateBrainRegionActivity = () => {
    return BRAIN_REGIONS.map(region => ({
        id: region.id,
        name: region.name,
        activity: Math.floor(Math.random() * 60) + 40, // Random activity level between 40-100
        change: Math.floor(Math.random() * 40) - 20, // Random change between -20 and +20
        color: region.color,
        risk: Math.random() < 0.2 // 20% chance of risk
    }));
};

// Generate long-term dopamine trends (30 days)
const generateMonthlyDopamineData = () => {
    const data = [];
    const now = new Date();

    for (let i = 29; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);

        // Base value with weekly pattern
        let baseLevel = 100 - (i % 7) * 3; // Slight decline within a week

        // Add upward weekly recovery trend
        if (i % 7 === 0) {
            baseLevel += 20; // Weekly reset/recovery
        }

        // Add some trend (improving over time)
        baseLevel += Math.min(i * 0.5, 15);

        // Add randomness
        const randomVariance = Math.random() * 20 - 10;
        const value = Math.max(50, Math.min(200, baseLevel + randomVariance));

        data.push({
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            value: Math.round(value),
            baseline: 70 + Math.min(i * 0.4, 12) // Gradually increasing baseline
        });
    }

    return data;
};

// Generate correlation data between activities and dopamine levels
const generateCorrelationData = () => {
    const correlations = [];
    const activities = ['Cold Shower', 'Exercise', 'Meditation', 'Screen Time', 'Social Media', 'Deep Work', 'Reading', 'Gaming'];

    activities.forEach(activity => {
        const isGood = ['Cold Shower', 'Exercise', 'Meditation', 'Deep Work', 'Reading'].includes(activity);

        correlations.push({
            name: activity,
            dopamineImpact: isGood ? Math.floor(Math.random() * 40) + 30 : -(Math.floor(Math.random() * 30) + 20),
            baselineImpact: isGood ? Math.floor(Math.random() * 30) + 10 : -(Math.floor(Math.random() * 20) + 10),
            frequency: Math.floor(Math.random() * 20) + 5
        });
    });

    return correlations;
};

// Neurotransmitter balance data
const generateNeurotransmitterData = () => {
    return NEUROTRANSMITTERS.map(nt => ({
        name: nt.name,
        value: Math.floor(Math.random() * 60) + 40,
        color: nt.color
    }));
};

// Generate cognitive performance data
const generateCognitiveData = () => {
    return [
        { name: 'Focus', value: 78, fullMark: 100 },
        { name: 'Memory', value: 65, fullMark: 100 },
        { name: 'Processing', value: 82, fullMark: 100 },
        { name: 'Creativity', value: 90, fullMark: 100 },
        { name: 'Problem Solving', value: 75, fullMark: 100 },
        { name: 'Decision Making', value: 70, fullMark: 100 }
    ];
};

// Generate multi-dimensional reward sensitivity data
const generateRewardSensitivityData = () => {
    const data = [];

    // Generate 30 data points with different sensitivity values
    for (let i = 0; i < 30; i++) {
        data.push({
            dopamineLevel: Math.floor(Math.random() * 60) + 40,
            rewardSensitivity: Math.floor(Math.random() * 60) + 40,
            name: `Day ${i + 1}`,
            size: Math.floor(Math.random() * 80) + 40
        });
    }

    return data;
};

// Generate daily activity impact
const generateDailyActivityImpact = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const data = [];

    days.forEach(day => {
        data.push({
            name: day,
            positive: Math.floor(Math.random() * 80) + 20,
            negative: Math.floor(Math.random() * 60)
        });
    });

    return data;
};

// Generate predictive forecast
const generatePredictiveData = () => {
    const data = [];
    const now = new Date();

    // Past data (7 days)
    for (let i = 7; i > 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);

        data.push({
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            actual: Math.floor(Math.random() * 30) + 70,
            predicted: null,
            lower: null,
            upper: null
        });
    }

    // Today
    data.push({
        date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        actual: 82,
        predicted: 80,
        lower: 75,
        upper: 85
    });

    // Future predictions (7 days)
    const lastActual = 82;
    let predicted = lastActual;

    for (let i = 1; i <= 7; i++) {
        const date = new Date(now);
        date.setDate(date.getDate() + i);

        // Generate prediction with slight upward trend
        predicted = Math.min(100, Math.max(50, predicted + (Math.random() * 6 - 3) + 1));
        const range = 4 + i * 0.6; // Increasing uncertainty over time

        data.push({
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            actual: null,
            predicted: Math.round(predicted),
            lower: Math.round(Math.max(40, predicted - range)),
            upper: Math.round(Math.min(100, predicted + range))
        });
    }

    return data;
};

// Insights from data analysis
const dataInsights = [
    {
        title: "Strong correlation between morning exercise and focus",
        description: "Users who exercise before 9 AM show 32% higher focus scores",
        type: "positive"
    },
    {
        title: "Negative impact from late-night screen time detected",
        description: "Screen use after 10 PM correlates with 28% lower baseline next day",
        type: "negative"
    },
    {
        title: "Cold exposure frequency optimization",
        description: "Optimal frequency: 4-5 times per week for maximum dopamine sensitivity",
        type: "recommendation"
    },
    {
        title: "Weekend recovery pattern identified",
        description: "2-day pattern of mindfulness + nature exposure boosts baseline by 22%",
        type: "pattern"
    },
    {
        title: "Prefrontal cortex activity needs attention",
        description: "Activity 18% below your optimal range, affecting decision making",
        type: "alert"
    }
];

const Progress = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [timeframe, setTimeframe] = useState('30D');
    const [brainRegionData, setBrainRegionData] = useState([]);
    const [monthlyDopamineData, setMonthlyDopamineData] = useState([]);
    const [correlationData, setCorrelationData] = useState([]);
    const [neurotransmitterData, setNeurotransmitterData] = useState([]);
    const [cognitiveData, setCognitiveData] = useState([]);
    const [rewardSensitivityData, setRewardSensitivityData] = useState([]);
    const [dailyActivityImpact, setDailyActivityImpact] = useState([]);
    const [predictiveData, setPredictiveData] = useState([]);

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
            setBrainRegionData(generateBrainRegionActivity());
            setMonthlyDopamineData(generateMonthlyDopamineData());
            setCorrelationData(generateCorrelationData());
            setNeurotransmitterData(generateNeurotransmitterData());
            setCognitiveData(generateCognitiveData());
            setRewardSensitivityData(generateRewardSensitivityData());
            setDailyActivityImpact(generateDailyActivityImpact());
            setPredictiveData(generatePredictiveData());
            setIsLoading(false);
        }, 1000);

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
                        <p className="mt-4 text-primary font-medium">Processing neural analytics...</p>
                    </div>
                </div>
            ) : (
                /* Progress Content */
                <div className="container mx-auto max-w-[1400px] px-6 lg:px-8">
                    {/* Header Section - Professional spacing with golden ratio principles */}
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 pt-8">
                        <div className="flex-1 max-w-2xl">
                            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4 bg-gradient-to-r from-primary via-purple-400 to-accent bg-clip-text text-transparent">
                                Neural Analytics Suite
                            </h1>
                            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                                Advanced analysis of your neurochemical patterns and trends with AI-powered insights
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 mt-8 lg:mt-0 lg:flex-shrink-0">
                            <div className="flex items-center bg-card/60 backdrop-blur-sm border border-border/60 rounded-xl p-1 shadow-sm">
                                <button
                                    className={`px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg ${timeframe === '7D' ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
                                    onClick={() => setTimeframe('7D')}
                                >
                                    7D
                                </button>
                                <button
                                    className={`px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg ${timeframe === '30D' ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
                                    onClick={() => setTimeframe('30D')}
                                >
                                    30D
                                </button>
                                <button
                                    className={`px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg ${timeframe === '90D' ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
                                    onClick={() => setTimeframe('90D')}
                                >
                                    90D
                                </button>
                            </div>

                            <div className="flex items-center gap-3">
                                <button className="p-3 rounded-xl bg-card/60 backdrop-blur-sm border border-border/60 hover:bg-card/80 hover:border-border hover:shadow-md transition-all duration-200">
                                    <Download className="w-5 h-5 text-muted-foreground" />
                                </button>
                                <button className="p-3 rounded-xl bg-card/60 backdrop-blur-sm border border-border/60 hover:bg-card/80 hover:border-border hover:shadow-md transition-all duration-200">
                                    <Settings className="w-5 h-5 text-muted-foreground" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Trend Chart - Hero Section with perfect proportions */}
                    <Card className="bg-card/60 backdrop-blur-xl border border-border/60 overflow-hidden mb-16 shadow-xl hover:shadow-2xl transition-all duration-500">
                        <CardHeader className="flex flex-row items-center justify-between pb-6 px-8 pt-8">
                            <div className="flex-1">
                                <CardTitle className="text-2xl font-bold text-foreground mb-2">Dopamine Baseline Trend</CardTitle>
                                <CardDescription className="text-base text-muted-foreground">30-day neural reward system progression with predictive insights</CardDescription>
                            </div>
                            <div className="flex items-center gap-2 bg-muted/30 rounded-xl p-2">
                                <button className="p-2.5 rounded-lg hover:bg-muted/60 transition-all duration-200 group">
                                    <LineChart className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                                </button>
                                <button className="p-2.5 rounded-lg hover:bg-muted/60 transition-all duration-200 group">
                                    <BarChart3 className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                                </button>
                                <button className="p-2.5 rounded-lg hover:bg-muted/60 transition-all duration-200 group">
                                    <Maximize2 className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                                </button>
                            </div>
                        </CardHeader>
                        <CardContent className="px-8 pb-8">
                            <div className="h-[420px] w-full mb-8" style={{ minHeight: "420px" }}>
                                <AreaChart
                                    width={1280}
                                    height={420}
                                    data={monthlyDopamineData}
                                    margin={{ top: 20, right: 40, left: 20, bottom: 60 }}
                                >
                                    <defs>
                                        <linearGradient id="dopamineGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={CHART_THEME.accent1} stopOpacity={0.9} />
                                            <stop offset="50%" stopColor={CHART_THEME.accent1} stopOpacity={0.4} />
                                            <stop offset="95%" stopColor={CHART_THEME.accent1} stopOpacity={0.1} />
                                        </linearGradient>
                                        <filter id="glow" height="300%" width="300%" x="-100%" y="-100%">
                                            <feGaussianBlur stdDeviation="4" result="blur" />
                                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                        </filter>
                                    </defs>
                                    <CartesianGrid
                                        strokeDasharray="2 4"
                                        vertical={false}
                                        stroke={CHART_THEME.gridPrimary}
                                        strokeOpacity={0.3}
                                    />
                                    <XAxis
                                        dataKey="date"
                                        axisLine={{ stroke: CHART_THEME.gridPrimary, strokeWidth: 1 }}
                                        tickLine={false}
                                        tick={{ fontSize: 13, fill: CHART_THEME.textSecondary, fontWeight: 500 }}
                                        height={50}
                                    />
                                    <YAxis
                                        axisLine={{ stroke: CHART_THEME.gridPrimary, strokeWidth: 1 }}
                                        tickLine={false}
                                        tick={{ fontSize: 13, fill: CHART_THEME.textSecondary, fontWeight: 500 }}
                                        domain={[50, 150]}
                                        tickCount={6}
                                    />
                                    <Tooltip
                                        cursor={{
                                            stroke: CHART_THEME.accent1,
                                            strokeWidth: 2,
                                            strokeDasharray: '4 4',
                                            strokeOpacity: 0.5
                                        }}
                                        contentStyle={{
                                            backgroundColor: 'rgba(0, 0, 0, 0.95)',
                                            border: `2px solid ${CHART_THEME.accent1}`,
                                            borderRadius: '16px',
                                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.7)',
                                            backdropFilter: 'blur(20px)',
                                            padding: '16px'
                                        }}
                                        labelStyle={{
                                            color: CHART_THEME.textPrimary,
                                            fontWeight: 600,
                                            marginBottom: '12px',
                                            fontSize: '15px'
                                        }}
                                        formatter={(value: number, name: string) => {
                                            const color = name === "value" ? CHART_THEME.accent1 : CHART_THEME.textSecondary;
                                            const label = name === "value" ? "Daily Value" : "Baseline";
                                            const icon = name === "value" ? "🧠" : "📊";
                                            return [
                                                <div key={name} style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                    padding: '4px 0'
                                                }}>
                                                    <span style={{ fontSize: '16px' }}>{icon}</span>
                                                    <span style={{
                                                        color,
                                                        fontWeight: 'bold',
                                                        fontSize: '16px'
                                                    }}>
                                                        {value}
                                                    </span>
                                                </div>,
                                                <span style={{
                                                    color: CHART_THEME.textSecondary,
                                                    fontSize: '14px'
                                                }}>{label}</span>
                                            ]
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke={CHART_THEME.accent1}
                                        strokeWidth={4}
                                        fill="url(#dopamineGradient)"
                                        animationDuration={1500}
                                        isAnimationActive={true}
                                        dot={false}
                                        activeDot={{
                                            r: 8,
                                            stroke: '#111',
                                            strokeWidth: 3,
                                            fill: CHART_THEME.accent1,
                                            filter: 'url(#glow)'
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="baseline"
                                        stroke={CHART_THEME.textSecondary}
                                        strokeDasharray="5 5"
                                        fill="none"
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                </AreaChart>
                            </div>

                            {/* Key Stats - Professional grid with golden ratio spacing */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                                <div className="bg-gradient-to-br from-muted/40 to-muted/20 backdrop-blur-sm rounded-2xl p-6 border border-border/30 hover:border-border/60 transition-all duration-300 group">
                                    <div className="flex items-center justify-between mb-3">
                                        <p className="text-sm font-medium text-muted-foreground">Average Baseline</p>
                                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                                    </div>
                                    <p className="text-3xl font-bold text-foreground mb-2 group-hover:scale-105 transition-transform">78</p>
                                    <div className="flex items-center gap-2 text-sm">
                                        <ArrowUp className="w-4 h-4 text-emerald-500" />
                                        <span className="text-emerald-500 font-medium">+12%</span>
                                        <span className="text-muted-foreground">this month</span>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-muted/40 to-muted/20 backdrop-blur-sm rounded-2xl p-6 border border-border/30 hover:border-border/60 transition-all duration-300 group">
                                    <div className="flex items-center justify-between mb-3">
                                        <p className="text-sm font-medium text-muted-foreground">Recovery Speed</p>
                                        <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                                    </div>
                                    <p className="text-3xl font-bold text-foreground mb-2 group-hover:scale-105 transition-transform">82%</p>
                                    <div className="flex items-center gap-2 text-sm">
                                        <ArrowUp className="w-4 h-4 text-emerald-500" />
                                        <span className="text-emerald-500 font-medium">+5%</span>
                                        <span className="text-muted-foreground">improvement</span>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-muted/40 to-muted/20 backdrop-blur-sm rounded-2xl p-6 border border-border/30 hover:border-border/60 transition-all duration-300 group">
                                    <div className="flex items-center justify-between mb-3">
                                        <p className="text-sm font-medium text-muted-foreground">Sensitivity Rating</p>
                                        <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></div>
                                    </div>
                                    <p className="text-3xl font-bold text-foreground mb-2 group-hover:scale-105 transition-transform">B+</p>
                                    <div className="flex items-center gap-2 text-sm">
                                        <ArrowDown className="w-4 h-4 text-red-400" />
                                        <span className="text-red-400 font-medium">-3%</span>
                                        <span className="text-muted-foreground">variation</span>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-muted/40 to-muted/20 backdrop-blur-sm rounded-2xl p-6 border border-border/30 hover:border-border/60 transition-all duration-300 group">
                                    <div className="flex items-center justify-between mb-3">
                                        <p className="text-sm font-medium text-muted-foreground">Progress Score</p>
                                        <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
                                    </div>
                                    <p className="text-3xl font-bold text-foreground mb-2 group-hover:scale-105 transition-transform">74/100</p>
                                    <div className="flex items-center gap-2 text-sm">
                                        <ArrowUp className="w-4 h-4 text-emerald-500" />
                                        <span className="text-emerald-500 font-medium">+8</span>
                                        <span className="text-muted-foreground">points</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* AI Neural Insights - Enhanced section with professional spacing */}
                    <div className="mb-16">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                                        <Sparkles className="w-6 h-6 text-primary" />
                                    </div>
                                    AI Neural Insights
                                </h2>
                                <p className="text-muted-foreground">Machine learning-powered analysis of your neurochemical patterns</p>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-all duration-200">
                                <Brain className="w-4 h-4" />
                                <span className="font-medium">View All</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {dataInsights.map((insight, i) => (
                                <Card key={i} className="group relative bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-xl border border-border/60 hover:border-primary/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]">
                                    <div className={`absolute inset-0 bg-gradient-to-r from-${insight.type === 'positive' ? 'emerald' :
                                        insight.type === 'negative' ? 'rose' :
                                            insight.type === 'recommendation' ? 'primary' :
                                                insight.type === 'alert' ? 'amber' :
                                                    insight.type === 'pattern' ? 'blue' : 'primary'
                                        }-500/5 to-transparent`}></div>

                                    <CardContent className="relative p-6">
                                        <div className="flex items-start gap-4">
                                            {insight.type === 'positive' ? (
                                                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                                                    <TrendingUp className="w-5 h-5" />
                                                </div>
                                            ) : insight.type === 'negative' ? (
                                                <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 group-hover:scale-110 transition-transform duration-300">
                                                    <ArrowDownRight className="w-5 h-5" />
                                                </div>
                                            ) : insight.type === 'recommendation' ? (
                                                <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary group-hover:scale-110 transition-transform duration-300">
                                                    <Sparkles className="w-5 h-5" />
                                                </div>
                                            ) : insight.type === 'pattern' ? (
                                                <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform duration-300">
                                                    <Activity className="w-5 h-5" />
                                                </div>
                                            ) : (
                                                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 group-hover:scale-110 transition-transform duration-300">
                                                    <AlertTriangle className="w-5 h-5" />
                                                </div>
                                            )}

                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-foreground leading-tight mb-3 group-hover:text-primary transition-colors">
                                                    {insight.title}
                                                </h3>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    {insight.description}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-border/30">
                                            <div className="flex items-center justify-between">
                                                <span className={`text-xs font-medium px-3 py-1 rounded-full bg-${insight.type === 'positive' ? 'emerald' :
                                                    insight.type === 'negative' ? 'rose' :
                                                        insight.type === 'recommendation' ? 'primary' :
                                                            insight.type === 'alert' ? 'amber' :
                                                                insight.type === 'pattern' ? 'blue' : 'primary'
                                                    }-500/10 text-${insight.type === 'positive' ? 'emerald' :
                                                        insight.type === 'negative' ? 'rose' :
                                                            insight.type === 'recommendation' ? 'primary' :
                                                                insight.type === 'alert' ? 'amber' :
                                                                    insight.type === 'pattern' ? 'blue' : 'primary'
                                                    }-400`}>
                                                    {insight.type.toUpperCase()}
                                                </span>

                                                <button className="text-xs text-muted-foreground hover:text-foreground transition-colors font-medium">
                                                    Learn More →
                                                </button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Analysis Grids - Optimized with psychological spacing principles */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 mb-16">
                        {/* Activity Correlation - Enhanced professional design */}
                        <Card className="bg-card/60 backdrop-blur-xl border border-border/60 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
                            <CardHeader className="pb-6 px-8 pt-8">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-xl font-bold text-foreground mb-2">Activity Impact Analysis</CardTitle>
                                        <CardDescription className="text-base text-muted-foreground">Correlation between activities and dopamine baseline</CardDescription>
                                    </div>
                                    <div className="p-2 rounded-xl bg-muted/30">
                                        <BarChart3 className="w-5 h-5 text-muted-foreground" />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]" style={{ minHeight: "300px" }}>
                                    <BarChart
                                        width={400}
                                        height={300}
                                        data={correlationData}
                                        layout="vertical"
                                        margin={{ top: 20, right: 30, left: 80, bottom: 5 }}
                                    >
                                        <defs>
                                            <linearGradient id="positiveGradient" x1="0" y1="0" x2="1" y2="0">
                                                <stop offset="0%" stopColor={CHART_THEME.accent3} stopOpacity={1} />
                                                <stop offset="100%" stopColor={CHART_THEME.accent3} stopOpacity={0.7} />
                                            </linearGradient>
                                            <linearGradient id="negativeGradient" x1="0" y1="0" x2="1" y2="0">
                                                <stop offset="0%" stopColor={CHART_THEME.accent5} stopOpacity={1} />
                                                <stop offset="100%" stopColor={CHART_THEME.accent5} stopOpacity={0.7} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            horizontal={false}
                                            stroke={CHART_THEME.gridPrimary}
                                        />
                                        <XAxis
                                            type="number"
                                            domain={[-70, 70]}
                                            axisLine={{ stroke: '#444' }}
                                            tickLine={false}
                                            tick={{ fontSize: 12, fill: CHART_THEME.textPrimary }}
                                        />
                                        <YAxis
                                            dataKey="name"
                                            type="category"
                                            axisLine={{ stroke: '#444' }}
                                            tickLine={false}
                                            tick={{ fontSize: 12, fill: CHART_THEME.textPrimary }}
                                            width={70}
                                        />
                                        <Tooltip
                                            cursor={{ fill: 'rgba(120, 120, 120, 0.1)' }}
                                            contentStyle={CHART_THEME.tooltipStyle.contentStyle}
                                            labelStyle={CHART_THEME.tooltipStyle.labelStyle}
                                            formatter={(value: number, name: string, props: any) => {
                                                const data = props.payload;
                                                const color = Number(value) > 0 ? CHART_THEME.accent3 : CHART_THEME.accent5;
                                                let label = name;
                                                if (name === 'dopamineImpact') label = 'Dopamine Impact';
                                                else if (name === 'baselineImpact') label = 'Baseline Impact';
                                                else if (name === 'frequency') label = 'Frequency';

                                                return [
                                                    <span style={{ color, fontWeight: 'bold' }}>
                                                        {name === 'frequency' ? `${value} times` : `${Number(value) > 0 ? '+' : ''}${value}`}
                                                    </span>,
                                                    label
                                                ]
                                            }}
                                        />
                                        <Bar
                                            dataKey="dopamineImpact"
                                            name="dopamineImpact"
                                            radius={[0, 4, 4, 0]}
                                            barSize={15}
                                        >
                                            {correlationData.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={entry.dopamineImpact > 0 ? CHART_THEME.accent3 : CHART_THEME.accent5}
                                                />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Neurotransmitter Balance */}
                        <Card className="bg-card/80 backdrop-blur-sm border-border/80 overflow-hidden">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg font-semibold">Neurotransmitter Balance</CardTitle>
                                <CardDescription>Current neurochemical status</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] flex items-center justify-center" style={{ minHeight: "300px" }}>
                                    <RechartsPieChart width={350} height={300}>
                                        <defs>
                                            {neurotransmitterData.map((entry, index) => (
                                                <filter key={`glow-${index}`} id={`glow-pie-${entry.name}`} height="200%" width="200%" x="-50%" y="-50%">
                                                    <feGaussianBlur stdDeviation="3" result="blur" />
                                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                                </filter>
                                            ))}
                                        </defs>
                                        <Pie
                                            data={neurotransmitterData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            outerRadius={100}
                                            innerRadius={50}
                                            paddingAngle={3}
                                            dataKey="value"
                                            animationDuration={1500}
                                            isAnimationActive={true}
                                            label={({ name, value, x, y }) => (
                                                <text
                                                    x={x}
                                                    y={y}
                                                    fill={CHART_THEME.textPrimary}
                                                    textAnchor={x > 175 ? 'start' : 'end'}
                                                    dominantBaseline="central"
                                                    fontSize="12"
                                                    fontWeight="600"
                                                >
                                                    {`${name}: ${value}%`}
                                                </text>
                                            )}
                                        >
                                            {neurotransmitterData.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={entry.color}
                                                    stroke="#111"
                                                    strokeWidth={2}
                                                    filter={`url(#glow-pie-${entry.name})`}
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={CHART_THEME.tooltipStyle.contentStyle}
                                            labelStyle={CHART_THEME.tooltipStyle.labelStyle}
                                            formatter={(value: number, name: string, props: any) => {
                                                const data = props.payload;
                                                return [
                                                    <span style={{ color: data.color, fontWeight: 'bold' }}>{value}%</span>,
                                                    'Level'
                                                ]
                                            }}
                                        />
                                    </RechartsPieChart>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Brain Activity & Cognitive Function */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                        {/* Brain Region Activity */}
                        <Card className="col-span-1 lg:col-span-2 bg-card/80 backdrop-blur-sm border-border/80 overflow-hidden">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                    <Brain className="w-5 h-5 text-primary" />
                                    Brain Region Analysis
                                </CardTitle>
                                <CardDescription>Activity levels across neural regions</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="max-h-[350px] overflow-auto pr-2">
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="border-b border-border">
                                                <th className="text-left py-2 px-2 font-semibold text-sm">Region</th>
                                                <th className="text-center py-2 px-2 font-semibold text-sm">Activity</th>
                                                <th className="text-center py-2 px-2 font-semibold text-sm">Change</th>
                                                <th className="text-center py-2 px-2 font-semibold text-sm">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {brainRegionData.map((region, i) => (
                                                <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                                                    <td className="py-2.5 px-2">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: region.color }}></div>
                                                            <span className="text-sm font-medium">{region.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-2.5 px-2">
                                                        <div className="flex items-center justify-center">
                                                            <div className="w-full bg-muted rounded-full h-2 max-w-32">
                                                                <div
                                                                    className="h-full rounded-full"
                                                                    style={{
                                                                        width: `${region.activity}%`,
                                                                        backgroundColor: region.risk ? 'var(--amber-500)' : region.color
                                                                    }}
                                                                ></div>
                                                            </div>
                                                            <span className="text-xs ml-2">{region.activity}%</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-2.5 px-2 text-center">
                                                        <span className={`text-xs flex items-center justify-center gap-0.5 ${region.change > 0 ? 'text-emerald-500' : 'text-rose-500'
                                                            }`}>
                                                            {region.change > 0 ? (
                                                                <ArrowUp className="w-3 h-3" />
                                                            ) : (
                                                                <ArrowDown className="w-3 h-3" />
                                                            )}
                                                            {Math.abs(region.change)}%
                                                        </span>
                                                    </td>
                                                    <td className="py-2.5 px-2">
                                                        {region.risk ? (
                                                            <div className="flex items-center justify-center gap-1 text-amber-500">
                                                                <AlertTriangle className="w-4 h-4" />
                                                                <span className="text-xs font-medium">Attention</span>
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center justify-center gap-1 text-emerald-500">
                                                                <CheckCircle2 className="w-4 h-4" />
                                                                <span className="text-xs font-medium">Healthy</span>
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Cognitive Function */}
                        <Card className="bg-card/80 backdrop-blur-sm border-border/80 overflow-hidden">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg font-semibold">Cognitive Function</CardTitle>
                                <CardDescription>Performance across key mental areas</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]" style={{ minHeight: "300px" }}>
                                    <RadarChart width={300} height={300} outerRadius={90} data={cognitiveData}>
                                        <defs>
                                            <filter id="radarGlow" height="200%" width="200%" x="-50%" y="-50%">
                                                <feGaussianBlur stdDeviation="3" result="blur" />
                                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                            </filter>
                                        </defs>
                                        <PolarGrid
                                            stroke={CHART_THEME.gridPrimary}
                                            strokeDasharray="3 3"
                                        />
                                        <PolarAngleAxis
                                            dataKey="name"
                                            tick={{ fontSize: 12, fill: CHART_THEME.textPrimary, fontWeight: 600 }}
                                        />
                                        <PolarRadiusAxis
                                            domain={[0, 100]}
                                            angle={90}
                                            tick={{ fontSize: 10, fill: CHART_THEME.textSecondary }}
                                            tickCount={5}
                                        />
                                        <Radar
                                            name="Cognitive Performance"
                                            dataKey="value"
                                            stroke={CHART_THEME.accent1}
                                            fill={CHART_THEME.accent1}
                                            fillOpacity={0.3}
                                            strokeWidth={3}
                                            dot={{
                                                r: 6,
                                                fill: CHART_THEME.accent1,
                                                stroke: '#111',
                                                strokeWidth: 2
                                            }}
                                            filter="url(#radarGlow)"
                                            animationDuration={1500}
                                            isAnimationActive={true}
                                        />
                                        <Tooltip
                                            contentStyle={CHART_THEME.tooltipStyle.contentStyle}
                                            labelStyle={CHART_THEME.tooltipStyle.labelStyle}
                                            formatter={(value: number, name: string) => [
                                                <span style={{ color: CHART_THEME.accent1, fontWeight: 'bold' }}>{value}%</span>,
                                                'Performance'
                                            ]}
                                        />
                                    </RadarChart>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Multi-dimensional Analysis & Predictive Modeling */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        {/* Multi-dimensional Analysis */}
                        <Card className="bg-card/80 backdrop-blur-sm border-border/80 overflow-hidden">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg font-semibold">Reward Sensitivity Analysis</CardTitle>
                                <CardDescription>Multi-dimensional view of dopamine dynamics</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[350px]" style={{ minHeight: "350px" }}>
                                    <ScatterChart width={400} height={350} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                                        <defs>
                                            <filter id="scatterGlow" height="200%" width="200%" x="-50%" y="-50%">
                                                <feGaussianBlur stdDeviation="2" result="blur" />
                                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                            </filter>
                                        </defs>
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            stroke={CHART_THEME.gridPrimary}
                                        />
                                        <XAxis
                                            type="number"
                                            dataKey="dopamineLevel"
                                            name="Dopamine Level"
                                            domain={[0, 100]}
                                            axisLine={{ stroke: '#444' }}
                                            tickLine={false}
                                            tick={{ fontSize: 12, fill: CHART_THEME.textPrimary }}
                                            label={{
                                                value: 'Dopamine Level',
                                                position: 'bottom',
                                                offset: -5,
                                                style: { textAnchor: 'middle', fill: CHART_THEME.textPrimary }
                                            }}
                                        />
                                        <YAxis
                                            type="number"
                                            dataKey="rewardSensitivity"
                                            name="Reward Sensitivity"
                                            domain={[0, 100]}
                                            axisLine={{ stroke: '#444' }}
                                            tickLine={false}
                                            tick={{ fontSize: 12, fill: CHART_THEME.textPrimary }}
                                            label={{
                                                value: 'Reward Sensitivity',
                                                angle: -90,
                                                position: 'left',
                                                style: { textAnchor: 'middle', fill: CHART_THEME.textPrimary }
                                            }}
                                        />
                                        <ZAxis type="number" dataKey="size" range={[50, 200]} />
                                        <Tooltip
                                            cursor={{ strokeDasharray: '3 3', stroke: CHART_THEME.accent1 }}
                                            contentStyle={CHART_THEME.tooltipStyle.contentStyle}
                                            labelStyle={CHART_THEME.tooltipStyle.labelStyle}
                                            formatter={(value: number, name: string) => {
                                                let label = name;
                                                if (name === 'dopamineLevel') label = 'Dopamine Level';
                                                else if (name === 'rewardSensitivity') label = 'Reward Sensitivity';
                                                else if (name === 'size') label = 'Impact Size';

                                                return [
                                                    <span style={{ color: CHART_THEME.accent1, fontWeight: 'bold' }}>{value}</span>,
                                                    label
                                                ]
                                            }}
                                        />
                                        <Scatter
                                            name="Values"
                                            data={rewardSensitivityData}
                                            fill={CHART_THEME.accent1}
                                            stroke="#111"
                                            strokeWidth={1}
                                            filter="url(#scatterGlow)"
                                            animationDuration={1200}
                                            isAnimationActive={true}
                                        />
                                    </ScatterChart>
                                </div>
                                <div className="mt-4 p-3 rounded-lg bg-muted/30">
                                    <p className="text-sm font-medium">Analysis Insight</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Your data shows a 72% correlation between dopamine levels and reward sensitivity.
                                        Days with balanced activity show optimal sensitivity range of 65-80%.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Predictive Modeling */}
                        <Card className="bg-card/80 backdrop-blur-sm border-border/80 overflow-hidden">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg font-semibold">Predictive Modeling</CardTitle>
                                <CardDescription>AI-generated dopamine baseline forecast</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[350px]" style={{ minHeight: "350px" }}>
                                    <RechartsLineChart width={650} height={350} data={predictiveData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                                        <defs>
                                            <linearGradient id="predictedGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor={CHART_THEME.accent2} stopOpacity={0.3} />
                                                <stop offset="95%" stopColor={CHART_THEME.accent2} stopOpacity={0} />
                                            </linearGradient>
                                            <filter id="lineGlow" height="200%" width="200%" x="-50%" y="-50%">
                                                <feGaussianBlur stdDeviation="3" result="blur" />
                                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                            </filter>
                                        </defs>
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            stroke={CHART_THEME.gridPrimary}
                                        />
                                        <XAxis
                                            dataKey="date"
                                            axisLine={{ stroke: '#444' }}
                                            tickLine={false}
                                            tick={{ fontSize: 12, fill: CHART_THEME.textPrimary }}
                                            label={{
                                                value: 'Date',
                                                position: 'bottom',
                                                offset: -5,
                                                style: { textAnchor: 'middle', fill: CHART_THEME.textPrimary }
                                            }}
                                        />
                                        <YAxis
                                            domain={[40, 100]}
                                            axisLine={{ stroke: '#444' }}
                                            tickLine={false}
                                            tick={{ fontSize: 12, fill: CHART_THEME.textPrimary }}
                                            label={{
                                                value: 'Dopamine Level',
                                                angle: -90,
                                                position: 'left',
                                                style: { textAnchor: 'middle', fill: CHART_THEME.textPrimary }
                                            }}
                                        />
                                        <Tooltip
                                            contentStyle={CHART_THEME.tooltipStyle.contentStyle}
                                            labelStyle={CHART_THEME.tooltipStyle.labelStyle}
                                            formatter={(value: number, name: string) => {
                                                let label = name;
                                                if (name === 'actual') label = 'Actual Level';
                                                else if (name === 'predicted') label = 'Predicted Level';
                                                else if (name === 'upper') label = 'Upper Range';
                                                else if (name === 'lower') label = 'Lower Range';

                                                return [
                                                    <span style={{ color: CHART_THEME.accent1, fontWeight: 'bold' }}>{value}%</span>,
                                                    label
                                                ]
                                            }}
                                        />
                                        {/* Prediction range */}
                                        <Area
                                            type="monotone"
                                            dataKey="upper"
                                            stroke="none"
                                            fill="url(#predictedGradient)"
                                            animationDuration={1500}
                                            isAnimationActive={true}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="lower"
                                            stroke="none"
                                            fill="rgba(17,17,17,0.8)"
                                        />
                                        {/* Actual line */}
                                        <Line
                                            type="monotone"
                                            dataKey="actual"
                                            stroke={CHART_THEME.accent1}
                                            strokeWidth={3}
                                            dot={{
                                                fill: CHART_THEME.accent1,
                                                strokeWidth: 2,
                                                stroke: '#111',
                                                r: 4,
                                                filter: 'url(#lineGlow)'
                                            }}
                                            activeDot={{
                                                r: 6,
                                                fill: CHART_THEME.accent1,
                                                stroke: '#111',
                                                strokeWidth: 2,
                                                filter: 'url(#lineGlow)'
                                            }}
                                            filter="url(#lineGlow)"
                                            animationDuration={1500}
                                            isAnimationActive={true}
                                        />
                                        {/* Prediction line */}
                                        <Line
                                            type="monotone"
                                            dataKey="predicted"
                                            stroke={CHART_THEME.accent2}
                                            strokeWidth={3}
                                            strokeDasharray="5 5"
                                            dot={{
                                                fill: CHART_THEME.accent2,
                                                strokeWidth: 2,
                                                stroke: '#111',
                                                r: 4
                                            }}
                                            filter="url(#lineGlow)"
                                            animationDuration={1800}
                                            isAnimationActive={true}
                                        />
                                    </RechartsLineChart>
                                </div>
                                <div className="flex items-center gap-4 mt-4 justify-center">
                                    <div className="flex items-center gap-1.5">
                                        <span className="block w-3 h-3 rounded-full bg-primary"></span>
                                        <span className="text-xs text-muted-foreground">Actual</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="block w-3 h-3 rounded-full bg-amber-500"></span>
                                        <span className="text-xs text-muted-foreground">Predicted</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="block w-3 h-3 rounded-full bg-amber-500/20"></span>
                                        <span className="text-xs text-muted-foreground">Confidence Range</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Weekly Activity Impact - Enhanced with professional spacing */}
                    <Card className="bg-card/60 backdrop-blur-xl border border-border/60 overflow-hidden mb-16 shadow-xl hover:shadow-2xl transition-all duration-500">
                        <CardHeader className="flex flex-row items-center justify-between pb-6 px-8 pt-8">
                            <div className="flex-1">
                                <CardTitle className="text-2xl font-bold text-foreground mb-2">Weekly Activity Impact</CardTitle>
                                <CardDescription className="text-base text-muted-foreground">Balance of positive and negative activities throughout the week</CardDescription>
                            </div>
                            <div className="flex items-center gap-2 bg-muted/30 rounded-xl p-2">
                                <button className="p-2.5 rounded-lg hover:bg-muted/60 transition-all duration-200 group">
                                    <Calendar className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
                                </button>
                                <button className="p-2.5 rounded-lg hover:bg-muted/60 transition-all duration-200 group">
                                    <BarChart3 className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
                                </button>
                            </div>
                        </CardHeader>
                        <CardContent className="px-8 pb-8">
                            <div className="h-[420px] w-full mb-8" style={{ minHeight: "420px" }}>
                                <BarChart
                                    width={1200}
                                    height={420}
                                    data={dailyActivityImpact}
                                    margin={{ top: 30, right: 50, left: 30, bottom: 80 }}
                                    barGap={6}
                                    barCategoryGap={40}
                                >
                                    <defs>
                                        <linearGradient id="positiveGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={CHART_THEME.accent3} stopOpacity={0.9} />
                                            <stop offset="95%" stopColor={CHART_THEME.accent3} stopOpacity={0.7} />
                                        </linearGradient>
                                        <linearGradient id="negativeGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={CHART_THEME.accent5} stopOpacity={0.9} />
                                            <stop offset="95%" stopColor={CHART_THEME.accent5} stopOpacity={0.7} />
                                        </linearGradient>
                                        <filter id="barShadow" height="200%" width="200%" x="-50%" y="-50%">
                                            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.3" />
                                        </filter>
                                    </defs>
                                    <CartesianGrid
                                        strokeDasharray="2 2"
                                        stroke={CHART_THEME.gridPrimary}
                                        strokeOpacity={0.3}
                                        horizontal={true}
                                        vertical={false}
                                    />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={{ stroke: CHART_THEME.gridPrimary, strokeWidth: 1 }}
                                        tickLine={false}
                                        tick={{
                                            fontSize: 13,
                                            fill: CHART_THEME.textPrimary,
                                            fontWeight: 500
                                        }}
                                        height={50}
                                        label={{
                                            value: 'Day of Week',
                                            position: 'insideBottom',
                                            offset: -10,
                                            style: {
                                                textAnchor: 'middle',
                                                fill: CHART_THEME.textSecondary,
                                                fontSize: '12px',
                                                fontWeight: 500
                                            }
                                        }}
                                    />
                                    <YAxis
                                        axisLine={{ stroke: CHART_THEME.gridPrimary, strokeWidth: 1 }}
                                        tickLine={false}
                                        tick={{
                                            fontSize: 12,
                                            fill: CHART_THEME.textSecondary,
                                            fontWeight: 500
                                        }}
                                        label={{
                                            value: 'Impact Score',
                                            angle: -90,
                                            position: 'insideLeft',
                                            style: {
                                                textAnchor: 'middle',
                                                fill: CHART_THEME.textSecondary,
                                                fontSize: '12px',
                                                fontWeight: 500
                                            }
                                        }}
                                    />
                                    <Tooltip
                                        cursor={{
                                            fill: 'rgba(139, 92, 246, 0.1)',
                                            stroke: CHART_THEME.accent1,
                                            strokeWidth: 1,
                                            strokeDasharray: '4 4'
                                        }}
                                        contentStyle={{
                                            backgroundColor: 'rgba(0, 0, 0, 0.95)',
                                            border: `1px solid ${CHART_THEME.accent1}`,
                                            borderRadius: '12px',
                                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
                                            backdropFilter: 'blur(16px)',
                                            padding: '12px'
                                        }}
                                        labelStyle={{
                                            color: CHART_THEME.textPrimary,
                                            fontWeight: 600,
                                            marginBottom: '8px',
                                            fontSize: '14px'
                                        }}
                                        formatter={(value: number, name: string) => {
                                            const label = name === 'positive' ? 'Positive Impact' : 'Negative Impact';
                                            const color = name === 'positive' ? CHART_THEME.accent3 : CHART_THEME.accent5;
                                            const icon = name === 'positive' ? '↗' : '↘';

                                            return [
                                                <div key={name} style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                    padding: '4px 0'
                                                }}>
                                                    <span style={{ fontSize: '16px' }}>{icon}</span>
                                                    <span style={{
                                                        color: color,
                                                        fontWeight: 'bold',
                                                        fontSize: '15px'
                                                    }}>
                                                        {value}
                                                    </span>
                                                </div>,
                                                <span style={{
                                                    color: CHART_THEME.textSecondary,
                                                    fontSize: '13px'
                                                }}>{label}</span>
                                            ]
                                        }}
                                    />
                                    <Bar
                                        dataKey="positive"
                                        stackId="a"
                                        fill="url(#positiveGradient)"
                                        name="positive"
                                        stroke="rgba(16, 185, 129, 0.8)"
                                        strokeWidth={0.5}
                                        radius={[0, 0, 4, 4]}
                                        filter="url(#barShadow)"
                                        animationDuration={1000}
                                        isAnimationActive={true}
                                    />
                                    <Bar
                                        dataKey="negative"
                                        stackId="a"
                                        fill="url(#negativeGradient)"
                                        name="negative"
                                        stroke="rgba(239, 68, 68, 0.8)"
                                        strokeWidth={0.5}
                                        radius={[4, 4, 0, 0]}
                                        filter="url(#barShadow)"
                                        animationDuration={1200}
                                        isAnimationActive={true}
                                    />
                                </BarChart>
                            </div>

                            {/* Enhanced Professional Legend */}
                            <div className="flex items-center justify-center gap-12 mt-8 p-6 rounded-2xl bg-gradient-to-r from-muted/30 to-muted/20 border border-border/40 backdrop-blur-sm">
                                <div className="flex items-center gap-4 group cursor-pointer">
                                    <div className="relative">
                                        <div className="w-5 h-5 rounded-lg transition-transform group-hover:scale-110" style={{
                                            background: `linear-gradient(135deg, ${CHART_THEME.accent3}, ${CHART_THEME.accent3}dd)`,
                                            boxShadow: `0 4px 12px ${CHART_THEME.accent3}30`
                                        }}></div>
                                        <div className="absolute inset-0 w-5 h-5 rounded-lg animate-pulse" style={{
                                            background: `linear-gradient(135deg, ${CHART_THEME.accent3}20, transparent)`
                                        }}></div>
                                    </div>
                                    <div>
                                        <span className="text-base font-semibold text-foreground group-hover:text-emerald-400 transition-colors">Positive Impact</span>
                                        <p className="text-xs text-muted-foreground">Activities that boost dopamine</p>
                                    </div>
                                </div>

                                <div className="w-px h-12 bg-border/60"></div>

                                <div className="flex items-center gap-4 group cursor-pointer">
                                    <div className="relative">
                                        <div className="w-5 h-5 rounded-lg transition-transform group-hover:scale-110" style={{
                                            background: `linear-gradient(135deg, ${CHART_THEME.accent5}, ${CHART_THEME.accent5}dd)`,
                                            boxShadow: `0 4px 12px ${CHART_THEME.accent5}30`
                                        }}></div>
                                        <div className="absolute inset-0 w-5 h-5 rounded-lg animate-pulse" style={{
                                            background: `linear-gradient(135deg, ${CHART_THEME.accent5}20, transparent)`
                                        }}></div>
                                    </div>
                                    <div>
                                        <span className="text-base font-semibold text-foreground group-hover:text-red-400 transition-colors">Negative Impact</span>
                                        <p className="text-xs text-muted-foreground">Activities that deplete dopamine</p>
                                    </div>
                                </div>
                            </div>

                            {/* Weekly Insights */}
                            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 rounded-xl bg-primary/10">
                                        <TrendingUp className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground">Weekly Pattern Analysis</h4>
                                        <p className="text-sm text-muted-foreground">AI-powered insights from your activity patterns</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
                                        <p className="text-lg font-bold text-emerald-400">Tuesday</p>
                                        <p className="text-xs text-muted-foreground">Peak Performance Day</p>
                                    </div>
                                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center">
                                        <p className="text-lg font-bold text-amber-400">Thursday</p>
                                        <p className="text-xs text-muted-foreground">Needs Attention</p>
                                    </div>
                                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-center">
                                        <p className="text-lg font-bold text-blue-400">72%</p>
                                        <p className="text-xs text-muted-foreground">Weekly Balance Score</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Call to Action */}
                    <Card className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border-primary/20 backdrop-blur-sm mb-8">
                        <CardContent className="p-6">
                            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                                <div>
                                    <h3 className="text-xl font-semibold">Unlock Advanced Neural Analytics</h3>
                                    <p className="text-muted-foreground mt-2 max-w-lg">
                                        Access personalized AI recommendations, advanced predictive modeling,
                                        and detailed neurochemical analyses with our premium analytics suite.
                                    </p>
                                </div>
                                <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
                                    <Sparkles className="w-5 h-5" />
                                    <span className="font-medium">Upgrade Analytics</span>
                                </button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Export Options */}
                    <div className="flex justify-end gap-4">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:bg-muted transition-colors">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">Download Report</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:bg-muted transition-colors">
                            <Download className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">Export Data</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Progress;
