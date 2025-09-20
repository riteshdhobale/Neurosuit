import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Brain, Zap, TrendingUp, Target, BookOpen, Users } from 'lucide-react';
import TabNavigation from '@/components/ui/tab-navigation';
import PsychedelicDNAHelix from '@/components/PsychedelicDNAHelix';
import { useEffect, useState } from 'react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);

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

  const neurotransmitters = [
    {
      name: 'Dopamine',
      subtitle: 'The Motivation Molecule',
      description: 'Master your reward system and build sustainable motivation through the dopamine currency concept.',
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      available: true,
      features: ['Currency tracking', 'Activity planning', 'Baseline monitoring', 'Real-time curves']
    },
    {
      name: 'Serotonin',
      subtitle: 'The Happiness Chemical',
      description: 'Regulate mood, sleep, and emotional well-being through serotonin optimization.',
      color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      available: false,
      features: ['Mood tracking', 'Sleep correlation', 'Social connection', 'Seasonal patterns']
    },
    {
      name: 'Norepinephrine',
      subtitle: 'The Focus Enhancer',
      description: 'Optimize attention, alertness, and stress response for peak performance.',
      color: 'bg-gradient-to-r from-orange-500 to-red-500',
      available: false,
      features: ['Attention spans', 'Stress levels', 'Energy cycles', 'Performance tracking']
    },
    {
      name: 'GABA',
      subtitle: 'The Calming Neurotransmitter',
      description: 'Balance anxiety and promote relaxation through GABA system understanding.',
      color: 'bg-gradient-to-r from-green-500 to-emerald-500',
      available: false,
      features: ['Anxiety monitoring', 'Relaxation techniques', 'Sleep quality', 'Stress recovery']
    },
    {
      name: 'Acetylcholine',
      subtitle: 'The Learning Accelerator',
      description: 'Enhanced memory, learning capacity, and cognitive flexibility.',
      color: 'bg-gradient-to-r from-indigo-500 to-purple-500',
      available: false,
      features: ['Memory consolidation', 'Learning efficiency', 'Cognitive flexibility', 'Attention control']
    }
  ];

  return (
    <div className="min-h-screen bg-background relative">
      {/* Psychedelic DNA Helix */}
      <PsychedelicDNAHelix scrollProgress={scrollProgress} />

      {/* Navigation Tabs */}
      <TabNavigation />

      {/* Hero Section - clean seamless blend */}
      <section className="relative overflow-hidden bg-gradient-to-b from-transparent via-primary/10 to-background py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-8">
            <Badge variant="outline" className="mb-4 text-primary border-primary/20">
              🧠 Neuroscience-Based Self Improvement
            </Badge>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Your Brain's Operating System
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Understand and optimize your neurotransmitters for peak performance, motivation, and well-being.
              Start with dopamine currency tracking and expand to complete brain chemistry mastery.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => navigate('/dopamine')}
              className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            >
              <Zap className="w-5 h-5 mr-2" />
              Start Dopamine Tracking
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/brain')}
              className="text-lg px-8 py-6 border-primary/20 hover:bg-primary/5"
            >
              <Brain className="w-5 h-5 mr-2" />
              Explore 3D Brain
            </Button>
          </div>
        </div>
      </section>

      {/* Dopamine Feature Spotlight */}
      <section className="py-16 bg-gradient-to-r from-card/50 to-card/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">The Dopamine Currency System</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Revolutionary approach to understanding motivation: treat dopamine like currency you earn, spend, and manage wisely.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Real-Time Baseline Tracking</h3>
                  <p className="text-muted-foreground">
                    Watch your dopamine baseline rise and fall based on your activities. See exactly how good and bad habits affect your motivation currency.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Target className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Activity Planning</h3>
                  <p className="text-muted-foreground">
                    Plan your day with 25+ research-backed activities. See predicted dopamine curves and optimize your schedule for sustained motivation.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Gamified Recovery</h3>
                  <p className="text-muted-foreground">
                    Even when you crash to low levels, the system shows you exactly how to recover through good habits and strategic choices.
                  </p>
                </div>
              </div>
            </div>

            <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-6xl mb-4">🚀</div>
                  <h3 className="text-2xl font-bold mb-2">1000</h3>
                  <p className="text-muted-foreground">Your Starting Baseline</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <span className="text-sm">Good Habits</span>
                    <Badge variant="default" className="bg-green-500/20 text-green-700">+Currency</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <span className="text-sm">Bad Habits</span>
                    <Badge variant="destructive" className="bg-red-500/20 text-red-700">-Currency</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Neurotransmitter Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Complete Neurotransmitter Suite</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Master all aspects of your brain chemistry. Start with dopamine, then expand to comprehensive neurotransmitter optimization.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {neurotransmitters.map((nt, index) => (
              <Card
                key={nt.name}
                className={`relative overflow-hidden transition-all duration-300 ${nt.available
                  ? 'cursor-pointer hover:scale-105 border-primary/20 shadow-lg'
                  : 'opacity-75 cursor-not-allowed'
                  }`}
                onClick={() => nt.available && navigate('/dopamine')}
              >
                <div className={`h-2 ${nt.color}`} />
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{nt.name}</CardTitle>
                    {nt.available ? (
                      <Badge variant="default" className="bg-green-500/20 text-green-700">Available</Badge>
                    ) : (
                      <Badge variant="outline">Coming Soon</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">{nt.subtitle}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{nt.description}</p>
                  <div className="space-y-2">
                    {nt.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className={nt.available ? '' : 'text-muted-foreground/60'}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Science Section */}
      <section className="py-16 bg-gradient-to-r from-card/30 to-card/50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4 text-primary border-primary/20">
                📚 Research-Backed
              </Badge>
              <h2 className="text-3xl font-bold mb-6">Grounded in Neuroscience</h2>
              <p className="text-muted-foreground text-lg mb-6">
                Our dopamine currency model is based on established neuroscience research about reward prediction error,
                baseline dopamine levels, and the neuroplasticity of motivation systems.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <span>Based on peer-reviewed neuroscience research</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary" />
                  <span>Designed for ages 12+ with age-appropriate adaptations</span>
                </div>
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-primary" />
                  <span>Focuses on building intrinsic motivation</span>
                </div>
              </div>
            </div>

            <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <CardContent className="text-center space-y-6">
                <Brain className="w-16 h-16 mx-auto text-primary" />
                <h3 className="text-2xl font-bold">The Science Behind the Currency</h3>
                <p className="text-muted-foreground">
                  Dopamine acts as your brain's reward prediction system. Our currency model translates complex
                  neurotransmitter dynamics into an intuitive, actionable framework for personal development.
                </p>
                <Button
                  variant="outline"
                  onClick={() => navigate('/brain')}
                  className="border-primary/20 hover:bg-primary/5"
                >
                  Explore Brain Visualization
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Master Your Brain Chemistry?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start with dopamine currency tracking and take control of your motivation, focus, and daily energy levels.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate('/dopamine')}
              className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            >
              Begin Dopamine Tracking
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/brain')}
              className="text-lg px-8 py-6 border-primary/20 hover:bg-primary/5"
            >
              View 3D Brain Model
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;