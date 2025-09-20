import React, { useEffect, useState, useRef } from 'react';
import BlackGreyDNAHelix from '@/components/BlackGreyDNAHelix';
import TabNavigation from '@/components/ui/tab-navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    ChevronRight,
    BookOpen,
    Brain,
    Zap,
    Play,
    CheckCircle,
    Clock,
    ArrowRight,
    Star,
    Award,
    BarChart3,
    CalendarDays,
    Lightbulb,
    Sparkles,
    PlayCircle,
    ListChecks,
    Video,
    Activity,
    Lock,
    Flame,
    MessageSquareText,
    ArrowUpRight,
    RotateCcw,
    Layers,
    Paperclip,
    Code,
    Coffee,
    Leaf,
    Heart,
    Droplet,
    MonitorSmartphone,
    Alarm,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useIsMobile } from '@/hooks/use-mobile';

// Content for dopamine learning modules based on provided images
const dopamineLearningModules = [
    {
        id: 'motivation-backwards',
        title: "We've Got Motivation Backwards",
        subtitle: 'Neuroscience reveals the real order of how our brains work',
        color: 'from-orange-500 to-red-600',
        bgColor: 'bg-gradient-to-br from-orange-950/90 to-red-900/90',
        border: 'border-orange-600/30',
        buttonColor: 'bg-orange-500 hover:bg-orange-600',
        iconColor: 'text-orange-500',
        points: [
            {
                heading: 'Action First',
                description: 'You have to start before you feel like it',
                icon: <Play className="w-5 h-5" />
            },
            {
                heading: 'Dopamine',
                description: 'Gets released AFTER you begin effort',
                icon: <Brain className="w-5 h-5" />
            },
            {
                heading: 'Reward Loop',
                description: 'Brain creates motivation from your actions',
                icon: <RotateCcw className="w-5 h-5" />
            },
            {
                heading: 'Backwards',
                description: 'What we were taught is wrong',
                icon: <ArrowRight className="w-5 h-5 rotate-180" />
            }
        ],
        lessons: [
            {
                id: 'action-motivation-myth',
                title: 'The Action-Motivation Myth',
                duration: '13 min',
                progress: 0,
                locked: false,
                preview: 'Discover why waiting for motivation is a scientific misconception.'
            },
            {
                id: 'dopamine-timing',
                title: 'The Critical Timing of Dopamine',
                duration: '17 min',
                progress: 0,
                locked: false,
                preview: 'Learn the precise neurochemical timing that drives human behavior.'
            },
            {
                id: 'rewiring-motivation',
                title: 'Rewiring Your Motivation Circuitry',
                duration: '21 min',
                progress: 0,
                locked: true,
                preview: 'Advanced techniques for creating reliable motivation systems.'
            }
        ]
    },
    {
        id: 'real-system',
        title: 'The Real Dopamine System',
        subtitle: 'Your brain is designed to reward effort, not just results',
        color: 'from-purple-500 to-violet-600',
        bgColor: 'bg-gradient-to-br from-purple-950/90 to-violet-900/90',
        border: 'border-purple-600/30',
        buttonColor: 'bg-purple-500 hover:bg-purple-600',
        iconColor: 'text-purple-500',
        points: [
            {
                heading: 'You start moving',
                description: 'Even small actions trigger brain changes',
                icon: <Play className="w-5 h-5" />
            },
            {
                heading: 'Dopamine releases',
                description: 'Brain rewards the effort itself',
                icon: <Zap className="w-5 h-5" />
            },
            {
                heading: 'Momentum builds',
                description: 'Action makes more action easier',
                icon: <Flame className="w-5 h-5" />
            },
            {
                heading: 'Motivation follows',
                description: 'You start wanting to continue',
                icon: <ArrowUpRight className="w-5 h-5" />
            }
        ],
        lessons: [
            {
                id: 'effort-reward',
                title: 'The Effort-Reward Connection',
                duration: '14 min',
                progress: 0,
                locked: false,
                preview: 'Understand how your brain rewards action, not just outcomes.'
            },
            {
                id: 'momentum-science',
                title: 'The Neuroscience of Momentum',
                duration: '16 min',
                progress: 0,
                locked: false,
                preview: 'Learn how neural pathways strengthen through consistent activation.'
            },
            {
                id: 'advanced-triggers',
                title: 'Advanced Dopamine Triggers',
                duration: '20 min',
                progress: 0,
                locked: true,
                preview: 'Master techniques to consciously activate your reward pathways.'
            }
        ]
    },
    {
        id: 'action-first',
        title: 'The Action-First Method',
        subtitle: 'Use neuroscience to build unstoppable momentum',
        color: 'from-green-500 to-emerald-600',
        bgColor: 'bg-gradient-to-br from-green-950/90 to-emerald-900/90',
        border: 'border-green-600/30',
        buttonColor: 'bg-green-500 hover:bg-green-600',
        iconColor: 'text-green-500',
        points: [
            {
                heading: 'Start tiny',
                description: "2-minute rule: make it so small you can't say no",
                icon: <Leaf className="w-5 h-5" />
            },
            {
                heading: "Don't wait to feel ready",
                description: 'Begin before motivation shows up',
                icon: <Clock className="w-5 h-5" />
            },
            {
                heading: 'Celebrate small wins',
                description: 'Train your brain to reward effort',
                icon: <Award className="w-5 h-5" />
            },
            {
                heading: 'Focus on showing up',
                description: 'Consistency beats perfection',
                icon: <CalendarDays className="w-5 h-5" />
            },
            {
                heading: 'Trust the process',
                description: 'Motivation will follow your actions',
                icon: <RotateCcw className="w-5 h-5" />
            },
            {
                heading: 'Build systems',
                description: 'Make starting automatic, not optional',
                icon: <Layers className="w-5 h-5" />
            }
        ],
        lessons: [
            {
                id: 'start-small',
                title: 'The Science of Starting Small',
                duration: '12 min',
                progress: 0,
                locked: false,
                preview: 'Learn how to overcome activation energy by reducing the initial effort required.'
            },
            {
                id: 'consistency',
                title: 'Consistency: The Hidden Superpower',
                duration: '15 min',
                progress: 0,
                locked: false,
                preview: 'Discover why showing up regularly is more powerful than occasional perfection.'
            },
            {
                id: 'reward-system',
                title: 'Rewiring Your Reward System',
                duration: '18 min',
                progress: 0,
                locked: true,
                preview: 'Master the art of celebrating small wins to strengthen neural pathways.'
            }
        ]
    }
];

