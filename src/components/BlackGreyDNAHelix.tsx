import React, { useEffect, useState } from 'react';

// CSS for animations
const styles = `
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
`;

interface BlackGreyDNAHelixProps {
  scrollProgress: number;
}

const BlackGreyDNAHelix: React.FC<BlackGreyDNAHelixProps> = ({ scrollProgress }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    // Inject CSS styles
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
    
    const interval = setInterval(() => {
      setTime(prev => prev + 0.012);
    }, 16);

    return () => {
      clearInterval(interval);
      if (document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  // Generate sophisticated neural network-like DNA structure
  const dnaElements = Array.from({ length: 45 }, (_, i) => {
    const baseHeight = i * 28;
    const timeOffset = time * 18;
    const finalHeight = (baseHeight - timeOffset) % (window.innerHeight + 500) - 250;
    
    // Create complex layered spiral patterns
    const primarySpiral = (i * 23.5) % 360;
    const secondarySpiral = (i * 67.3 + time * 45) % 360;
    const tertiaryWave = Math.sin(i * 0.4 + time * 2) * 15;
    
    const combinedRotation = primarySpiral + tertiaryWave;
    const depthVariation = Math.cos(i * 0.3 + time * 1.5) * 12;
    
    // Advanced color system with multiple grey tones
    const baseGrey = 45 + Math.sin(i * 0.2 + time) * 25;
    const accentGrey = baseGrey + 20;
    const pulseIntensity = 0.6 + Math.sin(time * 2.5 + i * 0.4) * 0.4;
    
    // Neural connection probability
    const hasConnection = (i % 3 === 0) || (Math.sin(i * 0.7) > 0.3);
    const connectionLength = 25 + Math.sin(i * 0.5) * 15;
    
    return {
      id: i,
      height: finalHeight,
      rotation: combinedRotation,
      depth: depthVariation,
      spiralPhase: secondarySpiral,
      baseColor: `rgba(${accentGrey}, ${accentGrey}, ${accentGrey}, ${pulseIntensity})`,
      shadowColor: `rgba(15, 15, 15, ${pulseIntensity * 0.9})`,
      glowColor: `rgba(${baseGrey + 40}, ${baseGrey + 40}, ${baseGrey + 40}, ${pulseIntensity * 0.3})`,
      isSpike: i % 4 === 0,
      isMajorNode: i % 7 === 0,
      hasConnection,
      connectionLength,
      spikeLength: 18 + (Math.sin(i * 0.3) * 12),
      nodeSize: hasConnection ? 6 + Math.sin(time + i) * 2 : 4
    };
  });

  // Generate advanced climbing neural entities
  const climbingEntities = Array.from({ length: 18 }, (_, i) => {
    const baseAngle = (i / 18) * 360;
    const climbSpeed = 8 + (i % 4) * 2;
    const radiusBase = 18 + (i % 3) * 6;
    const radiusVariation = Math.sin(time * 1.5 + i * 0.8) * 4;
    const finalRadius = radiusBase + radiusVariation;
    
    const timeClimb = time * climbSpeed;
    const totalHeight = (timeClimb + i * 45) % (window.innerHeight + 500) - 250;
    
    // Multi-layered spiral motion
    const primaryAngle = baseAngle + (totalHeight * 1.2);
    const secondaryWave = Math.sin(time * 2 + i * 0.6) * 10;
    const finalAngle = primaryAngle + secondaryWave;
    
    const x = Math.cos(finalAngle * Math.PI / 180) * finalRadius;
    const z = Math.sin(finalAngle * Math.PI / 180) * finalRadius;
    
    // Enhanced visual properties
    const intensity = 55 + (i % 4) * 20;
    const highlightIntensity = intensity + 25;
    const pulse = Math.sin(time * 3.5 + i * 0.7) * 0.4 + 0.6;
    const glow = Math.sin(time * 2 + i * 0.4) * 0.3 + 0.4;
    
    // Trail effect
    const trail = Array.from({ length: 6 }, (_, j) => ({
      x: x + Math.sin(time * 2 + j) * 2,
      y: totalHeight - (j * 8),
      z: z + Math.cos(time * 2 + j) * 2,
      opacity: (1 - j * 0.15) * pulse,
      size: Math.max(1, 4 - j),
      color: `rgba(${intensity - j * 5}, ${intensity - j * 5}, ${intensity - j * 5}, ${(1 - j * 0.2) * pulse})`
    }));
    
    return {
      id: i,
      x,
      y: totalHeight,
      z,
      baseColor: `rgba(${highlightIntensity}, ${highlightIntensity}, ${highlightIntensity}, ${pulse})`,
      shadowColor: `rgba(20, 20, 20, ${pulse * 0.8})`,
      glowColor: `rgba(${intensity + 30}, ${intensity + 30}, ${intensity + 30}, ${glow})`,
      size: 5 + Math.sin(time + i) * 1.5,
      isSpike: i % 5 === 0,
      isMajorEntity: i % 8 === 0,
      spikeLength: 15 + Math.sin(i * 0.4 + time) * 8,
      trail,
      pulsation: pulse
    };
  });

  const earthAxisRotation = time * 4;

  return (
    <div className="fixed right-4 top-20 w-24 h-[calc(100vh-80px)] pointer-events-none z-0">
      <div className="relative w-full h-full overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            perspective: '1500px',
            transformStyle: 'preserve-3d'
          }}
        >
          <div
            style={{
              transform: `rotateY(${earthAxisRotation}deg)`,
              transformStyle: 'preserve-3d',
              height: '100%',
              width: '100%',
              position: 'relative'
            }}
          >
            {/* Advanced Neural DNA Structure */}
            {dnaElements
              .filter(element => element.height >= -150 && element.height <= window.innerHeight + 150)
              .map((element) => (
              <div
                key={element.id}
                className="absolute left-1/2"
                style={{
                  transform: `
                    translateX(-50%) 
                    translateY(${element.height}px) 
                    rotateY(${element.rotation}deg)
                    translateZ(${element.depth}px)
                  `,
                  transformStyle: 'preserve-3d'
                }}
              >
                {element.isSpike ? (
                  // Enhanced Spike Element
                  <>
                    {/* Main Spike Body */}
                    <div 
                      className="absolute"
                      style={{
                        width: element.isMajorNode ? '5px' : '3px',
                        height: `${element.spikeLength}px`,
                        left: element.isMajorNode ? '-2.5px' : '-1.5px',
                        top: '0px',
                        background: `linear-gradient(to bottom, ${element.baseColor}, ${element.shadowColor})`,
                        boxShadow: `
                          0 0 8px ${element.glowColor},
                          0 0 4px ${element.shadowColor},
                          inset 1px 0 2px rgba(255,255,255,0.1)
                        `,
                        borderRadius: '2px',
                        filter: `blur(0.3px)`
                      }}
                    />
                    {/* Spike Tip */}
                    <div 
                      className="absolute rounded-full"
                      style={{
                        width: element.isMajorNode ? '6px' : '4px',
                        height: element.isMajorNode ? '6px' : '4px',
                        left: element.isMajorNode ? '-3px' : '-2px',
                        top: `${element.spikeLength - (element.isMajorNode ? 3 : 2)}px`,
                        background: `radial-gradient(circle at 30% 30%, ${element.baseColor}, ${element.shadowColor})`,
                        boxShadow: `
                          0 0 6px ${element.glowColor},
                          0 0 3px ${element.shadowColor}
                        `
                      }}
                    />
                    {/* Neural Connections */}
                    {element.hasConnection && (
                      <div 
                        className="absolute opacity-40"
                        style={{
                          width: `${element.connectionLength}px`,
                          height: '1px',
                          left: `${-element.connectionLength/2}px`,
                          top: `${element.spikeLength * 0.6}px`,
                          background: `linear-gradient(90deg, transparent, ${element.baseColor}, transparent)`,
                          boxShadow: `0 0 2px ${element.glowColor}`,
                          transform: `rotateZ(${element.spiralPhase}deg)`
                        }}
                      />
                    )}
                  </>
                ) : (
                  // Enhanced Ball Nodes with Neural Connections
                  <>
                    {/* Left Node */}
                    <div 
                      className="absolute rounded-full"
                      style={{
                        width: `${element.nodeSize}px`,
                        height: `${element.nodeSize}px`,
                        transform: `translateX(-${element.nodeSize + 15}px) translateZ(${element.depth * 0.3}px)`,
                        background: `radial-gradient(circle at 25% 25%, ${element.baseColor}, ${element.shadowColor})`,
                        boxShadow: `
                          0 0 10px ${element.glowColor},
                          0 0 5px ${element.shadowColor},
                          inset 1px 1px 3px rgba(255,255,255,0.15),
                          inset -1px -1px 3px rgba(0,0,0,0.4)
                        `,
                        border: `1px solid ${element.shadowColor}`,
                        filter: element.isMajorNode ? 'blur(0.2px)' : 'blur(0.5px)'
                      }}
                    />
                    {/* Right Node */}
                    <div 
                      className="absolute rounded-full"
                      style={{
                        width: `${element.nodeSize}px`,
                        height: `${element.nodeSize}px`,
                        transform: `translateX(${15}px) translateZ(${-element.depth * 0.3}px)`,
                        background: `radial-gradient(circle at 25% 25%, ${element.baseColor}, ${element.shadowColor})`,
                        boxShadow: `
                          0 0 10px ${element.glowColor},
                          0 0 5px ${element.shadowColor},
                          inset 1px 1px 3px rgba(255,255,255,0.15),
                          inset -1px -1px 3px rgba(0,0,0,0.4)
                        `,
                        border: `1px solid ${element.shadowColor}`,
                        filter: element.isMajorNode ? 'blur(0.2px)' : 'blur(0.5px)'
                      }}
                    />
                    {/* Neural Bond */}
                    <div 
                      className="absolute"
                      style={{
                        width: '30px',
                        height: '2px',
                        left: '-15px',
                        top: `${element.nodeSize/2}px`,
                        background: `linear-gradient(90deg, ${element.shadowColor}, ${element.baseColor}, ${element.shadowColor})`,
                        boxShadow: `0 0 4px ${element.glowColor}`,
                        borderRadius: '1px',
                        opacity: 0.7,
                        transform: `rotateZ(${Math.sin(element.spiralPhase * Math.PI/180) * 5}deg)`
                      }}
                    />
                    {/* Additional Neural Connections */}
                    {element.hasConnection && (
                      <>
                        <div 
                          className="absolute opacity-30"
                          style={{
                            width: `${element.connectionLength * 0.7}px`,
                            height: '1px',
                            left: `${-element.connectionLength * 0.35}px`,
                            top: `${element.nodeSize + 5}px`,
                            background: `linear-gradient(90deg, transparent, ${element.baseColor}, transparent)`,
                            boxShadow: `0 0 2px ${element.glowColor}`,
                            transform: `rotateZ(${element.spiralPhase * 0.7}deg)`
                          }}
                        />
                        <div 
                          className="absolute opacity-25"
                          style={{
                            width: `${element.connectionLength * 0.5}px`,
                            height: '1px',
                            left: `${-element.connectionLength * 0.25}px`,
                            top: `${-5}px`,
                            background: `linear-gradient(90deg, transparent, ${element.baseColor}, transparent)`,
                            boxShadow: `0 0 2px ${element.glowColor}`,
                            transform: `rotateZ(${-element.spiralPhase * 0.5}deg)`
                          }}
                        />
                      </>
                    )}
                  </>
                )}
              </div>
            ))}
            
            {/* Advanced Climbing Neural Entities */}
            {climbingEntities
              .filter(entity => entity.y >= -250 && entity.y <= window.innerHeight + 250)
              .map((entity) => (
              <React.Fragment key={entity.id}>
                {/* Neural Trail Effects */}
                {entity.trail.map((trailPoint, j) => (
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
                      background: `radial-gradient(circle at 30% 30%, ${trailPoint.color}, transparent)`,
                      boxShadow: `0 0 ${6 * trailPoint.opacity}px ${trailPoint.color}`,
                      opacity: trailPoint.opacity,
                      filter: `blur(${j * 0.4}px)`,
                      transformStyle: 'preserve-3d'
                    }}
                  />
                ))}
                
                {/* Main Climbing Entity */}
                {entity.isSpike ? (
                  // Enhanced Climbing Spike
                  <div
                    className="absolute"
                    style={{
                      left: '50%',
                      width: entity.isMajorEntity ? '4px' : '2px',
                      height: `${entity.spikeLength}px`,
                      transform: `
                        translateX(-50%) 
                        translateY(${entity.y}px) 
                        translateX(${entity.x}px)
                        translateZ(${entity.z}px)
                      `,
                      background: `linear-gradient(to bottom, ${entity.baseColor}, ${entity.shadowColor})`,
                      boxShadow: `
                        0 0 8px ${entity.glowColor}, 
                        0 0 4px ${entity.shadowColor},
                        inset 1px 0 2px rgba(255,255,255,0.1)
                      `,
                      borderRadius: '1px',
                      transformStyle: 'preserve-3d',
                      filter: `blur(0.3px)`
                    }}
                  />
                ) : (
                  // Enhanced Climbing Neural Ball
                  <div
                    className="absolute rounded-full"
                    style={{
                      left: '50%',
                      width: `${entity.size}px`,
                      height: `${entity.size}px`,
                      transform: `
                        translateX(-50%) 
                        translateY(${entity.y}px) 
                        translateX(${entity.x}px)
                        translateZ(${entity.z}px)
                      `,
                      background: `radial-gradient(circle at 25% 25%, ${entity.baseColor}, ${entity.shadowColor})`,
                      boxShadow: `
                        0 0 12px ${entity.glowColor}, 
                        0 0 6px ${entity.shadowColor},
                        inset 2px 2px 4px rgba(255,255,255,0.15),
                        inset -2px -2px 4px rgba(0,0,0,0.4)
                      `,
                      border: `1px solid ${entity.shadowColor}`,
                      transformStyle: 'preserve-3d',
                      filter: entity.isMajorEntity ? 'blur(0.2px)' : 'blur(0.4px)',
                      animation: entity.isMajorEntity ? `pulse 2s ease-in-out infinite` : 'none'
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlackGreyDNAHelix;