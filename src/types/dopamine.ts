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
  };
}

export interface DopaminePoint {
  time: string;
  level: number;
  activity?: string;
  type?: 'spike' | 'crash' | 'baseline' | 'decline';
}

export const ACTIVITY_PRESETS: Record<string, Omit<Activity, 'id' | 'time'>> = {
  // Physical Activities (High dopamine, longer duration)
  'intense_workout': {
    name: 'Intense Workout (HIIT)',
    duration: 45,
    type: 'good',
    dopamineImpact: { spike: 150, baseline: 120, duration: 240 }
  },
  'moderate_exercise': {
    name: 'Moderate Exercise',
    duration: 30,
    type: 'good',
    dopamineImpact: { spike: 100, baseline: 80, duration: 180 }
  },
  'walking': {
    name: 'Nature Walk',
    duration: 20,
    type: 'good',
    dopamineImpact: { spike: 60, baseline: 40, duration: 120 }
  },
  'cold_exposure': {
    name: 'Cold Shower/Ice Bath',
    duration: 5,
    type: 'good',
    dopamineImpact: { spike: 200, baseline: 100, duration: 180 }
  },
  
  // Mindfulness & Mental Activities
  'deep_meditation': {
    name: 'Deep Meditation (20+ min)',
    duration: 25,
    type: 'good',
    dopamineImpact: { spike: 80, baseline: 65, duration: 150 }
  },
  'breathing_exercise': {
    name: 'Breathing Exercise',
    duration: 10,
    type: 'good',
    dopamineImpact: { spike: 40, baseline: 30, duration: 90 }
  },
  'reading_learning': {
    name: 'Reading/Learning',
    duration: 45,
    type: 'good',
    dopamineImpact: { spike: 50, baseline: 40, duration: 120 }
  },
  'creative_work': {
    name: 'Creative Work/Art',
    duration: 60,
    type: 'good',
    dopamineImpact: { spike: 70, baseline: 50, duration: 180 }
  },
  
  // Social & Achievement
  'meaningful_conversation': {
    name: 'Deep Conversation',
    duration: 30,
    type: 'good',
    dopamineImpact: { spike: 90, baseline: 60, duration: 120 }
  },
  'helping_others': {
    name: 'Helping Others',
    duration: 45,
    type: 'good',
    dopamineImpact: { spike: 100, baseline: 70, duration: 180 }
  },
  'goal_achievement': {
    name: 'Goal Achievement',
    duration: 5,
    type: 'good',
    dopamineImpact: { spike: 200, baseline: 150, duration: 300 }
  },
  
  // Digital Overstimulation (Variable punishment rewards)
  'social_media_scroll': {
    name: 'Social Media Scrolling',
    duration: 45,
    type: 'bad',
    dopamineImpact: { spike: 250, baseline: -120, duration: 30 }
  },
  'tiktok_reels': {
    name: 'TikTok/Reels Binge',
    duration: 90,
    type: 'bad',
    dopamineImpact: { spike: 300, baseline: -150, duration: 25 }
  },
  'youtube_shorts': {
    name: 'YouTube Shorts',
    duration: 60,
    type: 'bad',
    dopamineImpact: { spike: 280, baseline: -130, duration: 20 }
  },
  'video_gaming': {
    name: 'Video Gaming Session',
    duration: 120,
    type: 'bad',
    dopamineImpact: { spike: 350, baseline: -180, duration: 45 }
  },
  'mobile_gaming': {
    name: 'Mobile Gaming',
    duration: 90,
    type: 'bad',
    dopamineImpact: { spike: 320, baseline: -160, duration: 40 }
  },
  
  // Consumables & Instant Gratification
  'junk_food_binge': {
    name: 'Junk Food Binge',
    duration: 20,
    type: 'bad',
    dopamineImpact: { spike: 200, baseline: -100, duration: 30 }
  },
  'sugar_rush': {
    name: 'Sugar/Energy Drinks',
    duration: 5,
    type: 'bad',
    dopamineImpact: { spike: 180, baseline: -80, duration: 60 }
  },
  'alcohol': {
    name: 'Alcohol Consumption',
    duration: 60,
    type: 'bad',
    dopamineImpact: { spike: 200, baseline: -120, duration: 180 }
  },
  
  // Entertainment Overconsumption
  'netflix_binge': {
    name: 'Netflix/Series Binge',
    duration: 180,
    type: 'bad',
    dopamineImpact: { spike: 220, baseline: -140, duration: 90 }
  },
  'mindless_tv': {
    name: 'Mindless TV Watching',
    duration: 120,
    type: 'bad',
    dopamineImpact: { spike: 150, baseline: -90, duration: 60 }
  },
  
  // Sexual/Adult Content
  'pornography': {
    name: 'Pornography',
    duration: 25,
    type: 'bad',
    dopamineImpact: { spike: 400, baseline: -250, duration: 20 }
  },
  'excessive_masturbation': {
    name: 'Excessive Masturbation',
    duration: 20,
    type: 'bad',
    dopamineImpact: { spike: 350, baseline: -200, duration: 30 }
  },
  
  // Shopping & Material Addiction
  'impulse_shopping': {
    name: 'Impulse Shopping',
    duration: 30,
    type: 'bad',
    dopamineImpact: { spike: 180, baseline: -100, duration: 45 }
  },
  'online_shopping': {
    name: 'Online Shopping Spree',
    duration: 60,
    type: 'bad',
    dopamineImpact: { spike: 200, baseline: -110, duration: 60 }
  }
};