// Learning paths
const learningPaths = [
    {
        id: 'foundation',
        title: 'Dopamine Foundations',
        description: "Essential knowledge about the brain's reward system",
        progress: 25,
        image: '/placeholder.svg',
        modules: 8,
        duration: '2.5 hours',
        level: 'Beginner'
    },
    {
        id: 'mastery',
        title: 'Neural Mastery Path',
        description: 'Advanced techniques for controlling neurochemistry',
        progress: 0,
        image: '/placeholder.svg',
        modules: 12,
        duration: '4 hours',
        level: 'Intermediate'
    },
    {
        id: 'habits',
        title: 'Habit Engineering',
        description: 'Build sustainable systems based on neuroscience',
        progress: 0,
        image: '/placeholder.svg',
        modules: 10,
        duration: '3.5 hours',
        level: 'Advanced'
    }
];

// Practice exercises
const practiceExercises = [
    {
        id: 'exercise-1',
        title: '2-Minute Activation',
        description: 'Practice overcoming inertia with micro-commitments',
        duration: '5 min daily',
        difficulty: 'Easy'
    },
    {
        id: 'exercise-2',
        title: 'Effort-Reward Journaling',
        description: 'Document the relationship between action and motivation',
        duration: '10 min daily',
        difficulty: 'Medium'
    },
    {
        id: 'exercise-3',
        title: 'Consistent Action Tracker',
        description: 'Build a visual system for tracking daily consistency',
        duration: '5 min daily',
        difficulty: 'Easy'
    },
    {
        id: 'exercise-4',
        title: 'Dopamine Detox Challenge',
        description: 'Reset sensitivity by temporarily reducing artificial stimulation',
        duration: '24 hour challenge',
        difficulty: 'Hard'
    }
];

