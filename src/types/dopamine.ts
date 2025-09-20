export interface Activity {
  id: string;
  name: string;
  duration: number; // in minutes
  time: string; // HH:MM format
  type: 'good' | 'bad';
  dopamineImpact: {
    spike: number; // immediate spike
    baseline: number; // new baseline after crash
    duration: number; // how long the effect lasts (minutes)
    peakLatency?: number; // time to reach peak in minutes
    recoveryRate?: number; // recovery rate after activity (1-10, higher = faster)
  };
  expectationModifier?: number; // how expectation affects dopamine release (-100 to 100)
  pathway?: string; // primary neural pathway activated (e.g., 'mesolimbic')
  brainRegions?: string[]; // brain regions most affected
  habitFormingIndex?: number; // how habit-forming (1-10, higher = more habit-forming)
  neuroplasticityEffect?: number; // impact on brain plasticity (-10 to 10)
  tolerance?: boolean; // whether activity builds tolerance over time
}

export interface DopaminePoint {
  time: string;
  level: number;
  activity?: string;
  type?: 'spike' | 'crash' | 'baseline' | 'decline' | 'anticipation';
  brainRegions?: string[]; // which brain regions are primarily active
  receptorSaturation?: number; // D1/D2 receptor saturation level (0-100%)
}

// Neural pathways involved in dopamine signaling
export enum DopaminePathway {
  MESOLIMBIC = 'mesolimbic', // reward/pleasure pathway
  MESOCORTICAL = 'mesocortical', // executive function/motivation
  NIGROSTRIATAL = 'nigrostriatal', // motor control
  TUBEROINFUNDIBULAR = 'tuberoinfundibular' // hormone regulation
}

// Key dopamine receptors
export interface DopamineReceptors {
  d1Family: number; // D1, D5 (excitatory) - 0-100%
  d2Family: number; // D2, D3, D4 (inhibitory) - 0-100%
}

