export interface Neurotransmitter {
  id: string;
  name: string;
  color: string;
  glowColor: string;
  description: string;
  primaryFunction: string;
  targetRegions: string[];
  concentration: number;
  active: boolean;
}

export interface BrainRegion {
  id: string;
  name: string;
  position: [number, number, number];
  size: number;
  color: string;
  activeNeurotransmitters: string[];
  description: string;
}

export interface NeuralPathway {
  id: string;
  from: string;
  to: string;
  neurotransmitter: string;
  intensity: number;
  active: boolean;
}

export const NEUROTRANSMITTERS: Neurotransmitter[] = [
  {
    id: 'dopamine',
    name: 'Dopamine',
    color: '#FFD700',
    glowColor: 'rgba(255, 215, 0, 0.3)',
    description: 'Reward and motivation chemical',
    primaryFunction: 'Controls reward, motivation, and pleasure',
    targetRegions: ['prefrontal-cortex', 'nucleus-accumbens', 'ventral-tegmental'],
    concentration: 0,
    active: false,
  },
  {
    id: 'serotonin',
    name: 'Serotonin',
    color: '#3B82F6',
    glowColor: 'rgba(59, 130, 246, 0.3)',
    description: 'Mood regulation and happiness chemical',
    primaryFunction: 'Regulates mood, sleep, and social behavior',
    targetRegions: ['hippocampus', 'amygdala', 'prefrontal-cortex'],
    concentration: 0,
    active: false,
  },
  {
    id: 'gaba',
    name: 'GABA',
    color: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.3)',
    description: 'Primary inhibitory neurotransmitter',
    primaryFunction: 'Calms neural activity and reduces anxiety',
    targetRegions: ['amygdala', 'thalamus', 'cerebral-cortex'],
    concentration: 0,
    active: false,
  },
  {
    id: 'glutamate',
    name: 'Glutamate',
    color: '#EF4444',
    glowColor: 'rgba(239, 68, 68, 0.3)',
    description: 'Primary excitatory neurotransmitter',
    primaryFunction: 'Excites neurons and enhances learning',
    targetRegions: ['hippocampus', 'cerebral-cortex', 'cerebellum'],
    concentration: 0,
    active: false,
  },
  {
    id: 'acetylcholine',
    name: 'Acetylcholine',
    color: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.3)',
    description: 'Learning and memory chemical',
    primaryFunction: 'Enhances attention, learning, and memory',
    targetRegions: ['hippocampus', 'prefrontal-cortex', 'basal-forebrain'],
    concentration: 0,
    active: false,
  },
  {
    id: 'norepinephrine',
    name: 'Norepinephrine',
    color: '#F97316',
    glowColor: 'rgba(249, 115, 22, 0.3)',
    description: 'Alertness and arousal chemical',
    primaryFunction: 'Controls alertness, arousal, and attention',
    targetRegions: ['locus-coeruleus', 'prefrontal-cortex', 'amygdala'],
    concentration: 0,
    active: false,
  },
];