// Neuroscience quiz questions
const quizQuestions = [
    {
        question: 'When does dopamine get released in relation to starting an activity?',
        options: [
            'Before you start, to motivate you',
            'After you begin taking action',
            'Only when you complete a task',
            'Only during pleasurable activities'
        ],
        correctAnswer: 1
    },
    {
        question: 'What is the primary function of dopamine in the motivation cycle?',
        options: [
            'To make you feel happy',
            'To reward completion of tasks',
            'To reinforce behaviors through anticipation',
            'To eliminate feelings of fear'
        ],
        correctAnswer: 2
    },
    {
        question: "According to the action-first method, what should you do when you don't feel motivated?",
        options: [
            'Wait until motivation arrives naturally',
            'Start with a tiny action regardless of feeling',
            'Consume caffeine or other stimulants',
            'Focus on the end result you want'
        ],
        correctAnswer: 1
    }
];

// Animation variants for components
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

const ModuleCard = ({ module, index }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2
    });
    const isMobile = useIsMobile();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            ref={ref}
            variants={itemVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: index * 0.1 }}
            className={`relative overflow-hidden rounded-xl ${module.border} border`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={`${module.bgColor} p-8`}>
                <h3 className={`text-2xl font-bold bg-gradient-to-r ${module.color} bg-clip-text text-transparent mb-2`}>
                    {module.title}
                </h3>
                <p className="text-gray-300 mb-6">{module.subtitle}</p>

                <motion.ul
                    className="space-y-4 mb-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                >
                    {module.points.map((point, idx) => (
                        <motion.li
                            key={idx}
                            variants={itemVariants}
                            className="flex items-start gap-3"
                        >
                            <div className={`p-1.5 rounded-full bg-background ${module.iconColor}`}>
                                {point.icon}
                            </div>
                            <div>
                                <p className={`font-medium text-lg bg-gradient-to-r ${module.color} bg-clip-text text-transparent`}>
                                    {point.heading}
                                </p>
                                <p className="text-gray-300 text-sm">{point.description}</p>
                            </div>
                        </motion.li>
                    ))}
                </motion.ul>

                <button className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-white ${module.buttonColor} transition-all`}>
                    <BookOpen className="w-5 h-5" />
                    <span>Start Learning</span>
                </button>
            </div>

            {/* Animated module lessons */}
            <AnimatePresence>
                {isHovered && !isMobile && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 bg-background/95 backdrop-blur-sm p-6 flex flex-col"
                    >
                        <h4 className="text-lg font-semibold mb-4">Available Lessons</h4>
                        <div className="space-y-3 flex-1">
                            {module.lessons.map((lesson, idx) => (
                                <div
                                    key={idx}
                                    className={`p-3 rounded-lg border ${lesson.locked ? 'border-muted bg-muted/30' : 'border-border bg-card/50 hover:bg-card cursor-pointer'} transition-colors`}
                                >
                                    <div className="flex items-center justify-between">
                                        <h5 className="font-medium text-sm">
                                            {lesson.title}
                                        </h5>
                                        {lesson.locked ? (
                                            <Lock className="w-4 h-4 text-muted-foreground" />
                                        ) : (
                                            <Play className="w-4 h-4 text-primary" />
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {lesson.duration}
                                        </span>
                                        {!lesson.locked && (
                                            <Progress value={lesson.progress} className="w-20 h-1.5" />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4">
                            <button className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white ${module.buttonColor} transition-all`}>
                                <BookOpen className="w-4 h-4" />
                                <span className="font-medium">Begin Module</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const SpacedRepetitionModule = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    // Sample spaced repetition schedule
    const repetitionSchedule = [
        { day: 1, reviewType: 'Initial Learning', duration: '20 min' },
        { day: 3, reviewType: 'First Review', duration: '10 min' },
        { day: 7, reviewType: 'Second Review', duration: '8 min' },
        { day: 14, reviewType: 'Third Review', duration: '5 min' },
        { day: 30, reviewType: 'Monthly Review', duration: '5 min' }
    ];

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-blue-900/70 to-indigo-900/70 border border-blue-700/30 rounded-xl p-6"
        >
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
                        Spaced Repetition System
                    </h3>
                    <p className="text-gray-300 text-sm mt-1">
                        Learn faster with scientifically-optimized review intervals
                    </p>
                </div>
                <div className="p-2 rounded-full bg-blue-500/20 text-blue-400">
                    <Brain className="w-5 h-5" />
                </div>
            </div>

            <div className="mt-6 space-y-1">
                {repetitionSchedule.map((item, idx) => (
                    <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-lg bg-blue-950/50 hover:bg-blue-900/30 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-800/50 text-blue-300 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm">
                                {item.day}
                            </div>
                            <div>
                                <p className="font-medium text-sm text-gray-200">{item.reviewType}</p>
                                <p className="text-gray-400 text-xs">{item.duration}</p>
                            </div>
                        </div>
                        <div>
                            <button className="p-1.5 rounded-lg bg-blue-700/30 hover:bg-blue-600/50 text-blue-300 transition-colors">
                                <CalendarDays className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 p-4 rounded-lg bg-blue-800/20 border border-blue-700/30">
                <div className="flex items-start gap-2">
                    <div className="p-1.5 rounded-full bg-blue-500/30 text-blue-300 mt-0.5">
                        <Lightbulb className="w-4 h-4" />
                    </div>
                    <p className="text-sm text-gray-300">
                        Spaced repetition uses optimal timing between reviews to maximize memory retention
                        while minimizing total study time. Our algorithm adjusts to your performance.
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

const PracticeExerciseCard = ({ exercise, index }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    return (
        <motion.div
            ref={ref}
            variants={itemVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: index * 0.1 }}
            className="border border-border/60 rounded-lg overflow-hidden"
        >
            <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">{exercise.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs ${exercise.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-400' :
                        exercise.difficulty === 'Medium' ? 'bg-amber-500/20 text-amber-400' :
                            'bg-rose-500/20 text-rose-400'
                        }`}>
                        {exercise.difficulty}
                    </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{exercise.description}</p>
                <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {exercise.duration}
                    </span>
                    <button className="px-3 py-1.5 text-xs bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors flex items-center gap-1.5">
                        <Play className="w-3 h-3" />
                        <span>Start</span>
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const QuizCard = ({ question, index, showAnswers, setShowAnswers }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    const handleAnswerSelect = (answerIndex) => {
        setSelectedAnswer(answerIndex);
        setShowAnswers(true);
    };

    return (
        <motion.div
            ref={ref}
            variants={itemVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: index * 0.1 }}
            className="border border-border/60 rounded-lg p-5"
        >
            <h4 className="font-medium mb-4">{question.question}</h4>
            <div className="space-y-2">
                {question.options.map((option, optIndex) => (
                    <button
                        key={optIndex}
                        onClick={() => handleAnswerSelect(optIndex)}
                        disabled={showAnswers}
                        className={`w-full p-3 rounded-lg text-left transition-colors ${selectedAnswer === optIndex
                            ? showAnswers
                                ? optIndex === question.correctAnswer
                                    ? 'bg-emerald-500/20 border-emerald-500/50 border'
                                    : 'bg-rose-500/20 border-rose-500/50 border'
                                : 'bg-primary/20 border-primary/50 border'
                            : 'bg-card hover:bg-muted/50 border border-border'
                            }`}
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-sm">{option}</span>
                            {showAnswers && optIndex === question.correctAnswer && (
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                            )}
                        </div>
                    </button>
                ))}
            </div>
            {showAnswers && selectedAnswer !== question.correctAnswer && (
                <div className="mt-3 p-3 bg-muted/30 border border-border rounded-lg">
                    <p className="text-sm flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span>The correct answer helps us understand how motivation and action are sequenced in the brain's reward system.</span>
                    </p>
                </div>
            )}
        </motion.div>
    );
};

const Learn = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeTab, setActiveTab] = useState('modules');
    const [showQuizAnswers, setShowQuizAnswers] = useState(false);
    const topRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = Math.min(scrolled / maxScroll, 1);
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        topRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-background relative" ref={topRef}>
            {/* Black/Grey DNA Helix */}
            <BlackGreyDNAHelix scrollProgress={scrollProgress} />

            {/* Navigation Tabs */}
            <TabNavigation />

            {/* Learn Content */}
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Header */}
                <motion.div
                    className="text-center mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-purple-400 to-blue-500 bg-clip-text text-transparent">
                        The Neuroscience of Motivation
                    </h1>
                    <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
                        Discover how your brain's reward system actually works and learn science-based methods to build unstoppable momentum
                    </p>
                </motion.div>

                {/* Learning Hub Navigation */}
                <Tabs defaultValue="modules" className="mb-12" value={activeTab} onValueChange={setActiveTab}>
                    <div className="flex justify-center">
                        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
                            <TabsTrigger value="modules" className="flex items-center gap-2">
                                <BookOpen className="w-4 h-4" />
                                <span className="hidden sm:inline">Core Concepts</span>
                            </TabsTrigger>
                            <TabsTrigger value="paths" className="flex items-center gap-2">
                                <Layers className="w-4 h-4" />
                                <span className="hidden sm:inline">Learning Paths</span>
                            </TabsTrigger>
                            <TabsTrigger value="practice" className="flex items-center gap-2">
                                <Activity className="w-4 h-4" />
                                <span className="hidden sm:inline">Practice</span>
                            </TabsTrigger>
                            <TabsTrigger value="quiz" className="flex items-center gap-2">
                                <MessageSquareText className="w-4 h-4" />
                                <span className="hidden sm:inline">Quiz</span>
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    {/* Core Modules */}
                    <TabsContent value="modules" className="mt-6">
                        <motion.div
                            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {dopamineLearningModules.map((module, idx) => (
                                <ModuleCard key={idx} module={module} index={idx} />
                            ))}
                        </motion.div>

                        <motion.div
                            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            <div className="md:col-span-2">
                                <Card className="bg-card/80 backdrop-blur-sm border-border/80">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Video className="w-5 h-5 text-primary" />
                                            Interactive 3D Visualizations
                                        </CardTitle>
                                        <CardDescription>
                                            Explore the neurochemical pathways of motivation and reward
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="aspect-video rounded-lg bg-muted/50 flex items-center justify-center">
                                            <div className="text-center">
                                                <a href="/videos" className="block hover:scale-110 transition-transform">
                                                    <PlayCircle className="w-12 h-12 text-primary/70 mx-auto" />
                                                    <p className="mt-2 text-muted-foreground">View Video Content</p>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <button className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors flex items-center justify-center gap-2">
                                                <Brain className="w-4 h-4 text-primary" />
                                                <span className="text-sm font-medium">Explore Reward Pathway</span>
                                            </button>
                                            <button className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors flex items-center justify-center gap-2">
                                                <Zap className="w-4 h-4 text-primary" />
                                                <span className="text-sm font-medium">Dopamine Release Simulation</span>
                                            </button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div>
                                <SpacedRepetitionModule />
                            </div>
                        </motion.div>
                    </TabsContent>

                    {/* Learning Paths */}
                    <TabsContent value="paths" className="mt-6">
                        <motion.div
                            className="space-y-6"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {learningPaths.map((path, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={itemVariants}
                                    className="border border-border rounded-xl overflow-hidden bg-card/50 hover:bg-card/80 transition-colors"
                                >
                                    <div className="flex flex-col md:flex-row">
                                        <div className="md:w-1/4 bg-muted aspect-video md:aspect-square relative overflow-hidden">
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Brain className="w-12 h-12 text-muted-foreground/40" />
                                            </div>
                                        </div>
                                        <div className="p-6 md:w-3/4 flex flex-col">
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h3 className="text-xl font-semibold">{path.title}</h3>
                                                    <span className={`px-2 py-1 text-xs rounded-full ${path.level === 'Beginner' ? 'bg-emerald-500/20 text-emerald-400' :
                                                        path.level === 'Intermediate' ? 'bg-blue-500/20 text-blue-400' :
                                                            'bg-purple-500/20 text-purple-400'
                                                        }`}>
                                                        {path.level}
                                                    </span>
                                                </div>
                                                <p className="text-muted-foreground mb-4">{path.description}</p>
                                                <div className="flex flex-wrap gap-4 mb-4">
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                        <BookOpen className="w-4 h-4" />
                                                        <span>{path.modules} modules</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                        <Clock className="w-4 h-4" />
                                                        <span>{path.duration}</span>
                                                    </div>
                                                </div>
                                                <div className="mb-6">
                                                    <div className="flex items-center justify-between mb-1.5">
                                                        <span className="text-xs text-muted-foreground">Progress</span>
                                                        <span className="text-xs font-medium">{path.progress}%</span>
                                                    </div>
                                                    <Progress value={path.progress} className="h-1.5" />
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                {path.progress > 0 ? (
                                                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
                                                        <Play className="w-4 h-4" />
                                                        <span>Continue</span>
                                                    </button>
                                                ) : (
                                                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
                                                        <Play className="w-4 h-4" />
                                                        <span>Start Path</span>
                                                    </button>
                                                )}
                                                <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                                                    <ListChecks className="w-4 h-4 text-muted-foreground" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </TabsContent>

                    {/* Practice Exercises */}
                    <TabsContent value="practice" className="mt-6">
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {practiceExercises.map((exercise, idx) => (
                                <PracticeExerciseCard key={idx} exercise={exercise} index={idx} />
                            ))}
                        </motion.div>

                        <div className="mt-12 p-6 border border-primary/30 rounded-xl bg-primary/5">
                            <div className="flex flex-col md:flex-row items-start gap-6">
                                <div className="p-3 rounded-full bg-primary/20 text-primary">
                                    <Sparkles className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold mb-2">Neuroplasticity Training Program</h3>
                                    <p className="text-muted-foreground mb-4">
                                        Unlock the full potential of your brain's ability to rewire itself with our premium 30-day
                                        structured training program. This science-backed system gradually builds your neural pathways
                                        for consistent motivation and action.
                                    </p>
                                    <button className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
                                        <Lock className="w-4 h-4" />
                                        <span>Unlock Premium Program</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Quiz */}
                    <TabsContent value="quiz" className="mt-6">
                        <motion.div
                            className="space-y-8 max-w-3xl mx-auto"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <div className="text-center mb-8">
                                <h3 className="text-xl font-semibold">Test Your Understanding</h3>
                                <p className="text-muted-foreground mt-1">Answer these questions to reinforce your learning</p>
                            </div>

                            {quizQuestions.map((question, idx) => (
                                <QuizCard
                                    key={idx}
                                    question={question}
                                    index={idx}
                                    showAnswers={showQuizAnswers}
                                    setShowAnswers={setShowQuizAnswers}
                                />
                            ))}

                            {showQuizAnswers && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="p-6 border border-primary/30 rounded-xl bg-primary/5 text-center"
                                >
                                    <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
                                    <h3 className="text-xl font-semibold mb-2">Knowledge Building Blocks</h3>
                                    <p className="text-muted-foreground">
                                        These concepts form the foundation of understanding your brain's reward system.
                                        Continue to the modules for deeper learning.
                                    </p>
                                    <div className="mt-4">
                                        <button
                                            onClick={() => {
                                                setActiveTab('modules');
                                                scrollToTop();
                                            }}
                                            className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 mx-auto"
                                        >
                                            <BookOpen className="w-4 h-4" />
                                            <span>Explore Core Modules</span>
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    </TabsContent>
                </Tabs>

                {/* Key Applications Section */}
                <motion.section
                    className="mt-16 mb-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold">Apply These Principles To</h2>
                        <p className="text-muted-foreground mt-2">
                            Transform your approach to motivation in these key areas
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { icon: <Code className="w-5 h-5" />, title: "Learning New Skills", color: "bg-blue-500/20 text-blue-400" },
                            { icon: <Heart className="w-5 h-5" />, title: "Health & Fitness", color: "bg-rose-500/20 text-rose-400" },
                            { icon: <Flame className="w-5 h-5" />, title: "Productivity", color: "bg-orange-500/20 text-orange-400" },
                            { icon: <Coffee className="w-5 h-5" />, title: "Breaking Habits", color: "bg-amber-500/20 text-amber-400" }
                        ].map((item, idx) => (
                            <Card key={idx} className="bg-card/50 hover:bg-card/80 transition-colors border-border/60">
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2.5 rounded-full ${item.color}`}>
                                            {item.icon}
                                        </div>
                                        <h3 className="font-medium">{item.title}</h3>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </motion.section>

                {/* CTA Section */}
                <motion.div
                    className="my-12 rounded-xl overflow-hidden border border-primary/20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Master Your Brain's Reward System?</h2>
                            <p className="text-muted-foreground mb-6">
                                Join thousands of users who've transformed their motivation and productivity using
                                our neuroscience-based approach. Get full access to all modules, personalized tracking,
                                and advanced tools.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
                                    <Sparkles className="w-5 h-5" />
                                    <span className="font-medium">Unlock Premium Access</span>
                                </button>
                                <button className="px-6 py-3 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors flex items-center gap-2">
                                    <Play className="w-5 h-5" />
                                    <span className="font-medium">Watch Demo</span>
                                </button>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 aspect-square md:aspect-auto md:h-52 rounded-lg bg-primary/20 flex items-center justify-center">
                            <Brain className="w-20 h-20 text-primary/60" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Learn;