export const ACTIVITY_PRESETS: Record<string, Omit<Activity, 'id' | 'time'>> = {
  // Physical Activities
  'intense_workout': {
    name: 'Intense Workout (HIIT)',
    duration: 45,
    type: 'good',
    dopamineImpact: {
      spike: 150,
      baseline: 120,
      duration: 240,
      peakLatency: 25, // Peak during/after exercise
      recoveryRate: 7
    },
    expectationModifier: 10, // Little affected by expectation
    pathway: DopaminePathway.MESOLIMBIC,
    brainRegions: ['prefrontal-cortex', 'nucleus-accumbens', 'ventral-tegmental'],
    habitFormingIndex: 7,
    neuroplasticityEffect: 8,
    tolerance: false // Exercise maintains effectiveness
  },
  'moderate_exercise': {
    name: 'Moderate Exercise',
    duration: 30,
    type: 'good',
    dopamineImpact: {
      spike: 100,
      baseline: 80,
      duration: 180,
      peakLatency: 15,
      recoveryRate: 6
    },
    pathway: DopaminePathway.MESOLIMBIC,
    brainRegions: ['prefrontal-cortex', 'nucleus-accumbens'],
    habitFormingIndex: 6,
    neuroplasticityEffect: 6
  },
  'walking': {
    name: 'Nature Walk',
    duration: 20,
    type: 'good',
    dopamineImpact: {
      spike: 60,
      baseline: 40,
      duration: 120,
      peakLatency: 10,
      recoveryRate: 5
    },
    brainRegions: ['hippocampus', 'prefrontal-cortex'],
    neuroplasticityEffect: 4
  },
  'cold_exposure': {
    name: 'Cold Shower/Ice Bath',
    duration: 5,
    type: 'good',
    dopamineImpact: {
      spike: 200,
      baseline: 100,
      duration: 180,
      peakLatency: 3, // Fast response
      recoveryRate: 8
    },
    pathway: DopaminePathway.MESOLIMBIC,
    brainRegions: ['prefrontal-cortex', 'locus-coeruleus'], // Also activates norepinephrine
    neuroplasticityEffect: 7
  },

  // Mindfulness & Mental Activities
  'deep_meditation': {
    name: 'Deep Meditation (20+ min)',
    duration: 25,
    type: 'good',
    dopamineImpact: {
      spike: 80,
      baseline: 65,
      duration: 150,
      peakLatency: 20, // Takes time to reach full effect
      recoveryRate: 4
    },
    brainRegions: ['prefrontal-cortex', 'hippocampus'],
    neuroplasticityEffect: 9, // High neuroplasticity benefit
    pathway: DopaminePathway.MESOCORTICAL
  },
  'breathing_exercise': {
    name: 'Breathing Exercise',
    duration: 10,
    type: 'good',
    dopamineImpact: {
      spike: 40,
      baseline: 30,
      duration: 90,
      peakLatency: 8,
      recoveryRate: 5
    },
    brainRegions: ['prefrontal-cortex'],
    neuroplasticityEffect: 3
  },
  'reading_learning': {
    name: 'Reading/Learning',
    duration: 45,
    type: 'good',
    dopamineImpact: {
      spike: 50,
      baseline: 40,
      duration: 120,
      peakLatency: 30, // Takes time to build
      recoveryRate: 4
    },
    pathway: DopaminePathway.MESOCORTICAL,
    brainRegions: ['prefrontal-cortex', 'hippocampus'],
    habitFormingIndex: 4,
    neuroplasticityEffect: 8
  },
  'creative_work': {
    name: 'Creative Work/Art',
    duration: 60,
    type: 'good',
    dopamineImpact: {
      spike: 70,
      baseline: 50,
      duration: 180,
      peakLatency: 25,
      recoveryRate: 5
    },
    pathway: DopaminePathway.MESOCORTICAL,
    brainRegions: ['prefrontal-cortex', 'hippocampus', 'caudate-nucleus'],
    neuroplasticityEffect: 7
  },

  // Social & Achievement
  'meaningful_conversation': {
    name: 'Deep Conversation',
    duration: 30,
    type: 'good',
    dopamineImpact: {
      spike: 90,
      baseline: 60,
      duration: 120,
      peakLatency: 15,
      recoveryRate: 6
    },
    brainRegions: ['prefrontal-cortex', 'temporal-cortex'],
    neuroplasticityEffect: 6
  },
  'helping_others': {
    name: 'Helping Others',
    duration: 45,
    type: 'good',
    dopamineImpact: {
      spike: 100,
      baseline: 70,
      duration: 180,
      peakLatency: 20,
      recoveryRate: 6
    },
    expectationModifier: -20, // Less expected = more reward
    brainRegions: ['prefrontal-cortex', 'nucleus-accumbens'],
    neuroplasticityEffect: 7
  },
  'goal_achievement': {
    name: 'Goal Achievement',
    duration: 5,
    type: 'good',
    dopamineImpact: {
      spike: 200,
      baseline: 150,
      duration: 300,
      peakLatency: 2, // Almost immediate
      recoveryRate: 9
    },
    expectationModifier: -50, // Heavily affected by expectation (less reward if expected)
    pathway: DopaminePathway.MESOLIMBIC,
    brainRegions: ['nucleus-accumbens', 'prefrontal-cortex', 'caudate-nucleus'],
    neuroplasticityEffect: 6
  },

  // Digital Overstimulation (Variable punishment rewards)
  'social_media_scroll': {
    name: 'Social Media Scrolling',
    duration: 45,
    type: 'bad',
    dopamineImpact: {
      spike: 250,
      baseline: -120,
      duration: 30,
      peakLatency: 5, // Quick hits
      recoveryRate: 2 // Slow to recover
    },
    expectationModifier: 30, // Variable reward schedule makes it more addictive
    pathway: DopaminePathway.MESOLIMBIC,
    brainRegions: ['nucleus-accumbens', 'prefrontal-cortex'],
    habitFormingIndex: 9,
    neuroplasticityEffect: -5, // Negative neuroplasticity
    tolerance: true // Builds tolerance quickly
  },
  'tiktok_reels': {
    name: 'TikTok/Reels Binge',
    duration: 90,
    type: 'bad',
    dopamineImpact: {
      spike: 300,
      baseline: -150,
      duration: 25,
      peakLatency: 3, // Very quick hits
      recoveryRate: 1 // Very slow recovery
    },
    expectationModifier: 40, // Highly unpredictable reward schedule
    pathway: DopaminePathway.MESOLIMBIC,
    brainRegions: ['nucleus-accumbens', 'prefrontal-cortex'],
    habitFormingIndex: 10,
    neuroplasticityEffect: -7,
    tolerance: true
  },
  'youtube_shorts': {
    name: 'YouTube Shorts',
    duration: 60,
    type: 'bad',
    dopamineImpact: {
      spike: 280,
      baseline: -130,
      duration: 20,
      peakLatency: 4,
      recoveryRate: 2
    },
    expectationModifier: 35,
    pathway: DopaminePathway.MESOLIMBIC,
    brainRegions: ['nucleus-accumbens', 'prefrontal-cortex'],
    habitFormingIndex: 9,
    neuroplasticityEffect: -6,
    tolerance: true
  },
  'video_gaming': {
    name: 'Video Gaming Session',
    duration: 120,
    type: 'bad',
    dopamineImpact: {
      spike: 350,
      baseline: -180,
      duration: 45,
      peakLatency: 10,
      recoveryRate: 2
    },
    pathway: DopaminePathway.MESOLIMBIC,
    brainRegions: ['nucleus-accumbens', 'prefrontal-cortex', 'caudate-nucleus'],
    habitFormingIndex: 8,
    neuroplasticityEffect: -4, // Some games may have positive effects, but extended sessions negative
    tolerance: true
  },
  'mobile_gaming': {
    name: 'Mobile Gaming',
    duration: 90,
    type: 'bad',
    dopamineImpact: {
      spike: 320,
      baseline: -160,
      duration: 40,
      peakLatency: 7,
      recoveryRate: 2
    },
    expectationModifier: 45, // Microtransactions and variable rewards
    pathway: DopaminePathway.MESOLIMBIC,
    brainRegions: ['nucleus-accumbens', 'prefrontal-cortex'],
    habitFormingIndex: 9,
    neuroplasticityEffect: -5,
    tolerance: true
  },

  // Consumables & Instant Gratification
  'junk_food_binge': {
    name: 'Junk Food Binge',
    duration: 20,
    type: 'bad',
    dopamineImpact: {
      spike: 200,
      baseline: -100,
      duration: 30,
      peakLatency: 15, // Takes time for blood glucose to spike
      recoveryRate: 3
    },
    pathway: DopaminePathway.MESOLIMBIC,
    brainRegions: ['nucleus-accumbens', 'hypothalamus'],
    habitFormingIndex: 7,
    neuroplasticityEffect: -4,
    tolerance: true
  },
  'sugar_rush': {
    name: 'Sugar/Energy Drinks',
    duration: 5,
    type: 'bad',
    dopamineImpact: {
      spike: 180,
      baseline: -80,
      duration: 60,
      peakLatency: 10,
      recoveryRate: 3
    },
    pathway: DopaminePathway.MESOLIMBIC,
    brainRegions: ['nucleus-accumbens', 'hypothalamus'],
    habitFormingIndex: 8,
    neuroplasticityEffect: -3,
    tolerance: true
  },
  'alcohol': {
    name: 'Alcohol Consumption',
    duration: 60,
    type: 'bad',
    dopamineImpact: {
      spike: 200,
      baseline: -120,
      duration: 180,
      peakLatency: 25,
      recoveryRate: 1 // Very slow recovery
    },
    pathway: DopaminePathway.MESOLIMBIC,
    brainRegions: ['nucleus-accumbens', 'prefrontal-cortex', 'ventral-tegmental'],
    habitFormingIndex: 8,
    neuroplasticityEffect: -6,
    tolerance: true
  },

  // Entertainment Overconsumption
  'netflix_binge': {
    name: 'Netflix/Series Binge',
    duration: 180,
    type: 'bad',
    dopamineImpact: {
      spike: 220,
      baseline: -140,
      duration: 90,
      peakLatency: 30,
      recoveryRate: 3
    },
    pathway: DopaminePathway.MESOLIMBIC,
    brainRegions: ['nucleus-accumbens', 'prefrontal-cortex'],
    habitFormingIndex: 7,
    neuroplasticityEffect: -5,
    tolerance: true
  },
  'mindless_tv': {
    name: 'Mindless TV Watching',
    duration: 120,
    type: 'bad',
    dopamineImpact: {
      spike: 150,
      baseline: -90,
      duration: 60,
      peakLatency: 20,
      recoveryRate: 3
    },
    brainRegions: ['nucleus-accumbens'],
    habitFormingIndex: 5,
    neuroplasticityEffect: -4
  },

  // Sexual/Adult Content
  'pornography': {
    name: 'Pornography',
    duration: 25,
    type: 'bad',
    dopamineImpact: {
      spike: 400, // One of the highest natural dopamine releasers
      baseline: -250,
      duration: 20,
      peakLatency: 5,
      recoveryRate: 1 // Very slow recovery
    },
    pathway: DopaminePathway.MESOLIMBIC,
    brainRegions: ['nucleus-accumbens', 'hypothalamus', 'prefrontal-cortex'],
    habitFormingIndex: 10, // Extremely habit-forming
    neuroplasticityEffect: -8, // Significant negative neuroplasticity
    tolerance: true
  },
  'excessive_masturbation': {
    name: 'Excessive Masturbation',
    duration: 20,
    type: 'bad',
    dopamineImpact: {
      spike: 350,
      baseline: -200,
      duration: 30,
      peakLatency: 10,
      recoveryRate: 2
    },
    pathway: DopaminePathway.MESOLIMBIC,
    brainRegions: ['nucleus-accumbens', 'hypothalamus'],
    habitFormingIndex: 9,
    neuroplasticityEffect: -7,
    tolerance: true
  },

  // Shopping & Material Addiction
  'impulse_shopping': {
    name: 'Impulse Shopping',
    duration: 30,
    type: 'bad',
    dopamineImpact: {
      spike: 180,
      baseline: -100,
      duration: 45,
      peakLatency: 5,
      recoveryRate: 3
    },
    expectationModifier: 20, // Anticipation plays a role
    brainRegions: ['nucleus-accumbens', 'prefrontal-cortex'],
    habitFormingIndex: 7,
    neuroplasticityEffect: -4,
    tolerance: true
  },
  'online_shopping': {
    name: 'Online Shopping Spree',
    duration: 60,
    type: 'bad',
    dopamineImpact: {
      spike: 200,
      baseline: -110,
      duration: 60,
      peakLatency: 10,
      recoveryRate: 3
    },
    expectationModifier: 25, // Anticipation heightens the effect
    brainRegions: ['nucleus-accumbens', 'prefrontal-cortex'],
    habitFormingIndex: 8,
    neuroplasticityEffect: -4,
    tolerance: true
  }
};

// Receptor sensitivity model
export interface ReceptorState {
  type: 'd1' | 'd2' | 'd3' | 'd4' | 'd5';
  sensitivity: number; // 0-100%, with 100% being normal sensitivity
  recoveryRate: number; // How quickly receptors recover sensitivity (1-10)
  location: string[]; // Brain regions
}

// Research-backed baseline dopamine levels for different brain regions
export interface RegionalDopamine {
  regionId: string;
  baselineLevel: number; // nM or % of normal
  currentLevel: number;
  receptorDensity: {
    d1Family: number; // 0-100%
    d2Family: number; // 0-100%
  };
}

// Neuroplasticity model related to dopamine
export interface DopamineNeuroplasticity {
  regionId: string;
  baselineConnectionStrength: number; // 0-100%
  currentStrength: number; // 0-100%
  longTermPotentiation: boolean; // Is LTP active?
  longTermDepression: boolean; // Is LTD active?
  rewiringSpeed: number; // 1-10, how quickly new connections form
}

// Reward prediction error model - key to dopamine function
export interface RewardPredictionError {
  expectedReward: number;
  actualReward: number;
  error: number; // actual - expected
  impactOnLearning: number; // -10 to 10
}

// Default regional dopamine data based on neuroscience research
export const REGIONAL_DOPAMINE_DEFAULTS: RegionalDopamine[] = [
  {
    regionId: 'nucleus-accumbens',
    baselineLevel: 100,  // Normalized to 100% for baseline
    currentLevel: 100,
    receptorDensity: {
      d1Family: 70,  // High D1 receptor density in NAcc
      d2Family: 60   // Also significant D2 receptors
    }
  },
  {
    regionId: 'ventral-tegmental',
    baselineLevel: 150, // Source of dopaminergic neurons
    currentLevel: 150,
    receptorDensity: {
      d1Family: 40,
      d2Family: 80  // High D2 (autoreceptors) in VTA
    }
  },
  {
    regionId: 'prefrontal-cortex',
    baselineLevel: 80,
    currentLevel: 80,
    receptorDensity: {
      d1Family: 60,
      d2Family: 40
    }
  },
  {
    regionId: 'caudate-nucleus',
    baselineLevel: 90,
    currentLevel: 90,
    receptorDensity: {
      d1Family: 65,
      d2Family: 55
    }
  },
  {
    regionId: 'putamen',
    baselineLevel: 85,
    currentLevel: 85,
    receptorDensity: {
      d1Family: 60,
      d2Family: 50
    }
  },
  {
    regionId: 'hippocampus',
    baselineLevel: 60,
    currentLevel: 60,
    receptorDensity: {
      d1Family: 30,
      d2Family: 20
    }
  },
  {
    regionId: 'amygdala',
    baselineLevel: 70,
    currentLevel: 70,
    receptorDensity: {
      d1Family: 45,
      d2Family: 35
    }
  }
];