export const BRAIN_REGIONS: BrainRegion[] = [
  // Frontal Lobe Regions
  {
    id: 'prefrontal-cortex',
    name: 'Prefrontal Cortex',
    position: [0, 1.8, 1.4],
    size: 0.7,
    color: '#3B82F6',
    activeNeurotransmitters: [],
    description: 'Executive functions, decision-making, and working memory',
  },
  {
    id: 'motor-cortex',
    name: 'Primary Motor Cortex',
    position: [0, 1.2, 0.8],
    size: 0.6,
    color: '#8B5CF6',
    activeNeurotransmitters: [],
    description: 'Voluntary motor control and movement planning',
  },
  
  // Temporal Lobe Regions
  {
    id: 'hippocampus',
    name: 'Hippocampus',
    position: [-1.4, 0.2, -0.3],
    size: 0.5,
    color: '#10B981',
    activeNeurotransmitters: [],
    description: 'Memory formation, consolidation, and spatial navigation',
  },
  {
    id: 'amygdala',
    name: 'Amygdala',
    position: [-1.6, -0.2, 0.3],
    size: 0.35,
    color: '#EF4444',
    activeNeurotransmitters: [],
    description: 'Emotional processing, fear conditioning, and threat detection',
  },
  {
    id: 'temporal-cortex',
    name: 'Temporal Cortex',
    position: [-1.8, 0.5, 0],
    size: 0.8,
    color: '#F59E0B',
    activeNeurotransmitters: [],
    description: 'Auditory processing and language comprehension',
  },

  // Subcortical Structures
  {
    id: 'thalamus',
    name: 'Thalamus',
    position: [0, 0.3, 0],
    size: 0.4,
    color: '#A855F7',
    activeNeurotransmitters: [],
    description: 'Sensory relay station and consciousness gating',
  },
  {
    id: 'hypothalamus',
    name: 'Hypothalamus',
    position: [0, -0.1, 0.2],
    size: 0.25,
    color: '#EC4899',
    activeNeurotransmitters: [],
    description: 'Homeostasis, hormone regulation, and basic drives',
  },
  {
    id: 'nucleus-accumbens',
    name: 'Nucleus Accumbens',
    position: [0, 0.6, 0.9],
    size: 0.3,
    color: '#FFD700',
    activeNeurotransmitters: [],
    description: 'Reward processing, addiction, and motivated behavior',
  },

  // Brainstem Regions
  {
    id: 'ventral-tegmental',
    name: 'Ventral Tegmental Area',
    position: [0, -0.5, -0.4],
    size: 0.25,
    color: '#F97316',
    activeNeurotransmitters: [],
    description: 'Dopamine production and reward signaling',
  },
  {
    id: 'locus-coeruleus',
    name: 'Locus Coeruleus',
    position: [0, -0.8, -0.6],
    size: 0.2,
    color: '#06B6D4',
    activeNeurotransmitters: [],
    description: 'Norepinephrine production and arousal regulation',
  },
  {
    id: 'raphe-nuclei',
    name: 'Raphe Nuclei',
    position: [0, -0.9, -0.3],
    size: 0.2,
    color: '#8B5CF6',
    activeNeurotransmitters: [],
    description: 'Serotonin production and mood regulation',
  },

  // Cerebellum
  {
    id: 'cerebellum',
    name: 'Cerebellum',
    position: [0, -1.3, -1.2],
    size: 0.9,
    color: '#F97316',
    activeNeurotransmitters: [],
    description: 'Motor coordination, balance, and motor learning',
  },

  // Additional Cortical Areas
  {
    id: 'parietal-cortex',
    name: 'Parietal Cortex',
    position: [0, 1.4, -0.2],
    size: 0.7,
    color: '#84CC16',
    activeNeurotransmitters: [],
    description: 'Spatial processing and sensory integration',
  },
  {
    id: 'occipital-cortex',
    name: 'Occipital Cortex',
    position: [0, 1.0, -1.6],
    size: 0.6,
    color: '#EF4444',
    activeNeurotransmitters: [],
    description: 'Visual processing and perception',
  },
  {
    id: 'basal-forebrain',
    name: 'Basal Forebrain',
    position: [0, 0.4, 0.6],
    size: 0.35,
    color: '#A855F7',
    activeNeurotransmitters: [],
    description: 'Acetylcholine production and attention regulation',
  },

  // Basal Ganglia Components
  {
    id: 'caudate-nucleus',
    name: 'Caudate Nucleus',
    position: [-0.8, 0.5, 0.3],
    size: 0.4,
    color: '#6366F1',
    activeNeurotransmitters: [],
    description: 'Movement control and procedural learning',
  },
  {
    id: 'putamen',
    name: 'Putamen',
    position: [-1.0, 0.2, 0.1],
    size: 0.4,
    color: '#8B5CF6',
    activeNeurotransmitters: [],
    description: 'Motor control and habit formation',
  },
];