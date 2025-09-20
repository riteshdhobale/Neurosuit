import React, { useEffect, useState } from 'react';

interface PsychedelicDNAHelixProps {
    scrollProgress: number;
}

const PsychedelicDNAHelix: React.FC<PsychedelicDNAHelixProps> = ({ scrollProgress }) => {
    const [time, setTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prev => prev + 0.008); // Much slower for peaceful flow
        }, 16); // 60fps

        return () => clearInterval(interval);
    }, []);

    // Generate DNA base pairs - slow peaceful movement
    const basePairs = Array.from({ length: 60 }, (_, i) => {
        const baseHeight = i * 20; // More spacing for cleaner look
        const helixRotation = i * 18; // DNA helix structure rotation
        const timeOffset = time * 15; // Much slower movement for relaxation
        const finalHeight = (baseHeight - timeOffset) % (window.innerHeight + 400) - 200;

        return {
            id: i,
            height: finalHeight,
            helixRotation: helixRotation, // No scroll dependency
            leftColor: `hsl(${(helixRotation + time * 20 + 180) % 360}, 90%, 70%)`,
            rightColor: `hsl(${(helixRotation + time * 20) % 360}, 90%, 70%)`,
            baseColor: `hsl(${(helixRotation + time * 20 + 90) % 360}, 85%, 65%)`
        };
    });

    // Generate climbing entities - gentle flowing movement
    const climbingEntities = Array.from({ length: 15 }, (_, i) => {
        const baseAngle = (i / 15) * 360;
        const climbSpeed = 8 + (i % 3) * 3; // Much slower climb speeds for zen feeling
        const spiralRadius = 15 + (i % 2) * 5;

        // Pure time-based movement - gentle and peaceful
        const timeClimb = time * climbSpeed;
        const totalHeight = (timeClimb + i * 60) % (window.innerHeight + 400) - 200;

        const spiralAngle = baseAngle + (totalHeight * 0.8); // Gentler spiral

        const x = Math.cos(spiralAngle * Math.PI / 180) * spiralRadius;
        const z = Math.sin(spiralAngle * Math.PI / 180) * spiralRadius;

        return {
            id: i,
            x,
            y: totalHeight,
            z,
            color: `hsl(${(spiralAngle + time * 30) % 360}, 95%, 75%)`,
            size: 3 + (i % 2),
            trail: Array.from({ length: 8 }, (_, j) => {
                const trailAngle = spiralAngle - j * 5;
                const trailHeight = totalHeight - j * 15;
                return {
                    x: Math.cos(trailAngle * Math.PI / 180) * spiralRadius,
                    z: Math.sin(trailAngle * Math.PI / 180) * spiralRadius,
                    y: trailHeight,
                    opacity: Math.max(0, (8 - j) / 8),
                    size: (3 + (i % 2)) * (1 - j * 0.1)
                };
            })
        };
    });

    // Slow meditative rotation - perfect for relaxation
    const earthAxisRotation = time * 4; // Very slow, calming rotation

    return (
        <div className="fixed right-4 top-20 w-20 h-[calc(100vh-80px)] pointer-events-none z-0">
            <div className="relative w-full h-full overflow-hidden">
                {/* DNA Helix Container with scroll-responsive rotation */}
                <div
                    className="absolute inset-0"
                    style={{
                        perspective: '1200px',
                        transformStyle: 'preserve-3d'
                    }}
                >
                    {/* Entire DNA structure rotates smoothly and independently */}
                    <div
                        style={{
                            transform: `rotateY(${earthAxisRotation}deg)`,
                            transformStyle: 'preserve-3d',
                            height: '100%',
                            width: '100%',
                            position: 'relative'
                        }}
                    >
                        {/* DNA Double Helix Strands */}
                        {basePairs
                            .filter(pair => pair.height >= -100 && pair.height <= window.innerHeight + 100)
                            .map((pair) => (
                                <div
                                    key={pair.id}
                                    className="absolute left-1/2"
                                    style={{
                                        transform: `
                    translateX(-50%) 
                    translateY(${pair.height}px) 
                    rotateY(${pair.helixRotation}deg)
                  `,
                                        transformStyle: 'preserve-3d'
                                    }}
                                >
                                    {/* Left DNA Strand */}
                                    <div
                                        className="absolute w-3 h-3 rounded-full"
                                        style={{
                                            transform: 'translateX(-25px) translateZ(0px)',
                                            backgroundColor: pair.leftColor,
                                            boxShadow: `0 0 10px ${pair.leftColor}, 0 0 20px ${pair.leftColor}`,
                                            opacity: 0.85
                                        }}
                                    />

                                    {/* Right DNA Strand */}
                                    <div
                                        className="absolute w-3 h-3 rounded-full"
                                        style={{
                                            transform: 'translateX(25px) translateZ(0px)',
                                            backgroundColor: pair.rightColor,
                                            boxShadow: `0 0 10px ${pair.rightColor}, 0 0 20px ${pair.rightColor}`,
                                            opacity: 0.85
                                        }}
                                    />

                                    {/* Base Pair Connection */}
                                    <div
                                        className="absolute h-0.5 opacity-70"
                                        style={{
                                            width: '50px',
                                            left: '-25px',
                                            top: '6px',
                                            background: `linear-gradient(90deg, ${pair.leftColor}, ${pair.baseColor}, ${pair.rightColor})`,
                                            boxShadow: `0 0 5px ${pair.baseColor}`,
                                            borderRadius: '1px'
                                        }}
                                    />
                                </div>
                            ))}

                        {/* Climbing Entities with Enhanced Trails */}
                        {climbingEntities
                            .filter(entity => entity.y >= -200 && entity.y <= window.innerHeight + 200)
                            .map((entity) => (
                                <React.Fragment key={entity.id}>
                                    {/* Enhanced Trail Effect */}
                                    {entity.trail
                                        .filter(trail => trail.y >= -200 && trail.y <= window.innerHeight + 200)
                                        .map((trailPoint, j) => (
                                            <div
                                                key={`${entity.id}-trail-${j}`}
                                                className="absolute rounded-full"
                                                style={{
                                                    left: '50%',
                                                    width: `${trailPoint.size}px`,
                                                    height: `${trailPoint.size}px`,
                                                    transform: `
                        translateX(-50%) 
                        translateY(${trailPoint.y}px) 
                        translateX(${trailPoint.x}px)
                        translateZ(${trailPoint.z}px)
                      `,
                                                    backgroundColor: entity.color,
                                                    boxShadow: `0 0 ${8 * trailPoint.opacity}px ${entity.color}`,
                                                    opacity: trailPoint.opacity * 0.8,
                                                    filter: `blur(${j * 0.15}px)`
                                                }}
                                            />
                                        ))}

                                    {/* Main Climbing Entity */}
                                    <div
                                        className="absolute rounded-full"
                                        style={{
                                            left: '50%',
                                            width: `${entity.size + 1}px`,
                                            height: `${entity.size + 1}px`,
                                            transform: `
                      translateX(-50%) 
                      translateY(${entity.y}px) 
                      translateX(${entity.x}px)
                      translateZ(${entity.z}px)
                    `,
                                            backgroundColor: entity.color,
                                            boxShadow: `
                      0 0 12px ${entity.color}, 
                      0 0 24px ${entity.color},
                      inset 0 0 6px rgba(255,255,255,0.4)
                    `,
                                            opacity: 0.9,
                                            transformStyle: 'preserve-3d'
                                        }}
                                    />
                                </React.Fragment>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PsychedelicDNAHelix;