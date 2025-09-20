import { BrainVisualization } from '@/components/BrainVisualization';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <div className="absolute top-4 right-8 z-10 flex gap-3">
        <Button
          onClick={() => navigate('/')}
          variant="outline"
          className="bg-slate-800/80 backdrop-blur-md border-primary/30 text-slate-200 hover:text-white hover:bg-primary/20 hover:border-primary/50 transition-all duration-300"
        >
          🏠 Home
        </Button>
        <Button
          onClick={() => navigate('/dopamine')}
          variant="outline"
          className="bg-slate-800/80 backdrop-blur-md border-accent/30 text-slate-200 hover:text-white hover:bg-accent/20 hover:border-accent/50 transition-all duration-300"
        >
          🧠 Dopamine Tracker
        </Button>
      </div>
      <BrainVisualization />
    </div>
  );
};

export default Index;
