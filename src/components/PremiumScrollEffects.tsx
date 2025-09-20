import React, { useEffect, useState, useRef, useCallback } from 'react';
import { PsychedelicDNAHelix } from './PsychedelicDNAHelix';

interface ChemicalMolecule {
    id: number;
    x: number;
    y: number;
    z: number;
    rotationX: number;
    rotationY: number;
    rotationZ: number;
    scale: number;
    opacity: number;
    baseX: number;
    baseY: number;
    velocity: { x: number; y: number; z: number };
    type: 'dopamine' | 'serotonin' | 'norepinephrine' | 'acetylcholine' | 'gaba';
    color: string;
    glowColor: string;
}

const moleculeTypes = {
    dopamine: {
        color: 'from-purple-500 to-pink-500',
        glow: '#a855f7',
        symbol: '🧬'
    },
    serotonin: {
        color: 'from-blue-500 to-cyan-500',
        glow: '#3b82f6',
        symbol: '⚡'
    },
    norepinephrine: {
        color: 'from-orange-500 to-red-500',
        glow: '#f97316',
        symbol: '🔥'
    },
    acetylcholine: {
        color: 'from-green-500 to-emerald-500',
        glow: '#10b981',
        symbol: '✨'
    },
    gaba: {
        color: 'from-indigo-500 to-purple-500',
        glow: '#6366f1',
        symbol: '💫'
    }
};

export const PremiumScrollEffects: React.FC = () => {
    const [molecules, setMolecules] = useState<ChemicalMolecule[]>([]);
    const [scrollY, setScrollY] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout>();
    const rafRef = useRef<number>();
    const lastUpdateTime = useRef(0);

    // Initialize molecules - back to original beautiful design
    useEffect(() => {
        const initialMolecules: ChemicalMolecule[] = [];
        const types = Object.keys(moleculeTypes) as Array<keyof typeof moleculeTypes>;

        for (let i = 0; i < 20; i++) {
            const type = types[i % types.length];
            const baseX = Math.random() * window.innerWidth;
            const baseY = Math.random() * window.innerHeight * 2;

            initialMolecules.push({
                id: i,
                x: baseX,
                y: baseY,
                baseX,
                baseY,
                z: Math.random() * 800 + 100,
                rotationX: Math.random() * 360,
                rotationY: Math.random() * 360,
                rotationZ: Math.random() * 360,
                scale: Math.random() * 0.6 + 0.5,
                opacity: Math.random() * 0.4 + 0.2,
                velocity: {
                    x: (Math.random() - 0.5) * 2,
                    y: (Math.random() - 0.5) * 2,
                    z: (Math.random() - 0.5) * 1
                },
                type,
                color: moleculeTypes[type].color,
                glowColor: moleculeTypes[type].glow
            });
        }
        setMolecules(initialMolecules);
    }, []);

    // Optimized scroll handler with debouncing
    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY;
        setScrollY(currentScrollY);
        setIsScrolling(true);

        // Clear existing timeout
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }

        // Set scrolling to false after scroll stops
        scrollTimeoutRef.current = setTimeout(() => {
            setIsScrolling(false);
        }, 200);
    }, []);

    // Optimized animation loop with frame limiting
    useEffect(() => {
        const animate = (currentTime: number) => {
            // Limit to 60fps and only update when scrolling or fading out
            if (currentTime - lastUpdateTime.current >= 16) {
                setMolecules(prev => prev.map(molecule => {
                    const scrollFactor = scrollY * 0.005;
                    const timeFactor = currentTime * 0.0008;

                    // More subtle movements when not scrolling
                    const movement = isScrolling ? 1 : 0.3;
                    const fadeSpeed = isScrolling ? 0.05 : -0.01;

                    return {
                        ...molecule,
                        rotationX: molecule.rotationX + scrollFactor * 1.5 + Math.sin(timeFactor + molecule.id) * movement,
                        rotationY: molecule.rotationY + scrollFactor * 1 + Math.cos(timeFactor + molecule.id) * movement,
                        rotationZ: molecule.rotationZ + scrollFactor * 2,
                        x: molecule.baseX + Math.sin(timeFactor + molecule.id) * (30 * movement) + scrollFactor * molecule.velocity.x * 0.5,
                        y: molecule.baseY + Math.cos(timeFactor + molecule.id * 0.5) * (20 * movement) - scrollY * 0.3,
                        z: molecule.z + Math.sin(timeFactor + molecule.id * 0.3) * (60 * movement),
                        scale: molecule.scale + Math.sin(scrollFactor + molecule.id) * 0.05,
                        opacity: Math.max(0, Math.min(0.8, molecule.opacity + fadeSpeed))
                    };
                }));

                lastUpdateTime.current = currentTime;
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [isScrolling, scrollY]);

    // Throttled scroll listener
    useEffect(() => {
        let ticking = false;

        const scrollListener = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', scrollListener, { passive: true });
        return () => {
            window.removeEventListener('scroll', scrollListener);
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, [handleScroll]);

    return (
        <div
            className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
            style={{ perspective: '1000px' }}
        >
            {/* Psychedelic DNA Helix Scroll Indicator */}
            <PsychedelicDNAHelix scrollY={scrollY} isScrolling={isScrolling} />

            {molecules.map(molecule => {
                // Don't render completely invisible molecules
                if (molecule.opacity < 0.05) return null;

                const typeData = moleculeTypes[molecule.type];
                const transform = `
          translate3d(${molecule.x}px, ${molecule.y}px, ${molecule.z}px)
          rotateX(${molecule.rotationX}deg)
          rotateY(${molecule.rotationY}deg)
          rotateZ(${molecule.rotationZ}deg)
          scale3d(${molecule.scale}, ${molecule.scale}, ${molecule.scale})
        `;

                return (
                    <div
                        key={molecule.id}
                        className="absolute will-change-transform"
                        style={{
                            transform,
                            opacity: molecule.opacity,
                            transformStyle: 'preserve-3d'
                        }}
                    >
                        {/* Main molecule sphere - original beautiful design */}
                        <div
                            className={`
                w-12 h-12 rounded-full bg-gradient-to-br ${molecule.color}
                flex items-center justify-center text-white text-xl
                backdrop-blur-sm border border-white/20
              `}
                            style={{
                                boxShadow: `
                  0 0 30px ${molecule.glowColor}40,
                  0 0 60px ${molecule.glowColor}20,
                  inset 0 0 20px rgba(255,255,255,0.2)
                `,
                                filter: 'blur(0px)',
                                backfaceVisibility: 'hidden'
                            }}
                        >
                            {typeData.symbol}
                        </div>

                        {/* Orbital rings - original design but optimized */}
                        <div
                            className="absolute inset-0 w-16 h-16 -m-2 rounded-full border border-white/10"
                            style={{
                                animation: isScrolling ? 'spin 8s linear infinite' : 'none',
                                transform: 'rotateX(60deg)',
                                willChange: 'transform'
                            }}
                        />
                        <div
                            className="absolute inset-0 w-20 h-20 -m-4 rounded-full border border-white/5"
                            style={{
                                animation: isScrolling ? 'spin 12s linear infinite reverse' : 'none',
                                transform: 'rotateY(45deg)',
                                willChange: 'transform'
                            }}
                        />

                        {/* Particle trails - only when scrolling */}
                        {isScrolling && [...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className={`
                  absolute w-1 h-1 rounded-full bg-gradient-to-r ${molecule.color}
                  animate-ping
                `}
                                style={{
                                    left: `${Math.sin(Date.now() * 0.001 + i * 2) * 20 + 20}px`,
                                    top: `${Math.cos(Date.now() * 0.001 + i * 2) * 20 + 20}px`,
                                    animationDelay: `${i * 0.2}s`,
                                    animationDuration: '2s'
                                }}
                            />
                        ))}
                    </div>
                );
            })}

            {/* Neural network connections - only when scrolling */}
            {isScrolling && (
                <svg
                    className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
                    style={{ mixBlendMode: 'screen' }}
                >
                    {molecules.slice(0, 6).map((molecule, i) =>
                        molecules.slice(i + 1, i + 2).map((target, j) => (
                            <line
                                key={`${i}-${j}`}
                                x1={molecule.x + 24}
                                y1={molecule.y + 24}
                                x2={target.x + 24}
                                y2={target.y + 24}
                                stroke="url(#gradient)"
                                strokeWidth="1"
                                className="animate-pulse"
                                style={{
                                    filter: 'blur(0.5px)',
                                    animationDelay: `${(i + j) * 0.3}s`
                                }}
                            />
                        ))
                    )}
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.6" />
                            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6" />
                        </linearGradient>
                    </defs>
                </svg>
            )}

            {/* Background cosmic dust */}
            <div className="absolute inset-0 opacity-20">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-px h-px bg-white rounded-full animate-twinkle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

// Add custom animation to index.css
export const scrollEffectsCSS = `
@keyframes twinkle {
  0%, 100% { opacity: 0; transform: scale(0.5); }
  50% { opacity: 1; transform: scale(1.2); }
}

.animate-twinkle {
  animation: twinkle 3s ease-in-out infinite;
}
`;