import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BarChart3, Activity, TrendingUp, BookOpen, Brain, Video } from "lucide-react";

const tabs = [
    {
        label: "Dashboard",
        path: "/dashboard",
        icon: BarChart3,
        description: "Main overview"
    },
    {
        label: "Activities",
        path: "/activities",
        icon: Activity,
        description: "Track activities"
    },
    {
        label: "Progress",
        path: "/progress",
        icon: TrendingUp,
        description: "View progress"
    },
    {
        label: "Learn",
        path: "/learn",
        icon: BookOpen,
        description: "Educational content"
    },
    {
        label: "Videos",
        path: "/videos",
        icon: Video,
        description: "Video content"
    },
];

export default function TabNavigation() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="relative overflow-hidden">
            {/* Cosmic Background with Flowing Lights */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-purple-900/20 to-slate-900">
                {/* Animated cosmic rays */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-primary/60 via-accent/40 to-transparent animate-pulse"
                        style={{ animationDelay: '0s' }} />
                    <div className="absolute top-0 left-1/2 w-px h-28 bg-gradient-to-b from-accent/50 via-primary/30 to-transparent animate-pulse"
                        style={{ animationDelay: '0.5s' }} />
                    <div className="absolute top-0 right-1/3 w-px h-36 bg-gradient-to-b from-purple-400/40 via-blue-400/30 to-transparent animate-pulse"
                        style={{ animationDelay: '1s' }} />
                    <div className="absolute top-0 right-1/4 w-px h-30 bg-gradient-to-b from-cyan-400/30 via-primary/20 to-transparent animate-pulse"
                        style={{ animationDelay: '1.5s' }} />
                </div>

                {/* Flowing cosmic particles */}
                <div className="absolute inset-0">
                    <div className="absolute top-2 left-1/6 w-1 h-1 bg-primary/60 rounded-full animate-bounce"
                        style={{ animationDelay: '0.2s', animationDuration: '3s' }} />
                    <div className="absolute top-4 right-1/5 w-0.5 h-0.5 bg-accent/50 rounded-full animate-bounce"
                        style={{ animationDelay: '0.8s', animationDuration: '2.5s' }} />
                    <div className="absolute top-1 left-2/3 w-1.5 h-1.5 bg-purple-400/40 rounded-full animate-bounce"
                        style={{ animationDelay: '1.2s', animationDuration: '4s' }} />
                </div>

                {/* Smooth transition gradient that matches hero background */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/40" />
                {/* Final blend layer that perfectly matches the hero section */}
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-b from-transparent to-primary/5" />
            </div>

            {/* Navigation Content */}
            <nav className="relative flex justify-between items-center py-4 px-8 backdrop-blur-md">
                {/* Logo/Brand Section - Clickable to return to landing page */}
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-3 group transition-all duration-300 hover:scale-105 active:scale-95 rounded-xl p-2 -m-2 hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10"
                    title="Return to Home"
                >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30 group-hover:shadow-xl group-hover:shadow-primary/40 transition-all duration-300">
                        <Brain className="w-5 h-5 text-primary-foreground drop-shadow-sm group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-lg bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent drop-shadow-sm group-hover:from-accent group-hover:via-primary group-hover:to-accent transition-all duration-300">
                            Dopamine Currency
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 text-primary font-medium border border-primary/30 backdrop-blur-sm group-hover:border-accent/40 group-hover:bg-gradient-to-r group-hover:from-accent/20 group-hover:to-primary/20 transition-all duration-300">
                            Neuroscience-Based
                        </span>
                    </div>

                    {/* Subtle glow effect on hover */}
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-primary/5 to-accent/5 blur-sm -z-10" />
                </button>

                {/* Navigation Tabs */}
                <div className="flex gap-3">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = location.pathname === tab.path;

                        return (
                            <button
                                key={tab.label}
                                className={`
                  group relative flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium text-sm
                  transition-all duration-300 ease-out backdrop-blur-sm
                  hover:scale-105 hover:shadow-xl hover:shadow-primary/30
                  active:scale-95 active:transition-none
                  ${isActive
                                        ? 'bg-gradient-to-r from-primary via-accent to-primary text-primary-foreground shadow-xl shadow-primary/40 border border-primary/50'
                                        : 'text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-primary/20 hover:to-accent/20 border border-slate-600/30 hover:border-primary/40 bg-slate-800/40'
                                    }
                `}
                                onClick={() => navigate(tab.path)}
                                title={tab.description}
                            >
                                <Icon
                                    className={`
                    w-4 h-4 transition-all duration-300
                    ${isActive
                                            ? 'text-primary-foreground drop-shadow-sm'
                                            : 'group-hover:text-primary group-hover:scale-110 group-hover:drop-shadow-sm'
                                        }
                  `}
                                />
                                <span className={`
                  transition-all duration-300
                  ${isActive
                                        ? 'text-primary-foreground drop-shadow-sm font-semibold'
                                        : 'group-hover:text-white group-hover:drop-shadow-sm'
                                    }
                `}>
                                    {tab.label}
                                </span>

                                {/* Enhanced hover glow effect */}
                                <div className={`
                  absolute inset-0 rounded-xl opacity-0 transition-all duration-300
                  group-hover:opacity-100
                  ${isActive
                                        ? 'bg-gradient-to-r from-primary/30 to-accent/30 blur-sm'
                                        : 'bg-gradient-to-r from-primary/20 to-accent/20 blur-sm'
                                    }
                  -z-10
                `} />

                                {/* Active indicator with cosmic effect */}
                                {isActive && (
                                    <>
                                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full shadow-lg shadow-primary/50" />
                                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-white/80 to-white/80 rounded-full blur-sm" />
                                    </>
                                )}

                                {/* Cosmic sparkle effect on hover */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                    <div className="absolute top-1 right-2 w-1 h-1 bg-white/60 rounded-full animate-ping"
                                        style={{ animationDelay: '0.1s' }} />
                                    <div className="absolute bottom-2 left-3 w-0.5 h-0.5 bg-accent/80 rounded-full animate-ping"
                                        style={{ animationDelay: '0.3s' }} />
                                </div>
                            </button>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
}
